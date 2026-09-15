import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, BookOpen, Layers, FileText, Check, ChevronDown, Play, Square } from 'lucide-react';
import { speakGerman, getSelectedVoiceAgent, previewVoiceAgent, stopSpeaking, VoiceAgent } from '../data/bookData';
import { VoiceAgentModal } from './VoiceAgentModal';

export type HeaderTab = 'annotation' | 'topics' | 'practice' | 'textbook';

interface HeaderProps {
  activeTab: HeaderTab;
  onSelectTab: (tab: HeaderTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab }) => {
  const [currentAgent, setCurrentAgent] = useState<VoiceAgent>(getSelectedVoiceAgent());
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleVoiceChanged = () => {
      setCurrentAgent(getSelectedVoiceAgent());
    };
    const handleSpeechEnded = () => {
      setIsPlayingAudio(false);
    };

    window.addEventListener('voiceAgentChanged', handleVoiceChanged);
    window.addEventListener('speechEnded', handleSpeechEnded);
    return () => {
      window.removeEventListener('voiceAgentChanged', handleVoiceChanged);
      window.removeEventListener('speechEnded', handleSpeechEnded);
    };
  }, []);

  const handleQuickPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      stopSpeaking();
      setIsPlayingAudio(true);
      previewVoiceAgent(currentAgent.id, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <>
      <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Logo & Textbook Brand */}
            <div 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink min-w-0" 
              onClick={() => onSelectTab('annotation')}
              title="Главная страница учебника"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-950 p-0.5 shadow-md flex items-center justify-center border border-slate-800 shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="text-lg sm:text-2xl font-black text-amber-400 font-display">D</span>
                  <span className="text-rose-400 font-black text-xs sm:text-sm -ml-0.5">Q</span>
                </div>
              </div>

              <div className="min-w-0">
                <h1 className="text-xs sm:text-lg font-extrabold font-display text-slate-950 tracking-tight leading-tight truncate">
                  <span className="hidden sm:inline">Deutsch mit Spaß und Quatsch</span>
                  <span className="sm:hidden">Deutsch mit Spaß</span>
                </h1>
                <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                  Современный учебник немецкого языка для школьников
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5 bg-stone-100/90 p-1 rounded-xl border border-stone-200/80">
              <button
                id="nav-btn-annotation"
                onClick={() => onSelectTab('annotation')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'annotation'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Аннотация</span>
              </button>

              <button
                id="nav-btn-topics"
                onClick={() => onSelectTab('topics')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'topics'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-rose-500" />
                <span>Темы и Лексика</span>
              </button>

              <button
                id="nav-btn-practice"
                onClick={() => onSelectTab('practice')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'practice'
                    ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'practice' ? 'text-amber-200' : 'text-amber-500'}`} />
                <span>Тесты и тренажёр</span>
              </button>

              <button
                id="nav-btn-textbook"
                onClick={() => onSelectTab('textbook')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'textbook'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Учебник</span>
              </button>
            </nav>

            {/* Voice Agent Selector & Quick Sample Preview */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Choose Voice Agent Button */}
              <button
                id="btn-choose-voice-agent"
                onClick={() => setIsVoiceModalOpen(true)}
                title="Выбрать голос озвучки для всего сайта"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-amber-300 text-slate-800 shadow-xs transition-all cursor-pointer"
              >
                <span className="text-sm sm:text-base leading-none select-none">{currentAgent.avatar}</span>
                <div className="text-left hidden sm:block">
                  <div className="text-[10px] text-slate-400 font-medium leading-none">
                    Озвучка:
                  </div>
                  <div className="text-[11px] font-bold text-slate-900 leading-tight">
                    {currentAgent.name}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* Short Voice Sample Button */}
              <button
                id="btn-voice-quick-sample"
                onClick={handleQuickPreview}
                title={`Послушать пример озвучки: ${currentAgent.name}`}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm ring-2 ring-rose-200'
                    : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900 shadow-xs'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Square className="w-3.5 h-3.5 text-rose-600 fill-current animate-pulse" />
                    <span className="font-bold text-[11px] sm:text-xs">Стоп</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-amber-600 fill-current" />
                    <span className="font-bold text-[11px] sm:text-xs">Пример</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Responsive Mobile Sub-Navigation Bar */}
          <div className="lg:hidden flex items-center gap-1 pb-2.5 pt-0.5 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => onSelectTab('annotation')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'annotation' 
                ? 'bg-slate-950 text-white shadow-xs' 
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Аннотация
          </button>
          <button
            onClick={() => onSelectTab('topics')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'topics' 
                ? 'bg-slate-950 text-white shadow-xs' 
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Темы (9)
          </button>
          <button
            onClick={() => onSelectTab('practice')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              activeTab === 'practice' 
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs' 
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            Тесты и тренажёр
          </button>
          <button
            onClick={() => onSelectTab('textbook')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === 'textbook' 
                ? 'bg-slate-950 text-white shadow-xs' 
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200'
            }`}
          >
            Учебник
          </button>
        </div>

      </div>
    </header>

    <VoiceAgentModal 
      isOpen={isVoiceModalOpen} 
      onClose={() => setIsVoiceModalOpen(false)} 
    />
  </>
  );
};
