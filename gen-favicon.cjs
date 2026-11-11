const zlib = require('zlib');
const fs = require('fs');

const SIZE = 64;
const px = Buffer.alloc(SIZE * SIZE * 4);

const BG = [15, 23, 42];      // slate-950
const AMBER = [251, 191, 36]; // amber-400
const ROSE = [251, 113, 133]; // rose-400
const R = 12;                 // corner radius

const D = ['11110','10001','10001','10001','10001','10001','11110'];
const Q = ['01110','10001','10001','10001','10101','10010','01101'];
const CELL = 6;
const GLYPH_H = 7 * CELL; // 42
const Y0 = Math.floor((SIZE - GLYPH_H) / 2); // 11

function setPixel(x, y, c) {
  const i = (y * SIZE + x) * 4;
  px[i] = c[0]; px[i+1] = c[1]; px[i+2] = c[2]; px[i+3] = 255;
}

function insideRounded(x, y) {
  const dx = Math.min(x, SIZE - 1 - x);
  const dy = Math.min(y, SIZE - 1 - y);
  if (dx >= R || dy >= R) return true;
  const cx = R - dx, cy = R - dy;
  return cx * cx + cy * cy <= R * R;
}

// background
for (let y = 0; y < SIZE; y++) {
  for (let x = 0; x < SIZE; x++) {
    if (insideRounded(x, y)) setPixel(x, y, BG);
  }
}

// letters
function drawGlyph(rows, x0, color) {
  for (let gy = 0; gy < 7; gy++) {
    for (let gx = 0; gx < 5; gx++) {
      if (rows[gy][gx] === '1') {
        for (let dy = 0; dy < CELL; dy++) {
          for (let dx = 0; dx < CELL; dx++) {
            const x = x0 + gx * CELL + dx;
            const y = Y0 + gy * CELL + dy;
            if (x >= 0 && x < SIZE && insideRounded(x, y)) setPixel(x, y, color);
          }
        }
      }
    }
  }
}

drawGlyph(D, 4, AMBER);
drawGlyph(Q, 34, ROSE);

// PNG encode
function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let n = 0; n < buf.length; n++) {
    c = (crc ^ buf[n]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = c ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // RGBA

const raw = Buffer.alloc(SIZE * (SIZE * 4 + 1));
for (let y = 0; y < SIZE; y++) {
  raw[y * (SIZE * 4 + 1)] = 0; // filter none
  px.copy(raw, y * (SIZE * 4 + 1) + 1, y * SIZE * 4, (y + 1) * SIZE * 4);
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
]);

fs.writeFileSync('public/favicon.png', png);
fs.writeFileSync('public/apple-touch-icon.png', png);
console.log('written', png.length, 'bytes');
