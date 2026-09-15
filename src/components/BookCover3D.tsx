import React, { useState } from 'react';
import { Volume2, Sparkles, Star, BookOpen, CheckCircle2, Award, UserCheck } from 'lucide-react';
import { speakGerman, BOOK_METADATA } from '../data/bookData';
import { BookFrontCover, BookBackCover } from './BookCovers';

export const BookCover3D: React.FC = () => {
  const [viewMode, setViewMode] = useState<'front' | 'spread' | 'back'>('front');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Cover View Mode Selector */}
      <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 mb-6 text-xs font-semibold shadow-xs">
        <button
          id="btn-cover-front"
          onClick={() => setViewMode('front')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            viewMode === 'front'
              ? 'bg-white text-slate-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Обложка
        </button>
        <button
          id="btn-cover-spread"
          onClick={() => setViewMode('spread')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            viewMode === 'spread'
              ? 'bg-white text-slate-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Разворот
        </button>
        <button
          id="btn-cover-back"
          onClick={() => setViewMode('back')}
          className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
            viewMode === 'back'
              ? 'bg-white text-slate-950 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Оборот
        </button>
      </div>

      {/* Main Interactive Stage */}
      <div 
        className="relative flex justify-center items-center py-4 px-2 select-none w-full min-h-[440px] sm:min-h-[500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 1. FRONT COVER (Upright, Centered, Crisp Vector Quality) */}
        {viewMode === 'front' && (
          <div className="w-[280px] sm:w-[330px] md:w-[360px] aspect-[1/1.42] mx-auto transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <BookFrontCover is3dMockup={true} />
          </div>
        )}

        {/* 2. SPREAD VIEW (High-Fidelity Open Book) */}
        {viewMode === 'spread' && (
          <div className="relative w-full max-w-[340px] sm:max-w-[560px] md:max-w-[620px] bg-stone-100 rounded-2xl shadow-2xl border border-stone-300 flex flex-col sm:flex-row overflow-hidden mx-auto transition-all duration-300 hover:scale-[1.01]">
            
            {/* Left Page (Front matter with Authors) */}
            <div className="w-full sm:w-1/2 p-4 sm:p-6 bg-white border-b sm:border-b-0 sm:border-r border-stone-200 flex flex-col justify-between text-left">
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider mb-1">
                  Титульная страница
                </div>
                <h3 className="text-sm sm:text-lg font-black font-display text-slate-950 leading-tight">
                  Deutsch mit Spaß und Quatsch
                </h3>
                
                {/* Authors Attribution */}
                <div className="mt-2 sm:mt-2.5 p-2 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase text-slate-400 block">Авторы учебника</span>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">
                    Ekaterina Rabogoschwili
                  </p>
                  <p className="text-xs font-bold text-slate-900">
                    Alina Wlasowa
                  </p>
                </div>

                <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                  Современный курс немецкого языка для учащихся 5–9 классов. Развивает разговорную речь без страха ошибок.
                </p>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-stone-100 flex justify-between mt-2 sm:mt-0">
                <span>Junior Deutsch Verlag</span>
                <span>Seite 2</span>
              </div>
            </div>

            {/* Right Page (Full Annotation Content) */}
            <div className="w-full sm:w-1/2 p-4 sm:p-6 bg-amber-50/40 flex flex-col justify-between text-left">
              <div>
                <div className="text-[10px] uppercase font-bold text-rose-600 tracking-wider mb-1">
                  Аннотация
                </div>
                <h4 className="text-xs sm:text-sm font-bold font-display text-slate-900 leading-snug">
                  О курсе для школьников
                </h4>
                <p className="text-[11px] text-slate-700 mt-1.5 leading-relaxed">
                  Учебник помогает изучать немецкий язык легко, весело и без страха ошибаться.
                </p>
                <div className="mt-2 text-[10px] text-slate-600 space-y-1">
                  <p>• Школа, друзья, семья, хобби, музыка</p>
                  <p>• Спорт, игры, путешествия, соцсети</p>
                  <p>• Игры, комиксы, смешные задания</p>
                  <p>• Страноведение: Германия, Австрия, Швейцария</p>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 pt-2 border-t border-stone-200 flex justify-between mt-2 sm:mt-0">
                <span>Inhalt &amp; Überblick</span>
                <span>Seite 3</span>
              </div>
            </div>

            {/* Center Book Spine Crease Shadow (Desktop only) */}
            <div className="hidden sm:block absolute inset-y-0 left-1/2 -ml-3 w-6 bg-gradient-to-r from-black/10 via-black/25 to-black/10 pointer-events-none" />
          </div>
        )}

        {/* 3. BACK COVER VIEW (Upright, Centered, Matching Proportions) */}
        {viewMode === 'back' && (
          <div className="w-[280px] sm:w-[330px] md:w-[360px] aspect-[1/1.42] mx-auto transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
            <BookBackCover is3dMockup={true} />
          </div>
        )}
      </div>

      {/* Subtitle / Mode hints */}
      <p className="text-xs text-slate-500 text-center mt-3 font-medium flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Кликните «Разворот» или «Оборот», чтобы изучить книгу с разных сторон</span>
      </p>
    </div>
  );
};

