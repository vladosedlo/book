import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Trophy,
  Smile,
  Shuffle,
  Layers,
  Check
} from 'lucide-react';
import { HAT_CARDS, QUIZ_QUESTIONS, speakGerman, shuffleArray } from '../data/bookData';
import { PracticeCard, QuizQuestion } from '../types';

interface ShuffledQuizItem {
  id: string;
  questionDe: string;
  questionRu: string;
  options: string[];
  correctText: string;
  explanation: string;
}

interface MatchPair {
  id: string;
  de: string;
  ru: string;
}

const INITIAL_MATCH_PAIRS: MatchPair[] = [
  { id: '1', de: 'der Quatsch', ru: 'ерунда, весёлые шалости' },
  { id: '2', de: 'der Ohrwurm', ru: 'привязчивая мелодия в голове' },
  { id: '3', de: 'die Schulpause', ru: 'школьная перемена' },
  { id: '4', de: 'der Kumpel', ru: 'верный приятель, друг' },
  { id: '5', de: 'chillen', ru: 'отдыхать и расслабляться' }
];

export const InteractiveHat: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'cards' | 'quiz' | 'match'>('cards');
  
  // Vocabulary cards state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [studiedCount, setStudiedCount] = useState<number>(1);
  const [savedCards, setSavedCards] = useState<string[]>([]);

  // Quiz state with randomized answers on page load & restart
  const [shuffledQuiz, setShuffledQuiz] = useState<ShuffledQuizItem[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOptionText, setSelectedOptionText] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Matching game state with randomized orders
  const [shuffledGerman, setShuffledGerman] = useState<MatchPair[]>([]);
  const [shuffledRussian, setShuffledRussian] = useState<MatchPair[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedGermanId, setSelectedGermanId] = useState<string | null>(null);
  const [selectedRussianId, setSelectedRussianId] = useState<string | null>(null);

  // Initialize randomized quiz options and matching pairs on load
  useEffect(() => {
    initRandomizedQuiz();
    initRandomizedMatch();
  }, []);

  const initRandomizedQuiz = () => {
    const prepared: ShuffledQuizItem[] = QUIZ_QUESTIONS.map(q => {
      const correctText = q.options[q.correctIndex];
      const randomizedOptions = shuffleArray(q.options);
      return {
        id: q.id,
        questionDe: q.questionDe,
        questionRu: q.questionRu,
        options: randomizedOptions,
        correctText: correctText,
        explanation: q.explanation
      };
    });
    setShuffledQuiz(prepared);
    setQuizIndex(0);
    setSelectedOptionText(null);
    setScore(0);
    setQuizFinished(false);
  };

  const initRandomizedMatch = () => {
    // Shuffle German column and Russian column completely independently
    const deList = shuffleArray([...INITIAL_MATCH_PAIRS]);
    let ruList = shuffleArray([...INITIAL_MATCH_PAIRS]);
    
    // Ensure that row by row they don't accidentally match in the same order
    if (ruList.every((item, idx) => item.id === deList[idx]?.id) && ruList.length > 1) {
      ruList = [...ruList.slice(1), ruList[0]];
    }

    setShuffledGerman(deList);
    setShuffledRussian(ruList);
    setMatchedIds([]);
    setSelectedGermanId(null);
    setSelectedRussianId(null);
  };

  const currentCard: PracticeCard = HAT_CARDS[currentCardIndex % HAT_CARDS.length];

  const handleNextCard = () => {
    setIsPulling(true);
    setTimeout(() => {
      const nextIdx = (currentCardIndex + 1) % HAT_CARDS.length;
      setCurrentCardIndex(nextIdx);
      setStudiedCount(prev => prev + 1);
      setIsPulling(false);
      speakGerman(HAT_CARDS[nextIdx].german);
    }, 250);
  };

  const handleToggleSave = (id: string) => {
    if (savedCards.includes(id)) {
      setSavedCards(savedCards.filter(c => c !== id));
    } else {
      setSavedCards([...savedCards, id]);
    }
  };

  const currentQuizItem = shuffledQuiz[quizIndex] || null;

  const handleSelectQuizOption = (optionText: string) => {
    if (selectedOptionText !== null || !currentQuizItem) return;
    setSelectedOptionText(optionText);
    if (optionText === currentQuizItem.correctText) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex + 1 < shuffledQuiz.length) {
      setQuizIndex(quizIndex + 1);
      setSelectedOptionText(null);
    } else {
      setQuizFinished(true);
    }
  };

  // Matching pair handler
  const handleSelectGerman = (id: string, deWord: string) => {
    speakGerman(deWord);
    if (matchedIds.includes(id)) return;
    setSelectedGermanId(id);

    if (selectedRussianId) {
      checkMatch(id, selectedRussianId);
    }
  };

  const handleSelectRussian = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedRussianId(id);

    if (selectedGermanId) {
      checkMatch(selectedGermanId, id);
    }
  };

  const checkMatch = (deId: string, ruId: string) => {
    if (deId === ruId) {
      setMatchedIds(prev => [...prev, deId]);
      setSelectedGermanId(null);
      setSelectedRussianId(null);
    } else {
      setTimeout(() => {
        setSelectedGermanId(null);
        setSelectedRussianId(null);
      }, 500);
    }
  };

  return (
    <section id="interactive-practice" className="bg-white rounded-3xl p-4 sm:p-8 lg:p-10 shadow-sm border border-stone-200/90 relative">
      
      {/* Section Header without any "hat" references */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <span>✨ Deutsch mit Spaß</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Интерактивная отработка</span>
          </div>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display tracking-tight">
            Интерактивные тесты и тренажёр
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Закрепляйте лексику, устойчивые выражения и грамматику из учебника в лёгкой игровой форме
          </p>
        </div>

        {/* Practice Mode switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200/80 text-xs font-semibold overflow-x-auto max-w-full scrollbar-none">
          <button
            id="btn-mode-cards"
            onClick={() => setActiveMode('cards')}
            className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'cards'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            <span>Карточки</span>
          </button>
          <button
            id="btn-mode-quiz"
            onClick={() => setActiveMode('quiz')}
            className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'quiz'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Интерактивный тест</span>
          </button>
          <button
            id="btn-mode-match"
            onClick={() => setActiveMode('match')}
            className={`px-3 sm:px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'match'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <span>🧩 Соедини пары</span>
          </button>
        </div>
      </div>

      {/* MODE 1: VOCABULARY PRACTICE CARDS */}
      {activeMode === 'cards' && (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Card Generator & Controls */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 sm:p-6 bg-gradient-to-b from-amber-50/60 to-stone-50 rounded-3xl border border-amber-200/70 text-center relative overflow-hidden">
            
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl sm:text-3xl shadow-md my-2">
              🗂️
            </div>

            <h4 className="text-base font-extrabold text-slate-900 font-display mt-2">
              Тренажёр активных слов
            </h4>
            <p className="text-xs text-slate-600 max-w-xs mt-1">
              Нажимайте кнопку для перехода к следующему выражению с немецким произношением
            </p>

            <button
              id="next-card-btn"
              onClick={handleNextCard}
              disabled={isPulling}
              className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Shuffle className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
              <span>Следующее слово</span>
            </button>

            <span className="text-[11px] text-slate-500 mt-3 font-medium">
              Просмотрено карточек: <strong className="text-slate-900">{studiedCount}</strong> из {HAT_CARDS.length}
            </span>
          </div>

          {/* Current Card Visual Presentation */}
          <div className="lg:col-span-7">
            <div className="bg-stone-50 rounded-3xl p-4 sm:p-8 border border-stone-200/90 shadow-xs relative transition-all">
              
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 sm:pb-4 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 text-xs font-bold">
                    {currentCard.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Карточка {currentCardIndex + 1} из {HAT_CARDS.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakGerman(currentCard.german)}
                    className="p-2 rounded-xl bg-white hover:bg-amber-100 border border-stone-200 text-amber-800 transition-colors shadow-xs cursor-pointer"
                    title="Слушать произношение выбранным голосом"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleSave(currentCard.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      savedCards.includes(currentCard.id)
                        ? 'bg-amber-500 text-white border-amber-600'
                        : 'bg-white text-slate-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {savedCards.includes(currentCard.id) ? '★ В избранном' : '☆ Запомнить'}
                  </button>
                </div>
              </div>

              {/* Expression & Translation */}
              <div className="my-6">
                <h4 className="text-2xl sm:text-3xl font-black text-slate-950 font-display tracking-tight">
                  {currentCard.german}
                </h4>
                {currentCard.pronunciation && (
                  <p className="text-xs font-semibold text-amber-800 mt-1">
                    [{currentCard.pronunciation}]
                  </p>
                )}
                <p className="text-lg sm:text-xl font-bold text-slate-800 mt-2.5">
                  {currentCard.russian}
                </p>
              </div>

              {/* Context / Real Speech Example */}
              {currentCard.exampleDe && (
                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5 shadow-xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Пример в живой речи
                  </span>
                  <p className="text-sm font-semibold text-slate-900 flex items-center justify-between">
                    <span>{currentCard.exampleDe}</span>
                    <button
                      onClick={() => speakGerman(currentCard.exampleDe || '')}
                      title="Озвучить пример"
                      className="p-1 text-slate-400 hover:text-amber-600 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    {currentCard.exampleRu}
                  </p>
                </div>
              )}

              {/* Fun Fact / Secret Note */}
              {currentCard.humorNote && (
                <div className="mt-4 flex items-start gap-2.5 text-xs text-amber-950 bg-amber-50 p-3 rounded-xl border border-amber-200/70">
                  <Smile className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Секрет учебника:</strong> {currentCard.humorNote}</span>
                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* MODE 2: INTERACTIVE QUIZ WITH EQUAL PROGRESS BARS AND SHUFFLED ANSWERS */}
      {activeMode === 'quiz' && (
        <div className="mt-8 max-w-2xl mx-auto">
          {!quizFinished && currentQuizItem ? (
            <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
              
              {/* Header Info */}
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">
                  Вопрос <strong>{quizIndex + 1}</strong> из {shuffledQuiz.length}
                </span>
                <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Правильно: {score}
                </span>
              </div>

              {/* EQUAL SHARE SEGMENTED PROGRESS BAR */}
              {/* Divides 100% strictly into equal shares corresponding to questions count */}
              <div className="space-y-1">
                <div className="grid grid-cols-5 gap-2 w-full">
                  {shuffledQuiz.map((_, idx) => {
                    const isCompleted = idx < quizIndex;
                    const isCurrent = idx === quizIndex;
                    return (
                      <div
                        key={idx}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-xs'
                            : isCurrent
                            ? 'bg-amber-400 ring-2 ring-amber-300 ring-offset-1'
                            : 'bg-stone-200'
                        }`}
                        title={`Шаг ${idx + 1} из ${shuffledQuiz.length}`}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Старт</span>
                  <span>Шаг {quizIndex + 1} из {shuffledQuiz.length} ({(Math.round(((quizIndex + 1) / shuffledQuiz.length) * 100))}%)</span>
                  <span>Финиш</span>
                </div>
              </div>

              {/* Question text */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block">
                  {currentQuizItem.questionDe}
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-950 mt-1 font-display leading-snug">
                  {currentQuizItem.questionRu}
                </h4>
              </div>

              {/* Options (shuffled randomized order on mount) */}
              <div className="space-y-2.5">
                {currentQuizItem.options.map((optionText, oIdx) => {
                  let btnStyle = "bg-white border-stone-200 text-slate-800 hover:border-amber-400 hover:bg-stone-50";
                  if (selectedOptionText !== null) {
                    if (optionText === currentQuizItem.correctText) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400";
                    } else if (selectedOptionText === optionText) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-medium";
                    } else {
                      btnStyle = "bg-stone-100 border-stone-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={selectedOptionText !== null}
                      onClick={() => handleSelectQuizOption(optionText)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{optionText}</span>
                      {selectedOptionText !== null && optionText === currentQuizItem.correctText && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {selectedOptionText === optionText && optionText !== currentQuizItem.correctText && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next question button */}
              {selectedOptionText !== null && (
                <div className="pt-4 border-t border-stone-200 space-y-4">
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
                    💡 <strong>Пояснение:</strong> {currentQuizItem.explanation}
                  </div>
                  <button
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{quizIndex + 1 < shuffledQuiz.length ? 'Следующий вопрос' : 'Посмотреть результат'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-stone-50 rounded-3xl p-8 border border-stone-200/90 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
                <Trophy className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 font-display">
                Тест успешно завершён!
              </h4>
              <p className="text-base text-slate-700">
                Ваш результат: <strong className="text-rose-600 text-xl font-bold">{score}</strong> из {shuffledQuiz.length}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                {score === shuffledQuiz.length 
                  ? 'Превосходно! Вы отлично усвоили материал учебника!'
                  : 'Хороший результат! В нашем учебнике ошибки — это естественный и весёлый шаг к знаниям.'}
              </p>
              <button
                onClick={initRandomizedQuiz}
                className="px-6 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Пройти заново (с новым порядком ответов)</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: MATCHING PAIRS WITH INDEPENDENTLY SHUFFLED COLUMNS */}
      {activeMode === 'match' && (
        <div className="mt-8 max-w-3xl mx-auto space-y-6">
          <div className="bg-amber-50 p-3.5 sm:p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <span>Нажмите на немецкое слово, а затем найдите его точный перевод:</span>
            <button
              onClick={initRandomizedMatch}
              className="text-amber-800 font-bold hover:underline cursor-pointer flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Перемешать заново</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* German column (shuffled randomly) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Немецкие слова (случайный порядок)
              </span>
              {shuffledGerman.map(item => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedGermanId === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectGerman(item.id, item.de)}
                    className={`w-full p-3.5 rounded-xl border text-sm font-semibold text-left transition-all flex items-center justify-between cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 line-through'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                        : 'bg-white border-stone-200 text-slate-900 hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.de}</span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                );
              })}
            </div>

            {/* Russian column (independently shuffled randomly) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Русские переводы (случайный порядок)
              </span>
              {shuffledRussian.map(item => {
                const isMatched = matchedIds.includes(item.id);
                const isSelected = selectedRussianId === item.id;
                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectRussian(item.id)}
                    className={`w-full p-3.5 rounded-xl border text-sm font-medium text-left transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60 line-through'
                        : isSelected
                        ? 'bg-rose-100 border-rose-500 text-rose-950 ring-2 ring-rose-400'
                        : 'bg-white border-stone-200 text-slate-900 hover:border-rose-300 hover:bg-stone-50'
                    }`}
                  >
                    {item.ru}
                  </button>
                );
              })}
            </div>

          </div>

          {matchedIds.length === INITIAL_MATCH_PAIRS.length && (
            <div className="p-4 rounded-2xl bg-emerald-100 text-emerald-950 font-bold text-sm text-center flex items-center justify-center gap-2">
              <span>🎉 Все 5 пар успешно сопоставлены! Wunderbar!</span>
              <button
                onClick={initRandomizedMatch}
                className="ml-3 px-3 py-1 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800"
              >
                Сыграть ещё
              </button>
            </div>
          )}
        </div>
      )}

    </section>
  );
};

// Export alias for semantic clarity
export const InteractivePractice = InteractiveHat;

