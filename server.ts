import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
// Also try .env.local if present (AI Studio convention)
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
const hasGeminiKey = !!GEMINI_API_KEY && GEMINI_API_KEY !== "MY_GEMINI_API_KEY";

let genAI: GoogleGenAI | null = null;
if (hasGeminiKey) {
  genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

const VOICE_MAP: Record<string, string> = {
  frau_weber: "Kore",
  weber: "Kore",
  emma: "Aoede",
  lukas: "Puck",
  herr_mueller: "Charon",
  herr_muller: "Charon",
  mueller: "Charon",
  muller: "Charon",
  thomas: "Charon",
  prof: "Charon",
};

function resolveVoiceName(agentId?: string): string {
  const key = (agentId || "frau_weber").toLowerCase();
  return VOICE_MAP[key] || "Kore";
}

function pcmToWav(pcm: Buffer, sampleRate = 24000): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

const audioCache = new Map<string, Buffer>();

app.post("/api/tts", async (req, res) => {
  try {
    const { text, agentId } = req.body as { text?: string; agentId?: string };
    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Missing 'text' parameter" });
    }
    if (!genAI) {
      return res.status(503).json({
        error: "GEMINI_API_KEY not configured on server. Set it in .env or .env.local",
      });
    }

    const cleanText = text.trim().slice(0, 500);
    const voiceName = resolveVoiceName(agentId);
    const cacheKey = `${voiceName}:${cleanText}`;

    if (audioCache.has(cacheKey)) {
      const cached = audioCache.get(cacheKey)!;
      res.setHeader("Content-Type", "audio/wav");
      res.setHeader("Cache-Control", "public, max-age=86400");
      return res.send(cached);
    }

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: cleanText }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName } },
        },
      },
    });

    const part: any =
      (response as any)?.candidates?.[0]?.content?.parts?.[0] ?? null;
    const inlineData = part?.inlineData;
    const b64: string | undefined = inlineData?.data;

    if (!b64) {
      console.warn("[TTS] No audio in Gemini response", JSON.stringify(response).slice(0, 800));
      return res.status(502).json({ error: "Gemini TTS returned no audio" });
    }

    const mime: string = inlineData?.mimeType || "audio/L16;rate=24000";
    const rateMatch = mime.match(/rate=(\d+)/);
    const sampleRate = rateMatch ? parseInt(rateMatch[1], 10) : 24000;

    const pcm = Buffer.from(b64, "base64");
    const wav = pcmToWav(pcm, sampleRate);

    if (audioCache.size > 300) {
      const firstKey = audioCache.keys().next().value as string | undefined;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, wav);

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.send(wav);
  } catch (error: any) {
    const msg = error?.message || String(error);
    console.warn("[TTS] Generation warning:", msg);
    const status = msg.includes("API key") || msg.includes("PERMISSION_DENIED") ? 503 : 500;
    return res.status(status).json({ error: msg || "TTS generation failed" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", tts: hasGeminiKey ? "gemini" : "no-key" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}  (open http://localhost:${PORT})`);
    if (!hasGeminiKey) console.log("[TTS] GEMINI_API_KEY not set — /api/tts will return 503 until configured.");
    else console.log("[TTS] Gemini voices: Kore(Frau Weber) Aoede(Emma) Puck(Lukas) Charon(Herr Müller)");
  });
}

startServer();
