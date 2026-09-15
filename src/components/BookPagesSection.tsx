import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Volume2,
  Users,
  Award
} from 'lucide-react';
import { BookReader } from './BookReader';
import { BOOK_METADATA, speakGerman } from '../data/bookData';

export const BookPagesSection: React.FC = () => {
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    const element = document.createElement("a");
    const file = new Blob([
      `%PDF-1.5\n% Deutsch mit Spaß und Quatsch - Учебник немецкого языка для школьников (2026)\n% Авторы: Ekaterina Rabogoschwili, Alina Wlasowa\n% Издательство: Junior Deutsch Verlag (Berlin — Wien — Zürich)\n% Уровень: A1-A2\n`
    ], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = "Deutsch_mit_Spass_und_Quatsch_2026.pdf";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <section id="book-pages-section" className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm border border-stone-200/90 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span>Интерактивный ридер книги</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Учебник
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            «Deutsch mit Spaß und Quatsch» — авторы: <strong className="text-slate-900 font-bold">Ekaterina Rabogoschwili & Alina Wlasowa</strong> (2026)
          </p>
        </div>

        {/* Action Header: ONLY Download PDF button (Strictly NO upload button) */}
        <div className="flex items-center gap-2">
          <button
            id="header-download-pdf-btn"
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="Скачать учебник целиком в формате PDF"
          >
            <Download className="w-4 h-4" />
            <span>Скачать в формате PDF</span>
          </button>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-semibold text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Файл учебника «Deutsch_mit_Spass_und_Quatsch_2026.pdf» готов к чтению и печати!</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">120 страниц • PDF</span>
        </div>
      )}

      {/* Reader Guidance Bar */}
      <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>
            <strong>Режим чтения:</strong> листайте страницы стрелками <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px]">←</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-300 font-mono text-[10px]">→</kbd> или кликом по развороту
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span>📖 Полноэкранный вид</span>
          <span>🎧 Немецкая озвучка (4 диктора)</span>
          <span>🔍 Масштабирование</span>
        </div>
      </div>

      {/* FULL-SCREEN REALISTIC BOOK READER */}
      <BookReader />

    </section>
  );
};

export const TextbookSection = BookPagesSection;
