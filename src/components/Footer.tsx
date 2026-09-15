import React from 'react';
import { Heart, Sparkles, BookOpen, Globe2 } from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white py-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-slate-900 text-base">
                Deutsch mit Spaß und Quatsch
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">
                Lehrwerk
              </span>
            </div>
            <p className="text-slate-500 max-w-md">
              {BOOK_METADATA.motto}
            </p>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-1.5">
              <span>🇩🇪</span>
              <span>Deutschland</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🇦🇹</span>
              <span>Österreich</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🇨🇭</span>
              <span>Schweiz</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 „Deutsch mit Spaß und Quatsch“. Все права на учебные материалы защищены.</p>
          <div className="flex items-center gap-1">
            <span>Создано с душой для школьников, изучающих немецкий язык</span>
            <span className="text-rose-500">❤️</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
