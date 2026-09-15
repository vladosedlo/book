import React, { useState } from 'react';
import { 
  Sparkles, 
  Smile, 
  MessageSquare, 
  Globe2, 
  GraduationCap, 
  Check, 
  Copy, 
  Volume2, 
  BookOpen, 
  HeartHandshake, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { BOOK_METADATA, DACH_FACTS, speakGerman } from '../data/bookData';

interface AnnotationSectionProps {
  onGoToHat: () => void;
  onGoToTopics: () => void;
  onGoToPages: () => void;
}

export const AnnotationSection: React.FC<AnnotationSectionProps> = ({ 
  onGoToHat, 
  onGoToTopics,
  onGoToPages 
}) => {
  const [copied, setCopied] = useState(false);
  const [activeDach, setActiveDach] = useState<number>(0);

  const handleCopyAnnotation = () => {
    const text = BOOK_METADATA.fullAnnotationParagraphs.join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* Primary Annotation Card */}
      <section id="annotation-card" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/90 relative overflow-hidden">
        
        {/* Subtle Decorative Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100/50 via-rose-50/30 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />
        
        {/* Header Ribbon / Label */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold shadow-xs">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-600 font-display">
                Официальная карточка издания
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                Аннотация к учебнику
              </h3>
            </div>
          </div>

          <button
            id="copy-annotation-btn"
            onClick={handleCopyAnnotation}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Скопировать аннотацию</span>
              </>
            )}
          </button>
        </div>

        {/* The Exact Annotation Text formatted with editorial elegance */}
        <div className="mt-8 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
          
          {/* Paragraph 1: Intro & Freedom from fear */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50/80 to-stone-50 rounded-2xl border border-amber-200/60 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-display font-black text-xl shadow-xs">
              „ “
            </div>
            <div>
              <p className="font-semibold text-slate-900 text-lg sm:text-xl leading-snug">
                „Deutsch mit Spaß und Quatsch“ — это современный и интересный учебник немецкого языка для школьников. 
                Он помогает изучать немецкий язык легко, весело и без страха ошибаться.
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-bold text-amber-800">
                <Smile className="w-4 h-4 text-amber-600" />
                <span>Девиз: Ошибки — это естественные ступеньки к уверенной речи!</span>
              </div>
            </div>
          </div>

          {/* Paragraph 2: Close & Clear Themes */}
          <div className="space-y-3">
            <p>
              В учебнике есть темы, близкие и понятные школьникам: <strong className="text-slate-900 font-semibold">школа, друзья, семья, хобби, музыка, спорт, игры, путешествия и социальные сети</strong>. Ученики изучают новые слова и грамматику с помощью игр, смешных заданий, диалогов, комиксов и небольших историй.
            </p>

            {/* Visual Pill Matrix of the 9 requested topics */}
            <div className="pt-2 flex flex-wrap gap-2">
              {[
                { name: 'Школа', icon: '🎒', de: 'Schule' },
                { name: 'Друзья', icon: '🤝', de: 'Freunde' },
                { name: 'Семья', icon: '🏡', de: 'Familie' },
                { name: 'Хобби', icon: '🎨', de: 'Hobbys' },
                { name: 'Музыка', icon: '🎧', de: 'Musik' },
                { name: 'Спорт', icon: '⚽', de: 'Sport' },
                { name: 'Игры', icon: '🎮', de: 'Gaming' },
                { name: 'Путешествия', icon: '✈️', de: 'Reisen' },
                { name: 'Социальные сети', icon: '📱', de: 'Social Media' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={onGoToTopics}
                  title={`Посмотреть тему: ${item.name} (${item.de})`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100 hover:border-amber-300 border border-stone-200 text-xs font-semibold text-slate-800 transition-all hover:scale-105"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({item.de})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paragraph 3: Conversational Speech & DACH */}
          <div className="space-y-3 pt-2">
            <p>
              <strong className="text-slate-900 font-semibold">Особое внимание уделяется разговорной речи.</strong> Школьники учатся рассказывать о себе, выражать своё мнение, задавать вопросы и общаться на немецком языке в обычных ситуациях. Также учебник знакомит учащихся с интересными фактами о Германии, Австрии и Швейцарии.
            </p>
          </div>

          {/* Paragraph 4: Mission / Goal */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider font-display">
                  <Sparkles className="w-4 h-4" />
                  <span>Главная цель учебника</span>
                </div>
                <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                  Показать, что немецкий язык может быть не только полезным, но и весёлым. „Deutsch mit Spaß und Quatsch“ помогает учиться с хорошим настроением и постепенно становиться увереннее в немецком языке.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="mt-10 pt-8 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BOOK_METADATA.keyFeatures.map((feat, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-amber-300 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-amber-600 mb-3 shadow-xs">
                {idx === 0 && <Smile className="w-4 h-4" />}
                {idx === 1 && <Sparkles className="w-4 h-4" />}
                {idx === 2 && <MessageSquare className="w-4 h-4" />}
                {idx === 3 && <Globe2 className="w-4 h-4" />}
              </div>
              <h4 className="font-bold text-slate-900 text-sm font-display leading-tight">
                {feat.title}
              </h4>
              <p className="text-[11px] font-semibold text-rose-600 mt-0.5">
                {feat.subtitle}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* DACH Culture Spotlight (Германия, Австрия, Швейцария) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/90">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-rose-600 font-display">
              Страноведение из аннотации
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Немецкоязычные страны: DACH
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Учебник знакомит учащихся с интересными фактами о Германии, Австрии и Швейцарии
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
            {DACH_FACTS.map((country, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDach(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeDach === idx
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{country.flag}</span>
                <span className="hidden sm:inline">{country.country.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Country Spotlight Box */}
        <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{DACH_FACTS[activeDach].flag}</span>
              <h4 className="text-lg font-bold text-slate-900 font-display">
                {DACH_FACTS[activeDach].country}
              </h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold">
                Столица: {DACH_FACTS[activeDach].capital}
              </span>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              <strong>Общий факт:</strong> {DACH_FACTS[activeDach].fact}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-stone-200/80">
              💡 <strong>Факт для школьников:</strong> {DACH_FACTS[activeDach].teenCultureFact}
            </p>
          </div>

          <button
            onClick={() => speakGerman(DACH_FACTS[activeDach].country)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-slate-800 text-xs font-semibold shadow-xs shrink-0"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Произношение</span>
          </button>
        </div>
      </section>

      {/* Action Prompts for the other requested elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jump to Interactive Hat */}
        <div 
          onClick={onGoToHat}
          className="group cursor-pointer p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-400 to-rose-500 text-white shadow-md hover:shadow-xl transition-all relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/20 text-xs font-bold text-amber-100 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Интерактивные тесты и тренажёр</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-tight">
                Тренажёр для отработки пройденного материала
              </h4>
              <p className="text-xs sm:text-sm text-white/90 mt-2 leading-relaxed">
                Интерактивный тест с рандомизацией вопросов, карточки активной лексики и сопоставление пар со звуковым сопровождением!
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>Перейти к тестам и карточкам</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Jump to Textbook / Pages / PDF */}
        <div 
          onClick={onGoToPages}
          className="group cursor-pointer p-6 rounded-3xl bg-white border border-stone-200 hover:border-slate-400 text-slate-900 shadow-sm hover:shadow-md transition-all relative"
        >
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-xs font-bold text-slate-700 mb-3">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <span>Учебник • Разворот и PDF</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 leading-tight">
                Учебник: интерактивный ридер и PDF
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Полноценный ридер книги с реалистичным перелистыванием печатных страниц, авторской аннотацией, цветными обложками и скачиванием в формате PDF.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              <span>Открыть ридер Учебника</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
