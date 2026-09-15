import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Volume2, 
  Smile, 
  ArrowDown, 
  CheckCircle2, 
  Users, 
  Award,
  Layers,
  FileText
} from 'lucide-react';
import { Header } from './components/Header';
import { BookCover3D } from './components/BookCover3D';
import { AnnotationSection } from './components/AnnotationSection';
import { InteractiveHat } from './components/InteractiveHat';
import { TopicsSection } from './components/TopicsSection';
import { BookPagesSection } from './components/BookPagesSection';
import { Footer } from './components/Footer';
import { BOOK_METADATA, speakGerman } from './data/bookData';
import { AppTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('annotation');

  const scrollToPractice = () => {
    setActiveTab('practice');
    setTimeout(() => {
      const el = document.getElementById('interactive-practice');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTopics = () => {
    setActiveTab('topics');
    setTimeout(() => {
      const el = document.getElementById('topics-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTextbook = () => {
    setActiveTab('textbook');
    setTimeout(() => {
      const el = document.getElementById('book-pages-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-900 selection:bg-amber-300 selection:text-neutral-900">
      
      {/* Top Navigation */}
      <Header 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
      />

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">
        
        {/* HERO SECTION: Title, 3D Book Cover & Key Editorial Badges */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-2 sm:pt-6">
          
          {/* Left Column: Typography & Book Identity */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Tagline / German Flag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-950 text-xs font-bold shadow-xs">
              <span className="flex items-center gap-1">
                <span>🇩🇪</span>
                <span>🇦🇹</span>
                <span>🇨🇭</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Учебник немецкого языка для школьников</span>
            </div>

            {/* Main Book Display Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black font-display text-slate-950 tracking-tight leading-[1.05]">
                Deutsch mit <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-rose-500 bg-clip-text text-transparent">
                  Spaß und Quatsch
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-slate-700 font-display">
                Современный и интересный учебник, который помогает учиться легко, весело и без страха ошибаться.
              </p>
            </div>

            {/* Authors & Publisher attribution */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
              <span>Авторы: <strong className="text-slate-900 font-semibold">{BOOK_METADATA.authors.join(', ')}</strong></span>
              <span>•</span>
              <span>Издание: <strong className="text-slate-900 font-semibold">{BOOK_METADATA.year}</strong></span>
            </div>

            {/* Micro Annotation Quote Card */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2">
              <p className="text-sm text-slate-600 leading-relaxed italic">
                „Главная цель — показать, что немецкий язык может быть не только полезным, но и весёлым. С хорошим настроением и уверенностью!“
              </p>
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-1 border-t border-stone-100">
                <span>Уровень: {BOOK_METADATA.level}</span>
                <span>5–9 классы</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-to-annotation-btn"
                onClick={() => {
                  setActiveTab('annotation');
                  const el = document.getElementById('annotation-card');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Читать аннотацию</span>
              </button>

              <button
                id="hero-to-practice-btn"
                onClick={scrollToPractice}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Тесты и тренажёр</span>
              </button>

              <button
                onClick={() => speakGerman('Hallo! Deutsch mit Spaß und Quatsch!')}
                className="px-4 py-3 rounded-2xl bg-white hover:bg-stone-100 border border-stone-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                title="Произношение названия приятным женским голосом"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Произношение</span>
              </button>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 text-xs text-slate-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Без страха ошибок</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Комиксы и игры</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Разговорная речь</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Book Mockup with authors */}
          <div className="lg:col-span-6 flex justify-center">
            <BookCover3D />
          </div>

        </section>

        {/* SECTION 1: ANNOTATION CARD (Primary user focus) */}
        {activeTab === 'annotation' && (
          <AnnotationSection 
            onGoToHat={scrollToPractice}
            onGoToTopics={scrollToTopics}
            onGoToPages={scrollToTextbook}
          />
        )}

        {/* SECTION 2: TOPICS EXPLORER */}
        {activeTab === 'topics' && (
          <TopicsSection />
        )}

        {/* SECTION 3: INTERACTIVE PRACTICE & TESTS */}
        {activeTab === 'practice' && (
          <InteractiveHat />
        )}

        {/* SECTION 4: TEXTBOOK (COVER, SPREAD & PDF DOWNLOAD) */}
        {activeTab === 'textbook' && (
          <BookPagesSection />
        )}

        {/* When in annotation mode, also show the interactive practice below it as requested */}
        {activeTab === 'annotation' && (
          <div className="pt-4 space-y-16">
            
            {/* Divider prompt to the tests and practice */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-px bg-stone-200 flex-grow max-w-xs" />
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Интерактивная отработка материала</span>
              </span>
              <div className="h-px bg-stone-200 flex-grow max-w-xs" />
            </div>

            {/* Embedded Interactive Practice directly below Annotation */}
            <InteractiveHat />

            {/* Teaser for Textbook & PDF */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-lg font-bold text-slate-900 font-display">
                  Учебник: развороты, обложка и файл PDF
                </h4>
                <p className="text-xs text-slate-500">
                  Познакомьтесь с разворотами книги или скачайте учебник в формате PDF.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('textbook')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Открыть Учебник / PDF</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Website Footer */}
      <Footer />

    </div>
  );
}

