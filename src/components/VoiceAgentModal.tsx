import React, { useState, useEffect } from 'react';
import { Volume2, Check, X, Sparkles, User, Play, Square } from 'lucide-react';
import { 
  VOICE_AGENTS, 
  VoiceAgent, 
  VoiceAgentId, 
  getSelectedVoiceAgentId, 
  setSelectedVoiceAgent, 
  previewVoiceAgent,
  getAgentAssignedVoiceInfo,
  stopSpeaking
} from '../data/bookData';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose }) => {
  const [selectedId, setSelectedId] = useState<VoiceAgentId>(getSelectedVoiceAgentId());
  const [playingAgentId, setPlayingAgentId] = useState<VoiceAgentId | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedId(getSelectedVoiceAgentId());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleVoiceChange = (e: Event) => {
      const customEvent = e as CustomEvent<VoiceAgentId>;
      if (customEvent.detail) {
        setSelectedId(customEvent.detail);
      }
    };
    window.addEventListener('voiceAgentChanged', handleVoiceChange);
    return () => window.removeEventListener('voiceAgentChanged', handleVoiceChange);
  }, []);

  // Listen to global speech lifecycle to keep UI strictly in sync
  useEffect(() => {
    const handleSpeechEnded = () => {
      setPlayingAgentId(null);
    };
    window.addEventListener('speechEnded', handleSpeechEnded);
    return () => window.removeEventListener('speechEnded', handleSpeechEnded);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        stopSpeaking();
        setPlayingAgentId(null);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePreview = (e: React.MouseEvent, agentId: VoiceAgentId) => {
    e.stopPropagation();
    if (playingAgentId === agentId) {
      stopSpeaking();
      setPlayingAgentId(null);
    } else {
      stopSpeaking();
      setPlayingAgentId(agentId);
      previewVoiceAgent(agentId, () => {
        setPlayingAgentId(prev => (prev === agentId ? null : prev));
      });
    }
  };

  const handleSelect = (agentId: VoiceAgentId) => {
    setSelectedId(agentId);
    setSelectedVoiceAgent(agentId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-amber-50/70 via-stone-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-950 flex items-center gap-2">
                <span>Выбор агента озвучки</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-sans font-semibold">
                  DE • Немецкий
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Выбранный агент озвучивает весь сайт: уроки, диалоги, слова и учебник
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              setPlayingAgentId(null);
              onClose();
            }}
            className="w-9 h-9 rounded-xl hover:bg-stone-100 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Закрыть (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Voice Agents */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {VOICE_AGENTS.map((agent: VoiceAgent) => {
            const isSelected = selectedId === agent.id;
            const isPlaying = playingAgentId === agent.id;
            const voiceInfo = getAgentAssignedVoiceInfo(agent);

            return (
              <div
                key={agent.id}
                onClick={() => handleSelect(agent.id)}
                className={`relative p-3.5 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-50/60 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 shadow-2xs'
                }`}
              >
                {/* Left: Avatar & Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="text-3xl p-2 rounded-2xl bg-white border border-stone-200 shadow-2xs shrink-0 select-none">
                    {agent.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-950 text-sm sm:text-base leading-tight">
                        {agent.name}
                      </h4>
                      <span className="text-xs text-slate-600 font-medium">
                        • {agent.titleRu}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-slate-700 font-semibold">
                        {agent.badge}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        agent.gender === 'female' 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {agent.gender === 'female' ? 'Женский голос' : 'Мужской голос'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {agent.role}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <div className="text-[11px] text-amber-800/90 font-mono italic bg-amber-100/60 rounded-lg px-2 py-0.5 inline-block">
                        „{agent.sampleText.slice(0, 48)}…“
                      </div>
                      <span className="text-[10px] text-slate-400 bg-stone-100 px-1.5 py-0.5 rounded">
                        {voiceInfo.voiceName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions (Preview Sample & Select) */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Listen Sample Button */}
                  <button
                    type="button"
                    onClick={(e) => handlePreview(e, agent.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isPlaying
                        ? 'bg-rose-500 text-white shadow-rose-500/20 animate-pulse ring-2 ring-rose-300'
                        : 'bg-white hover:bg-stone-100 text-slate-700 border border-stone-200'
                    }`}
                    title="Прослушать короткий пример звучания этого агента"
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Стоп</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current text-amber-600" />
                        <span>Пример</span>
                      </>
                    )}
                  </button>

                  {/* Select button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(agent.id);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-slate-800'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                        <span>Выбран</span>
                      </>
                    ) : (
                      <span>Выбрать</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 sm:px-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Действует для всех кнопок «Слушать» и озвучивания страниц</span>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setPlayingAgentId(null);
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
