import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Volume2, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Check, 
  Compass, 
  Smile, 
  HelpCircle,
  Headphones,
  RotateCcw
} from 'lucide-react';
import { BOOK_METADATA, speakGerman, stopSpeaking, getSelectedVoiceAgent, VoiceAgent } from '../data/bookData';
import { BookFrontCover, BookBackCover } from './BookCovers';

export const BookReader: React.FC = () => {
  // Current view index:
  // 0: Front Cover (Single Page, Full Color)
  // 1: Spread 1 (Pages 2-3: Title, Imprint & Expanded Official Annotation)
  // 2: Spread 2 (Pages 4-5: Letter from Authors & Table of Contents)
  // 3: Spread 3 (Pages 6-7: Lesson 1 "Hallo! Das bin ich!" with Comics & Dialogues)
  // 4: Spread 4 (Pages 8-9: Lesson 2 "Die Schule & Schulalltag" with Grades & Canteen)
  // 5: Spread 5 (Pages 10-11: DACH Culture & Secret Teen Slang Dictionary)
  // 6: Back Cover (Page 12: Single Page, Full Color Back Cover with ISBN & Barcode)
  const [currentView, setCurrentView] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [activeExerciseAnswer, setActiveExerciseAnswer] = useState<Record<number, string>>({});
  const [currentVoiceAgent, setCurrentVoiceAgent] = useState<VoiceAgent>(getSelectedVoiceAgent());
  const readerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVoiceChange = () => {
      setCurrentVoiceAgent(getSelectedVoiceAgent());
    };
    const handleSpeechEnded = () => {
      setIsPlayingAudio(false);
    };

    window.addEventListener('voiceAgentChanged', handleVoiceChange);
    window.addEventListener('speechEnded', handleSpeechEnded);
    return () => {
      window.removeEventListener('voiceAgentChanged', handleVoiceChange);
      window.removeEventListener('speechEnded', handleSpeechEnded);
    };
  }, []);

  const totalViews = 7;

  const viewTitles = [
    'Обложка (Лицевая сторона)',
    'Стр. 2–3: Титул & Официальная аннотация',
    'Стр. 4–5: От авторов & Содержание',
    'Стр. 6–7: Урок 1. Hallo! Das bin ich!',
    'Стр. 8–9: Урок 2. Die Schule & Schulalltag',
    'Стр. 10–11: DACH-культура & Секретный сленг',
    'Оборот (Задняя обложка, ISBN)'
  ];

  const handlePrevPage = () => {
    if (currentView > 0) {
      setCurrentView(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentView < totalViews - 1) {
      setCurrentView(prev => prev + 1);
    }
  };

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, isFullscreen]);

  // Toggle fullscreen mode on container
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (readerContainerRef.current?.requestFullscreen && !document.fullscreenElement) {
        readerContainerRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isFullscreen]);

  // Direct PDF download
  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    const element = document.createElement("a");
    const file = new Blob([
      `%PDF-1.5\n% Deutsch mit Spaß und Quatsch (2026)\n% Авторы: Ekaterina Rabogoschwili, Alina Wlasowa\n% Издательство: Junior Deutsch Verlag\n`
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

  // Read aloud current page content with selected voice agent
  const handleReadAloudCurrentPage = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    let textToRead = '';
    if (currentView === 0) {
      textToRead = 'Deutsch mit Spaß und Quatsch! Ein modernes Lehrbuch für Schülerinnen und Schüler. Von Ekaterina Rabogoschwili und Alina Wlasowa.';
    } else if (currentView === 1) {
      textToRead = 'Deutsch mit Spaß und Quatsch ist ein modernes Lehrbuch für Schüler. Es hilft, Deutsch leicht, mit Freude und ohne Angst vor Fehlern zu lernen!';
    } else if (currentView === 2) {
      textToRead = 'Liebe Schülerinnen und Schüler! Willkommen in der Welt der deutschen Sprache! Habt keine Angst vor Fehlern, Deutsch macht richtig Spaß!';
    } else if (currentView === 3) {
      textToRead = 'Hallo zusammen! Ich heiße Lukas. Und wer bist du? Ich bin Emma, schön dich kennenzulernen! Alles klar bei dir? Klaro!';
    } else if (currentView === 4) {
      textToRead = 'Die Schule und der Schulalltag. Meine Lieblingsfächer sind Kunst, Sport und Deutsch! Die Pause ist natürlich das Beste!';
    } else if (currentView === 5) {
      textToRead = 'Willkommen in Deutschland, Österreich und der Schweiz! Drei Länder, eine Sprache. Und hier ist unser Jugendslang: Digga, gönn dir, chillen und kein Quatsch!';
    } else {
      textToRead = 'Deutsch mit Spaß und Quatsch. Junior Deutsch Verlag 2026. Lerne Deutsch mit einem Lächeln!';
    }

    speakGerman(textToRead, currentVoiceAgent.id, () => {
      setIsPlayingAudio(false);
    });
  };

  return (
    <div 
      ref={readerContainerRef}
      className={`w-full transition-all duration-300 ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-[#121110] p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-y-auto supports-[height:100dvh]:h-dvh supports-[height:100dvh]:min-h-dvh max-h-dvh'
          : 'relative bg-stone-100/90 rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/90 shadow-sm'
      }`}
    >
      
      {/* 1. TOP READER TOOLBAR */}
      <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b text-xs ${
        isFullscreen ? 'border-stone-800 text-stone-200' : 'border-stone-200/80 text-slate-700'
      }`}>
        
        {/* Left: Page Title & Navigation Dropdown */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-xs shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className={`font-extrabold text-sm font-display break-words min-w-0 ${isFullscreen ? 'text-white' : 'text-slate-900'}`}>
                {viewTitles[currentView]}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] shrink-0">
                {currentView === 0 ? '1 / 12' : currentView === 6 ? '12 / 12' : `${currentView * 2}–${currentView * 2 + 1} / 12`}
              </span>
            </div>
            <p className={`text-[11px] break-words ${isFullscreen ? 'text-stone-400' : 'text-slate-500'}`}>
              Авторы: <strong>Ekaterina Rabogoschwili & Alina Wlasowa</strong> (2026)
            </p>
          </div>
        </div>

        {/* Right Controls: Voice button, Zoom, Fullscreen, PDF Download */}
        <div className="flex items-center flex-wrap gap-2 min-w-0 w-full sm:w-auto">
          
          {/* Read Aloud Button (Current Agent) */}
          <button
            onClick={handleReadAloudCurrentPage}
            title={isPlayingAudio ? 'Остановить чтение вслух' : `Озвучить страницу голосом: ${currentVoiceAgent.name}`}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlayingAudio 
                ? 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300' 
                : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700 shadow-xs'
            }`}
          >
            <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isPlayingAudio ? 'animate-pulse text-white' : 'text-amber-600'}`} />
            <span>{isPlayingAudio ? 'Остановить' : 'Озвучить'}</span>
            <span className="hidden sm:inline">{!isPlayingAudio ? ` (${currentVoiceAgent.avatar} ${currentVoiceAgent.name})` : ''}</span>
          </button>

          {/* Zoom controls */}
          <div className="flex items-center bg-white rounded-xl border border-stone-200 p-0.5 shadow-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.max(90, prev - 10))}
              disabled={zoomLevel <= 90}
              className="p-1.5 text-slate-600 hover:text-slate-950 disabled:opacity-40 cursor-pointer"
              title="Уменьшить масштаб"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-700 font-semibold">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(prev => Math.min(130, prev + 10))}
              disabled={zoomLevel >= 130}
              className="p-1.5 text-slate-600 hover:text-slate-950 disabled:opacity-40 cursor-pointer"
              title="Увеличить масштаб"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-xl border text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5 ${
              isFullscreen 
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300/50' 
                : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700'
            }`}
            title={isFullscreen ? 'Выйти из полноэкранного режима' : 'Читать на весь экран'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-4 h-4 text-slate-950" />
                <span className="hidden sm:inline">Свернуть</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4 text-slate-900" />
                <span className="hidden sm:inline">На весь экран</span>
              </>
            )}
          </button>

          {/* PDF Download Button - Strictly ONLY Download, NO upload */}
          <button
            id="reader-download-pdf-btn"
            onClick={handleDownloadPdf}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
            title="Скачать учебник целиком в формате PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать в формате PDF</span>
          </button>

        </div>

      </div>

      {downloadSuccess && (
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-semibold text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Файл учебника «Deutsch_mit_Spass_und_Quatsch_2026.pdf» успешно скачан!</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">120 страниц • А4</span>
        </div>
      )}

      {/* 2. THE MAIN FULL-WIDTH BOOK STAGE */}
      <div className={`relative flex items-center justify-center py-2 sm:py-4 w-full max-w-full ${isFullscreen ? 'flex-1 my-auto min-h-0' : ''}`}>

        {/* Previous Page Arrow — скрыты на телефоне, чтобы не перекрывать текст и не сдвигать центр */}
        <button
          onClick={handlePrevPage}
          disabled={currentView === 0}
          className={`hidden sm:flex absolute left-1 sm:left-2 lg:left-4 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-stone-300 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none ${
            currentView === 0 ? 'invisible' : 'visible'
          }`}
          title="Предыдущая страница (Клавиша стрелка влево)"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </button>

        {/* Next Page Arrow — скрыты на телефоне */}
        <button
          onClick={handleNextPage}
          disabled={currentView === totalViews - 1}
          className={`hidden sm:flex absolute right-1 sm:right-2 lg:right-4 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-stone-300 shadow-xl items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 disabled:opacity-20 disabled:pointer-events-none ${
            currentView === totalViews - 1 ? 'invisible' : 'visible'
          }`}
          title="Следующая страница (Клавиша стрелка вправо)"
        >
          <ChevronRight className="w-6 h-6 text-slate-900" />
        </button>

        {/* BOOK CONTAINER WITH ZOOM & FULLSCREEN EXPANSION */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className={`book-zoom-wrapper transition-transform duration-200 w-full flex justify-center mx-auto min-w-0 max-w-full sm:max-w-5xl px-0 ${
            isFullscreen ? 'my-auto h-auto' : ''
          }`}
        >

          {/* ========================================================= */}
          {/* VIEW 0: FRONT COVER (Identical to 3D preview, Fullscreen) */}
          {/* ========================================================= */}
          {currentView === 0 && (
            <div className="w-full flex justify-center">
              <BookFrontCover 
                isFullscreen={isFullscreen} 
                onOpenBook={handleNextPage} 
              />
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: SPREAD 1 (Pages 2-3: Real Printed Book Spread)    */}
          {/* ========================================================= */}
          {currentView === 1 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-[#FAF8F5] relative select-text w-full ${isFullscreen ? 'w-full max-w-7xl min-h-[calc(100dvh-180px)]' : 'max-w-5xl'} min-w-0`}>
              
              {/* Realistic Book Spine Center Shadow */}
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE: Page 2 (Title Page & Formal Imprint) */}
              <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-stone-200/90 flex flex-col justify-between text-stone-800 font-serif leading-relaxed relative">
                
                {/* Running Header */}
                <div className="text-[10px] uppercase font-sans tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Junior Deutsch Verlag</span>
                  <span>Учебные издания</span>
                </div>

                {/* Imprint & Formal Title */}
                <div className="my-auto py-6 space-y-6 text-center md:text-left">
                  <div className="space-y-1">
                    <span className="text-xs font-sans font-bold uppercase tracking-wider text-amber-700">
                      Учебник немецкого языка для школьников
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black font-display text-stone-900 tracking-tight leading-tight">
                      Deutsch mit Spaß und Quatsch
                    </h2>
                    <p className="text-xs font-sans text-stone-600">
                      Начальный и базовый уровень (A1 – A2)
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 font-sans text-xs space-y-2">
                    <div className="font-bold text-stone-900">
                      Авторы:
                    </div>
                    <div className="text-stone-950 font-bold">Ekaterina Rabogoschwili</div>
                    <div className="text-stone-950 font-bold">Alina Wlasowa</div>
                  </div>

                  {/* Bibliographic Classification */}
                  <div className="text-[11px] font-mono text-stone-500 space-y-1 bg-white p-3 rounded-lg border border-stone-200/60">
                    <div>ББК 81.2Нем-922</div>
                    <div>УДК 811.112.2(075.3)</div>
                    <div>ISBN 978-3-948821-04-2</div>
                    <div className="pt-1 text-[10px] text-stone-400 font-sans">
                      © Ekaterina Rabogoschwili, Alina Wlasowa, 2026
                    </div>
                  </div>
                </div>

                {/* Page Number Footer */}
                <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-400 flex justify-between items-center">
                  <span>2</span>
                  <span className="text-[10px]">Ekaterina Rabogoschwili • Alina Wlasowa</span>
                </div>

              </div>

              {/* RIGHT PAGE: Page 3 (Expanded Official Book Annotation) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between text-stone-800 leading-relaxed relative bg-[#FAF8F5]">
                
                {/* Running Header */}
                <div className="text-[10px] uppercase font-sans tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Официальное описание</span>
                  <span>Аннотация издания</span>
                </div>

                {/* Expanded Annotation Body */}
                <div className="my-auto py-4 space-y-4 text-xs sm:text-sm text-stone-700 font-serif">
                  
                  <div className="font-sans font-extrabold text-stone-900 text-base flex items-center gap-2 pb-1">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Аннотация</span>
                  </div>

                  {BOOK_METADATA.fullAnnotationParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="indent-4 leading-relaxed text-justify">
                      {paragraph}
                    </p>
                  ))}

                  {/* Authors quote with female audio playback */}
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 font-sans text-xs text-amber-950 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800">
                        Девиз авторов:
                      </span>
                      <button 
                        onClick={() => speakGerman('Lerne Deutsch mit einem Lächeln! Keine Angst vor Fehlern!')}
                        className="px-2 py-0.5 rounded bg-white border border-amber-300 hover:border-amber-500 text-amber-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3 text-amber-700" />
                        <span>Послушать</span>
                      </button>
                    </div>
                    <p className="italic font-serif text-stone-800 text-sm">
                      „Показать, что немецкий язык может быть не только полезным, но и весёлым, а говорить на нём можно с удовольствием, хорошим настроением и уверенностью в себе!“
                    </p>
                  </div>

                </div>

                {/* Page Number Footer */}
                <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-400 flex justify-between items-center">
                  <span className="text-[10px]">Deutsch mit Spaß und Quatsch</span>
                  <span>3</span>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: SPREAD 2 (Pages 4-5: Letter from Authors & Index) */}
          {/* ========================================================= */}
          {currentView === 2 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-[#FAF8F5] relative select-text w-full ${isFullscreen ? 'w-full max-w-7xl min-h-[calc(100dvh-180px)]' : 'max-w-5xl'} min-w-0`}>
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE: Page 4 (Letter from Authors) */}
              <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-stone-200/90 flex flex-col justify-between text-stone-800 font-serif leading-relaxed">
                <div className="text-[10px] uppercase font-sans tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Вступительное слово</span>
                  <span>Liebe Schülerinnen und Schüler!</span>
                </div>

                <div className="my-auto py-4 space-y-4 text-xs sm:text-sm">
                  <h3 className="font-display font-black text-xl text-stone-950">
                    Привет, дорогой друг!
                  </h3>
                  
                  <p className="indent-4 leading-relaxed">
                    Добро пожаловать на страницы «Deutsch mit Spaß und Quatsch»! Мы написали этот учебник именно для тебя, чтобы доказать: немецкий — это не бесконечные таблицы с артиклями и сложные правила, а живой, яркий и очень весёлый язык.
                  </p>

                  <div className="font-sans text-xs space-y-2.5 p-4 rounded-xl bg-stone-100/90 border border-stone-200">
                    <span className="font-bold text-stone-900 block uppercase tracking-wider text-[11px]">
                      5 секретов успешного прохождения курса:
                    </span>
                    <ul className="space-y-1.5 text-stone-700">
                      <li>• <strong>Не бойся ошибок!</strong> Даже носители языка иногда путают окончания.</li>
                      <li>• <strong>Слушай аудио:</strong> жми на значок динамика и повторяй фразы вслух.</li>
                      <li>• <strong>Используй сленг:</strong> вставляй словечки из наших комиксов в разговоры.</li>
                      <li>• <strong>Шути на немецком:</strong> юмор запоминается в 10 раз быстрее зубрежки.</li>
                    </ul>
                  </div>

                  <div className="pt-2 font-sans flex items-center justify-between">
                    <div>
                      <div className="font-display font-bold text-stone-900 text-sm">
                        Ekaterina Rabogoschwili & Alina Wlasowa
                      </div>
                      <div className="text-[11px] text-stone-500 italic font-serif">
                        Авторы курса, 2026 г.
                      </div>
                    </div>
                    <span className="text-2xl">✍️✨</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-400 flex justify-between items-center">
                  <span>4</span>
                  <span className="text-[10px]">От авторов</span>
                </div>
              </div>

              {/* RIGHT PAGE: Page 5 (Table of Contents / Inhaltsverzeichnis) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between text-stone-800 leading-relaxed bg-[#FAF8F5]">
                <div className="text-[10px] uppercase font-sans tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Оглавление</span>
                  <span>Inhaltsverzeichnis</span>
                </div>

                <div className="my-auto py-4 space-y-3 font-sans text-xs">
                  <h3 className="font-display font-black text-xl text-stone-950 mb-3">
                    Содержание учебника
                  </h3>

                  <div className="space-y-2 text-stone-700">
                    {[
                      { num: 'Kapitel 1', titleDe: 'Hallo! Das bin ich!', titleRu: 'Знакомство, друзья, характер', page: '6' },
                      { num: 'Kapitel 2', titleDe: 'Die Schule & Schulalltag', titleRu: 'Уроки, перемены, оценки и сленг', page: '18' },
                      { num: 'Kapitel 3', titleDe: 'Meine Clique & Hobbys', titleRu: 'Спорт, музыка, скейт и игры', page: '32' },
                      { num: 'Kapitel 4', titleDe: 'Familie & Chaos zu Hause', titleRu: 'Питомцы, родители, братья и сестры', page: '46' },
                      { num: 'Kapitel 5', titleDe: 'Social Media & Gaming', titleRu: 'Блоги, мемы, видеоигры', page: '60' },
                      { num: 'Kapitel 6', titleDe: 'Lecker! Essen & Trinken', titleRu: 'Уличная еда: карривурст и брецель', page: '74' },
                      { num: 'Kapitel 7', titleDe: 'DACH-Länder Entdecken', titleRu: 'Германия, Австрия, Швейцария', page: '88' },
                      { num: 'Kapitel 8', titleDe: 'Feste & Traditionen', titleRu: 'Праздники, каникулы, карнавал', page: '102' },
                      { num: 'Anhang', titleDe: 'Geheimes Slang-Lexikon', titleRu: 'Словарь сленга и ключи к заданиям', page: '114' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-stone-200/60 pb-1.5">
                        <div className="space-y-0.5">
                          <div className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span className="text-amber-700 text-[10px]">{item.num}:</span>
                            <span>{item.titleDe}</span>
                          </div>
                          <div className="text-[11px] text-stone-500">{item.titleRu}</div>
                        </div>
                        <div className="font-mono font-bold text-stone-400 text-xs pl-2">
                          стр. {item.page}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs font-sans text-stone-400 flex justify-between items-center">
                  <span className="text-[10px]">Содержание</span>
                  <span>5</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: SPREAD 3 (Pages 6-7: Real Lesson 1 Dialogues & Art)*/}
          {/* ========================================================= */}
          {currentView === 3 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-[#FAF8F5] relative select-text w-full ${isFullscreen ? 'w-full max-w-7xl min-h-[calc(100dvh-180px)]' : 'max-w-5xl'} min-w-0`}>
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE: Page 6 (Comic Dialogues) */}
              <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-stone-200/90 flex flex-col justify-between text-stone-800 leading-relaxed font-sans">
                <div className="text-[10px] uppercase tracking-widest text-amber-700 font-bold pb-4 border-b border-stone-200 flex justify-between">
                  <span>Kapitel 1 • Lektion 1</span>
                  <span>Hallo! Das bin ich!</span>
                </div>

                <div className="my-auto py-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">1</span>
                    <h4 className="font-display font-black text-base text-stone-900">
                      Диалог в школьном дворе (Auf dem Schulhof)
                    </h4>
                  </div>

                  {/* Comic Speech Bubbles */}
                  <div className="space-y-3">
                    
                    {/* Lukas */}
                    <div className="p-3 rounded-2xl bg-white border border-stone-300/80 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                        <span>👦 Lukas:</span>
                        <button 
                          onClick={() => speakGerman('Hi! Ich heiße Lukas. Und wie heißt du?')}
                          className="text-stone-500 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-[10px]">Озвучить</span>
                        </button>
                      </div>
                      <p className="font-bold text-stone-950 text-sm">
                        „Hi! Ich heiße Lukas. Und wie heißt du?“
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Привет! Меня зовут Лукас. А как зовут тебя?
                      </p>
                    </div>

                    {/* Emma */}
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs space-y-1 sm:ml-4">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-800">
                        <span>👧 Emma:</span>
                        <button 
                          onClick={() => speakGerman('Hallo Lukas! Ich bin Emma. Alles klar bei dir?')}
                          className="text-stone-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-rose-600" />
                          <span className="text-[10px]">Озвучить</span>
                        </button>
                      </div>
                      <p className="font-bold text-stone-950 text-sm">
                        „Hallo Lukas! Ich bin Emma. Alles klar bei dir?“
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Привет, Лукас! Я Эмма. Всё в порядке у тебя?
                      </p>
                    </div>

                    {/* Lukas */}
                    <div className="p-3 rounded-2xl bg-white border border-stone-300/80 shadow-xs space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                        <span>👦 Lukas:</span>
                        <button 
                          onClick={() => speakGerman('Klaro! Deutsch ist heute echt kein Quatsch!')}
                          className="text-stone-500 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                          <span className="text-[10px]">Озвучить</span>
                        </button>
                      </div>
                      <p className="font-bold text-stone-950 text-sm">
                        „Klaro! Deutsch ist heute echt kein Quatsch!“
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Ясное дело! Немецкий сегодня — точно не ерунда!
                      </p>
                    </div>

                  </div>

                  {/* Grammar box */}
                  <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-300 text-xs space-y-2">
                    <span className="font-bold text-stone-900 block text-[11px] uppercase tracking-wider text-rose-700">
                      💡 Grammatik-Tipp: Спряжение глагола sein (быть)
                    </span>
                    <div className="grid grid-cols-3 gap-1 font-mono text-[11px] text-stone-800">
                      <div className="bg-white p-1 rounded border border-stone-200"><strong>ich</strong> bin</div>
                      <div className="bg-white p-1 rounded border border-stone-200"><strong>du</strong> bist</div>
                      <div className="bg-white p-1 rounded border border-stone-200"><strong>er/sie</strong> ist</div>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span>6</span>
                  <span className="text-[10px]">Lektion 1 • Mein Profil</span>
                </div>
              </div>

              {/* RIGHT PAGE: Page 7 (Wortschatz & Interactive Exercise) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between text-stone-800 leading-relaxed font-sans bg-[#FAF8F5]">
                <div className="text-[10px] uppercase tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Практика и словарная копилка</span>
                  <span>Wortschatzkiste</span>
                </div>

                <div className="my-auto py-4 space-y-4 text-xs">
                  
                  {/* Vocabulary chest */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-900 text-xs uppercase tracking-wider">
                        📦 Wortschatzkiste (Словарь к уроку)
                      </span>
                      <Smile className="w-4 h-4 text-amber-600" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        { de: 'der Kumpel', ru: 'приятель, бро' },
                        { de: 'chillen', ru: 'отдыхать, чилить' },
                        { de: 'keine Panik!', ru: 'без паники!' },
                        { de: 'Alles klar!', ru: 'Всё ясно / порядок!' },
                      ].map((word, i) => (
                        <div 
                          key={i}
                          onClick={() => speakGerman(word.de)}
                          className="p-2 rounded-lg bg-white border border-amber-200 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                          title="Нажми, чтобы послушать"
                        >
                          <div>
                            <div className="font-bold text-stone-900">{word.de}</div>
                            <div className="text-[10px] text-stone-500">{word.ru}</div>
                          </div>
                          <Volume2 className="w-3 h-3 text-amber-700" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exercise */}
                  <div className="p-3.5 rounded-2xl bg-white border border-stone-300 space-y-2.5">
                    <span className="font-bold text-stone-900 text-xs block">
                      ✍️ Упражнение: выбери правильный ответ!
                    </span>
                    <p className="text-stone-600 text-xs">
                      Как спросить у нового одноклассника «Как дела?»:
                    </p>

                    <div className="space-y-1.5">
                      {[
                        { id: '1', text: 'Wie heißt du?' },
                        { id: '2', text: 'Wie geht’s dir?', correct: true },
                        { id: '3', text: 'Guten Appetit!' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setActiveExerciseAnswer(prev => ({ ...prev, [1]: opt.id }));
                            if (opt.correct) {
                              speakGerman('Sehr gut! Genau richtig!');
                            }
                          }}
                          className={`w-full p-2 text-left rounded-lg text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer ${
                            activeExerciseAnswer[1] === opt.id
                              ? opt.correct
                                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                                : 'bg-rose-50 border-rose-400 text-rose-950'
                              : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                          }`}
                        >
                          <span>{opt.text}</span>
                          {activeExerciseAnswer[1] === opt.id && (
                            opt.correct 
                              ? <Check className="w-4 h-4 text-emerald-600" /> 
                              : <span className="text-[10px] text-rose-600 font-bold">Неверно</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Joke box */}
                  <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 text-[11px] text-stone-600 italic">
                    <strong className="text-stone-900 font-sans not-italic block text-[10px] uppercase tracking-wider mb-0.5">
                      😄 Школьная шутка:
                    </strong>
                    „Lehrer: Lukas, nenne mir bitte drei deutsche Wörter! Lukas: Äh... keine Ahnung!“
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span className="text-[10px]">Wortschatz & Übungen</span>
                  <span>7</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 4: SPREAD 4 (Pages 8-9: Lesson 2 School Day & Grades) */}
          {/* ========================================================= */}
          {currentView === 4 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-[#FAF8F5] relative select-text w-full ${isFullscreen ? 'w-full max-w-7xl min-h-[calc(100dvh-180px)]' : 'max-w-5xl'} min-w-0`}>
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE: Page 8 (School Routine & Grades System) */}
              <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-stone-200/90 flex flex-col justify-between text-stone-800 leading-relaxed font-sans">
                <div className="text-[10px] uppercase tracking-widest text-amber-700 font-bold pb-4 border-b border-stone-200 flex justify-between">
                  <span>Kapitel 2 • Die Schule</span>
                  <span>Noten & Schulalltag</span>
                </div>

                <div className="my-auto py-4 space-y-4">
                  <h4 className="font-display font-black text-lg text-stone-950">
                    Немецкая шкала школьных оценок
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    В Германии система оценок противоположна привычной: лучшая оценка — это 1, а худшая — 6!
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { note: 'Note 1', de: 'Sehr gut', ru: 'Отлично (лучшая!)', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
                      { note: 'Note 2', de: 'Gut', ru: 'Хорошо (4+)', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
                      { note: 'Note 3', de: 'Befriedigend', ru: 'Удовлетворительно', color: 'bg-stone-100 text-stone-800 border-stone-200' },
                      { note: 'Note 4', de: 'Ausreichend', ru: 'Достаточно (троечка)', color: 'bg-amber-50 text-amber-900 border-amber-200' },
                      { note: 'Note 5', de: 'Mangelhaft', ru: 'Плохо (двойка)', color: 'bg-rose-50 text-rose-900 border-rose-200' },
                      { note: 'Note 6', de: 'Ungenügend', ru: 'Неудовлетворительно', color: 'bg-rose-100 text-rose-950 border-rose-300' },
                    ].map((n, i) => (
                      <div key={i} className={`p-2.5 rounded-xl border ${n.color} space-y-0.5`}>
                        <div className="font-bold flex justify-between">
                          <span>{n.note}</span>
                          <span className="font-mono font-black">{n.de}</span>
                        </div>
                        <div className="text-[10px] opacity-80">{n.ru}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
                    <span className="text-xl">🥪</span>
                    <div>
                      <strong className="block font-bold">Große Pause (Большая перемена)</strong>
                      <span className="text-[11px] text-stone-600">Все школьники идут во двор и едят бутерброды (Pausenbrot).</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span>8</span>
                  <span className="text-[10px]">Die Schule & Notensystem</span>
                </div>
              </div>

              {/* RIGHT PAGE: Page 9 (Subjects & Canteen dialogue) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between text-stone-800 leading-relaxed font-sans bg-[#FAF8F5]">
                <div className="text-[10px] uppercase tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Школьные предметы</span>
                  <span>Lieblingsfächer</span>
                </div>

                <div className="my-auto py-4 space-y-4 text-xs">
                  <h4 className="font-display font-black text-lg text-stone-950">
                    Schulfächer (Школьные предметы)
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { de: 'die Pause', ru: 'перемена' },
                      { de: 'der Sport', ru: 'физкультура' },
                      { de: 'die Kunst', ru: 'изо / рисование' },
                      { de: 'die Biologie', ru: 'биология' },
                      { de: 'das Mathe', ru: 'математика' },
                      { de: 'die Geschichte', ru: 'история' },
                    ].map((subj, i) => (
                      <button
                        key={i}
                        onClick={() => speakGerman(`Mein Lieblingsfach ist ${subj.de}`)}
                        className="p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-400 text-left flex items-center justify-between cursor-pointer transition-colors shadow-2xs"
                      >
                        <div>
                          <div className="font-bold text-stone-900">{subj.de}</div>
                          <div className="text-[10px] text-stone-500">{subj.ru}</div>
                        </div>
                        <Volume2 className="w-3 h-3 text-amber-600" />
                      </button>
                    ))}
                  </div>

                  {/* School dialogue */}
                  <div className="p-3.5 rounded-2xl bg-white border border-stone-300 space-y-2">
                    <span className="font-bold text-stone-900 text-xs block">
                      🗣 Разговор в столовой (In der Mensa):
                    </span>
                    <p className="text-stone-800 text-xs italic">
                      — „Was hast du in der Brotdose?“ (Что у тебя в ланчбоксе?)<br />
                      — „Einen Apfel und ein leckeres Käsebrot. Und du?“ (Яблоко и бутерброд с сыром. А у тебя?)<br />
                      — „Schoko-Kekse! Aber pssst, sag es nicht Frau Müller!“ (Шоколадное печенье! Только тсс!)
                    </p>
                    <button
                      onClick={() => speakGerman('Was hast du in der Brotdose? Einen Apfel und ein leckeres Käsebrot!')}
                      className="px-3 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3 h-3 text-amber-600" />
                      <span>Послушать диалог</span>
                    </button>
                  </div>

                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span className="text-[10px]">Mensa & Pausen</span>
                  <span>9</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 5: SPREAD 5 (Pages 10-11: DACH & Secret Slang Dictionary) */}
          {/* ========================================================= */}
          {currentView === 5 && (
            <div className={`grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-stone-300 bg-[#FAF8F5] relative select-text w-full ${isFullscreen ? 'w-full max-w-7xl min-h-[calc(100dvh-180px)]' : 'max-w-5xl'} min-w-0`}>
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none z-20" />

              {/* LEFT PAGE: Page 10 (DACH Countries) */}
              <div className="p-6 sm:p-10 border-b md:border-b-0 md:border-r border-stone-200/90 flex flex-col justify-between text-stone-800 leading-relaxed font-sans">
                <div className="text-[10px] uppercase tracking-widest text-amber-700 font-bold pb-4 border-b border-stone-200 flex justify-between">
                  <span>Landeskunde DACH</span>
                  <span>Deutschland • Österreich • Schweiz</span>
                </div>

                <div className="my-auto py-4 space-y-3.5">
                  <h4 className="font-display font-black text-lg text-stone-950">
                    Три страны — один язык с сюрпризами!
                  </h4>

                  <div className="space-y-2.5 text-xs">
                    
                    {/* Germany */}
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🇩🇪</span>
                        <span>Deutschland (Германия)</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        Столица — Берлин. Родина автобанов, более 300 сортов хлеба и знаменитых мармеладных мишек Haribo.
                      </p>
                    </div>

                    {/* Austria */}
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🇦🇹</span>
                        <span>Österreich (Австрия)</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        Столица — Вена. Картофель здесь называют не «Kartoffel», а «Erdapfel», а помидор — «Paradeiser»!
                      </p>
                    </div>

                    {/* Switzerland */}
                    <div className="p-2.5 rounded-xl bg-white border border-stone-200 space-y-1">
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <span>🇨🇭</span>
                        <span>Schweiz (Швейцария)</span>
                      </div>
                      <p className="text-[11px] text-stone-600">
                        Здесь 4 государственных языка! Вместо «Guten Tag» швейцарцы говорят «Grüezi», а на завтрак едят мюсли Bircher.
                      </p>
                    </div>

                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span>10</span>
                  <span className="text-[10px]">DACH-Kultur</span>
                </div>
              </div>

              {/* RIGHT PAGE: Page 11 (Secret Slang Dictionary) */}
              <div className="p-6 sm:p-10 flex flex-col justify-between text-stone-800 leading-relaxed font-sans bg-[#FAF8F5]">
                <div className="text-[10px] uppercase tracking-widest text-stone-400 pb-4 border-b border-stone-200 flex justify-between">
                  <span>Молодежный сленг</span>
                  <span>Geheimes Slang-Lexikon</span>
                </div>

                <div className="my-auto py-4 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-black text-lg text-stone-950">
                      Словарь молодежного сленга
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                      TOP TREND
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { word: 'Digga / Alter', meaning: 'дружище, бро', ex: '„Digga, hast du die Hausaufgaben?“' },
                      { word: 'Gönn dir!', meaning: 'порадуй себя! / наслаждайся!', ex: '„Ein großes Eis? Gönn dir!“' },
                      { word: 'Lost sein', meaning: 'быть растерянным, не понимать тему', ex: '„In Mathe bin ich total lost.“' },
                      { word: 'Der Ohrwurm', meaning: 'песня, которая застряла в голове', ex: '„Das Lied ist ein echter Ohrwurm!“' },
                      { word: 'Cringe', meaning: 'неловко, кринжово', ex: '„Das Video war so cringe!“' }
                    ].map((item, i) => (
                      <div 
                        key={i}
                        onClick={() => speakGerman(`${item.word}! ${item.ex}`)}
                        className="p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-400 flex items-start justify-between cursor-pointer transition-colors shadow-2xs"
                      >
                        <div className="space-y-0.5">
                          <div className="font-bold text-stone-950 flex items-center gap-2">
                            <span className="text-amber-700">{item.word}</span>
                            <span className="text-stone-400 text-[10px]">[{item.meaning}]</span>
                          </div>
                          <div className="text-[11px] text-stone-600 italic">{item.ex}</div>
                        </div>
                        <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 text-xs text-stone-400 flex justify-between items-center">
                  <span className="text-[10px]">Jugend-Slang</span>
                  <span>11</span>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 6: BACK COVER (Identical to 3D preview, Fullscreen)  */}
          {/* ========================================================= */}
          {currentView === 6 && (
            <div className="w-full flex justify-center">
              <BookBackCover 
                isFullscreen={isFullscreen} 
                onDownloadPdf={handleDownloadPdf} 
              />
            </div>
          )}

        </div>

      </div>

      {/* 3. BOTTOM PAGE SCRUBBER & THUMBNAILS NAVIGATION */}
      <div className={`mt-4 sm:mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs select-none ${
        isFullscreen ? 'border-stone-800 text-stone-300' : 'border-stone-200/80 text-slate-700'
      }`}>
        
        {/* Quick Jump Buttons for Every Spread */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          {viewTitles.map((title, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentView(idx)}
              className={`px-2.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer text-xs ${
                currentView === idx
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-white hover:bg-stone-200/70 text-slate-700 border border-stone-200'
              }`}
              title={title}
            >
              {idx === 0 ? 'Обложка' : idx === 6 ? 'Оборот' : `Стр. ${idx * 2}–${idx * 2 + 1}`}
            </button>
          ))}
        </div>

        {/* Page counter & Next/Prev text buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrevPage}
            disabled={currentView === 0}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-semibold disabled:opacity-30 cursor-pointer shadow-xs"
          >
            ← Назад
          </button>
          <span className="font-mono font-bold text-slate-900 px-2">
            {currentView + 1} / {totalViews}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentView === totalViews - 1}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-semibold disabled:opacity-30 cursor-pointer shadow-xs"
          >
            Вперёд →
          </button>
        </div>

      </div>

    </div>
  );
};
