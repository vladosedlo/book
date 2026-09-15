import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Star, CheckCircle2, ChevronRight, Download, Award } from 'lucide-react';
import { speakGerman, stopSpeaking } from '../data/bookData';

interface BookFrontCoverProps {
  onOpenBook?: () => void;
  isFullscreen?: boolean;
  is3dMockup?: boolean;
}

export const BookFrontCover: React.FC<BookFrontCoverProps> = ({
  onOpenBook,
  isFullscreen = false,
  is3dMockup = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleSpeechEnded = () => {
      setIsSpeaking(false);
    };
    window.addEventListener('speechEnded', handleSpeechEnded);
    return () => window.removeEventListener('speechEnded', handleSpeechEnded);
  }, []);

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakGerman('Deutsch mit Spaß und Quatsch! Von Ekaterina Rabogoschwili und Alina Wlasowa.', undefined, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <div 
      onClick={onOpenBook}
      className={`relative aspect-[1/1.42] rounded-r-3xl rounded-l-md overflow-hidden bg-gradient-to-br from-[#f8be14] via-[#f59e0b] to-[#ea580c] text-slate-950 shadow-2xl border-4 border-amber-300/85 flex flex-col justify-between select-none transition-all duration-300 ${
        isFullscreen 
          ? 'h-[calc(100dvh-170px)] min-h-[440px] max-h-[920px] w-auto max-w-[90vw] mx-auto p-4 sm:p-7 md:p-8 lg:p-9'
          : is3dMockup 
            ? 'w-full h-full p-3.5 sm:p-4 md:p-5' 
            : 'w-full max-w-xl mx-auto p-4 sm:p-6 cursor-pointer group'
      }`}
    >
      {/* Spine edge simulation */}
      <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-8 bg-gradient-to-r from-amber-900/50 via-amber-800/30 to-transparent pointer-events-none z-20" />

      {/* Realistic Page Thickness Border on the Right */}
      <div className="absolute top-2 bottom-2 -right-1 w-2 bg-gradient-to-l from-stone-300/80 to-transparent rounded-r-xs pointer-events-none" />

      {/* Background Subtle Vector Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sharp-dots-unified" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#000" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sharp-dots-unified)" />
        </svg>
      </div>

      {/* TOP SECTION: Authors Banner & DACH Flags */}
      <div className="relative z-10 space-y-1.5 shrink-0 pl-1.5">
        {/* Authors Top Banner */}
        <div className={`bg-slate-950/95 text-white ${isFullscreen ? 'px-3.5 py-1.5' : 'px-2.5 sm:px-3 py-1'} rounded-xl flex items-center justify-between shadow-xs border border-white/10`}>
          <div className={`${isFullscreen ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px]'} font-bold tracking-wide flex items-center gap-1.5 text-amber-300 truncate`}>
            <span className="truncate">Ekaterina Rabogoschwili</span>
            <span className="text-white/40">•</span>
            <span className="truncate">Alina Wlasowa</span>
          </div>
          <div className={`${isFullscreen ? 'text-[9px] sm:text-[10px] px-2 py-0.5' : 'text-[8px] sm:text-[9px] px-1.5 py-0.5'} font-mono rounded bg-amber-400 text-slate-950 font-black tracking-wider shrink-0 ml-1.5`}>
            A1–A2
          </div>
        </div>

        {/* Flag Capsule & Schulbuch Badge */}
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs ${isFullscreen ? 'px-3 py-1 text-xs' : 'px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px]'} rounded-full font-extrabold text-slate-950 shadow-2xs border border-white/70`}>
            <span>🇩🇪</span>
            <span>🇦🇹</span>
            <span>🇨🇭</span>
            <span className="text-slate-600 font-bold ml-0.5">DACH</span>
          </div>

          <span className={`${isFullscreen ? 'text-[10px] sm:text-xs px-2.5 py-1' : 'text-[8px] sm:text-[9px] px-2 py-0.5'} uppercase tracking-wider font-black text-amber-950 bg-amber-200/90 rounded-md border border-amber-300 shadow-2xs`}>
            Schulbuch • 2026
          </span>
        </div>
      </div>

      {/* CENTER SECTION: Artwork, Title & Catchphrase */}
      <div className="relative z-10 my-auto py-1 pl-1.5 text-left space-y-1 sm:space-y-2 shrink-0">
        <div className={`inline-flex items-center gap-1.5 bg-rose-600 text-white font-extrabold ${isFullscreen ? 'text-xs sm:text-sm px-3 py-1' : 'text-[9px] sm:text-[10px] px-2.5 py-0.5'} rounded-lg uppercase tracking-wider shadow-2xs`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
          <span>Учебник немецкого языка</span>
        </div>

        {/* DEUTSCH */}
        <h2 className={`${isFullscreen ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-black font-display text-slate-950 tracking-tight leading-none drop-shadow-2xs uppercase`}>
          DEUTSCH
        </h2>

        {/* mit Spaß & */}
        <div className="flex items-center gap-2 my-0.5">
          <span className={`${isFullscreen ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'} font-bold italic text-slate-900 font-serif`}>
            mit
          </span>
          <span className={`${isFullscreen ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-xl sm:text-2xl md:text-3xl'} font-black font-display text-rose-600 uppercase tracking-tight drop-shadow-2xs`}>
            Spaß
          </span>
          <span className={`${isFullscreen ? 'text-2xl sm:text-3xl' : 'text-base sm:text-lg'} font-black text-slate-950`}>&amp;</span>
        </div>

        {/* QUATSCH! */}
        <div className="relative inline-block">
          <span className={`${isFullscreen ? 'text-4xl sm:text-5xl md:text-6xl' : 'text-2xl sm:text-3xl md:text-4xl'} font-black font-display text-slate-950 tracking-tight leading-none uppercase`}>
            QUATSCH!
          </span>
          <div className="absolute -bottom-1 left-0 right-0 h-2 sm:h-3 bg-rose-500/30 -rotate-1 rounded-full -z-10" />
        </div>

        {/* Interactive Speech Bubble */}
        <div className={`mt-1.5 bg-white/95 backdrop-blur-xs rounded-xl ${isFullscreen ? 'p-3 sm:p-4' : 'p-1.5 sm:p-2'} shadow-xs border border-amber-200 relative`}>
          <div className="absolute -top-1 left-4 w-2.5 h-2.5 bg-white rotate-45 border-l border-t border-amber-200" />
          <div className="flex items-center justify-between text-slate-900 gap-1.5">
            <span className={`${isFullscreen ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px]'} font-extrabold`}>„Lerne mit einem Lächeln!“</span>
            <button
              type="button"
              onClick={handlePronounce}
              title="Прослушать название книги"
              className="p-1 sm:p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer shrink-0"
            >
              <Volume2 className={`${isFullscreen ? 'w-4 h-4' : 'w-3.5 h-3.5'} ${isSpeaking ? 'animate-bounce text-rose-600' : 'text-amber-800'}`} />
            </button>
          </div>
          <p className={`${isFullscreen ? 'text-[10px] sm:text-xs mt-1' : 'text-[8px] sm:text-[9px] mt-0.5'} text-slate-600 font-medium leading-tight`}>
            Без страха ошибаться • Живые диалоги, мемы и комиксы
          </p>
        </div>
      </div>

      {/* BOTTOM SECTION: Features & Publisher Imprint */}
      <div className={`relative z-10 ${isFullscreen ? 'pt-3' : 'pt-1.5 sm:pt-2'} border-t border-slate-950/20 flex items-center justify-between gap-2 pl-1.5 shrink-0`}>
        <div className={`space-y-0.5 ${isFullscreen ? 'text-[10px] sm:text-xs' : 'text-[8px] sm:text-[9px]'} font-bold text-slate-900 leading-tight`}>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className={`${isFullscreen ? 'w-4 h-4' : 'w-3 h-3'} text-emerald-800 shrink-0`} />
            <span>Живая речь и сленг</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className={`${isFullscreen ? 'w-4 h-4' : 'w-3 h-3'} text-emerald-800 shrink-0`} />
            <span>9 тем из реальной жизни</span>
          </div>
        </div>

        {onOpenBook ? (
          <div className={`flex items-center gap-1.5 bg-slate-950 text-amber-400 ${isFullscreen ? 'px-3.5 py-2 text-xs' : 'px-2.5 py-1.5 text-[10px]'} rounded-xl font-bold shadow-xs hover:bg-slate-900 transition-colors cursor-pointer`}>
            <span>Открыть</span>
            <ChevronRight className={`${isFullscreen ? 'w-4 h-4' : 'w-3.5 h-3.5'} animate-pulse`} />
          </div>
        ) : (
          <div className={`${isFullscreen ? 'w-12 h-12' : 'w-9 h-9 sm:w-10 sm:h-10'} rounded-full bg-slate-950 text-amber-400 p-0.5 flex flex-col items-center justify-center text-center shadow-xs border border-amber-400/40 shrink-0`}>
            <span className={`${isFullscreen ? 'text-[7px]' : 'text-[5px]'} font-bold uppercase text-white/80`}>Verlag</span>
            <span className={`${isFullscreen ? 'text-xs' : 'text-[9px] sm:text-[10px]'} font-black leading-none text-amber-300`}>2026</span>
            <span className={`${isFullscreen ? 'text-[7px]' : 'text-[5px]'} font-semibold text-white/60`}>NEU</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface BookBackCoverProps {
  onDownloadPdf?: () => void;
  isFullscreen?: boolean;
  is3dMockup?: boolean;
}

export const BookBackCover: React.FC<BookBackCoverProps> = ({
  onDownloadPdf,
  isFullscreen = false,
  is3dMockup = false,
}) => {
  return (
    <div 
      className={`relative aspect-[1/1.42] rounded-l-3xl rounded-r-md overflow-hidden bg-slate-950 text-white shadow-2xl border-4 border-slate-800 flex flex-col justify-between select-none transition-all duration-300 ${
        isFullscreen 
          ? 'h-[calc(100dvh-170px)] min-h-[440px] max-h-[920px] w-auto max-w-[90vw] mx-auto p-4 sm:p-7 md:p-8 lg:p-9'
          : is3dMockup 
            ? 'w-full h-full p-3.5 sm:p-4 md:p-5' 
            : 'w-full max-w-xl mx-auto p-4 sm:p-6'
      }`}
    >
      {/* Spine edge simulation on right */}
      <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-8 bg-gradient-to-l from-black/60 via-black/30 to-transparent pointer-events-none z-20" />

      {/* TOP SECTION: Publishing Info & ISBN */}
      <div className={`relative z-10 border-b border-slate-800/90 ${isFullscreen ? 'pb-2.5' : 'pb-1.5'} pr-1.5 shrink-0`}>
        <div className="flex items-center justify-between">
          <span className={`${isFullscreen ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-[11px]'} font-bold text-amber-400 tracking-wider uppercase font-display flex items-center gap-1.5`}>
            <Award className={`${isFullscreen ? 'w-4 h-4' : 'w-3.5 h-3.5'} text-amber-400`} />
            <span>Информация об издании</span>
          </span>
          <span className={`${isFullscreen ? 'text-[9px] sm:text-[10px] px-2 py-0.5' : 'text-[8px] sm:text-[9px] px-1.5 py-0.5'} rounded bg-slate-800 text-slate-300 font-mono border border-slate-700`}>
            ISBN 978-3-948821-04-2
          </span>
        </div>
      </div>

      {/* CENTER SECTION: Authors, Description, Feature bullets & Review */}
      <div className={`relative z-10 ${isFullscreen ? 'space-y-2.5 sm:space-y-3' : is3dMockup ? 'space-y-1 sm:space-y-1.5' : 'space-y-1.5 sm:space-y-2'} my-auto py-0.5 sm:py-1 pr-1.5 text-left shrink-0`}>
        <div>
          <div className={`${isFullscreen ? 'text-[9px] sm:text-[10px]' : 'text-[8px] sm:text-[9px]'} text-slate-400 uppercase font-semibold tracking-wider`}>
            Авторы курса:
          </div>
          <div className={`${isFullscreen ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} font-bold text-amber-300`}>
            Ekaterina Rabogoschwili &amp; Alina Wlasowa
          </div>
        </div>

        <div>
          <h4 className={`${isFullscreen ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'} font-bold text-white font-display mb-0.5`}>
            Почему школьники выбирают этот учебник?
          </h4>
          <p className={`${isFullscreen ? 'text-[11px] sm:text-xs' : 'text-[9px] sm:text-[10px]'} text-slate-300 leading-tight`}>
            Главная цель — показать, что немецкий язык может быть не только полезным, но и по-настоящему весёлым!
          </p>
        </div>

        <div className={`${isFullscreen ? 'p-3 space-y-1.5 text-[10px] sm:text-xs' : is3dMockup ? 'p-1.5 space-y-0.5 text-[8px] sm:text-[9px]' : 'p-2 space-y-1 text-[8px] sm:text-[9px]'} rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300`}>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Star className={`${isFullscreen ? 'w-3.5 h-3.5' : 'w-3 h-3'} text-amber-400 fill-amber-400 shrink-0`} />
            <span>Понятные подросткам темы: школа, друзья, игры, музыка</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Star className={`${isFullscreen ? 'w-3.5 h-3.5' : 'w-3 h-3'} text-amber-400 fill-amber-400 shrink-0`} />
            <span>Красочные комиксы, аудиодиалоги и грамматика в схемах</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Star className={`${isFullscreen ? 'w-3.5 h-3.5' : 'w-3 h-3'} text-amber-400 fill-amber-400 shrink-0`} />
            <span>Страноведение: Германия, Австрия, Швейцария</span>
          </div>
        </div>

        {/* Review Quote */}
        <div className={`${isFullscreen ? 'p-2.5 sm:p-3 text-[10px] sm:text-xs' : is3dMockup ? 'p-1.5 text-[8px] sm:text-[9px]' : 'p-1.5 sm:p-2 text-[8px] sm:text-[9px]'} rounded-lg bg-amber-500/10 border border-amber-400/20 text-amber-200 italic font-serif leading-tight`}>
          „Дети больше не боятся говорить! На уроках звучит смех, а слова запоминаются сами собой.“
          <span className={`block ${isFullscreen ? 'text-[8px] sm:text-[9px]' : 'text-[7px] sm:text-[8px]'} font-sans not-italic text-slate-400 mt-0.5`}>
            — Рецензия школьных методистов и учителей
          </span>
        </div>
      </div>

      {/* BOTTOM SECTION: Publisher, Download PDF button & Barcode */}
      <div className={`relative z-10 ${isFullscreen ? 'pt-2.5' : 'pt-1.5 sm:pt-2'} border-t border-slate-800 pr-1.5 shrink-0`}>
        {onDownloadPdf && (
          <button
            type="button"
            onClick={onDownloadPdf}
            className={`w-full mb-2 ${isFullscreen ? 'py-2 text-xs sm:text-sm' : 'py-1.5 text-[10px] sm:text-xs'} rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-98`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать учебник в PDF (120 стр.)</span>
          </button>
        )}

        <div className="flex items-end justify-between">
          <div>
            <span className={`${isFullscreen ? 'text-[9px]' : 'text-[7px]'} text-slate-400 block`}>Издательство</span>
            <span className={`${isFullscreen ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'} font-bold text-amber-400 leading-tight block`}>
              Junior Deutsch Verlag, 2026
            </span>
            <span className={`${isFullscreen ? 'text-[9px]' : 'text-[8px]'} text-slate-500 block`}>Berlin • Wien • Zürich</span>
          </div>

          <div className="bg-white p-1 rounded shadow-xs shrink-0">
            <div className={`${isFullscreen ? 'w-24 sm:w-28 h-6' : 'w-20 sm:w-24 h-5'} bg-slate-950 flex items-center justify-around px-0.5`}>
              <div className="w-0.5 h-full bg-white" />
              <div className="w-1 h-full bg-white" />
              <div className="w-0.5 h-full bg-white" />
              <div className="w-1.5 h-full bg-white" />
              <div className="w-0.5 h-full bg-white" />
              <div className="w-1 h-full bg-white" />
              <div className="w-1.5 h-full bg-white" />
              <div className="w-0.5 h-full bg-white" />
            </div>
            <div className={`${isFullscreen ? 'text-[8px]' : 'text-[7px]'} font-mono text-slate-950 font-bold text-center mt-0.5 leading-none`}>
              9783948821042
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
