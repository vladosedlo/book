import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Heart, 
  Palette, 
  Headphones, 
  Trophy, 
  Gamepad2, 
  Compass, 
  Share2, 
  Volume2, 
  Sparkles,
  Search
} from 'lucide-react';
import { BOOK_TOPICS, speakGerman } from '../data/bookData';
import { BookTopic } from '../types';

export const TopicsSection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<BookTopic>(BOOK_TOPICS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Headphones': return <Headphones className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredTopics = BOOK_TOPICS.filter(t => 
    t.titleRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.titleDe.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="topics-section" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/90">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
            <span>📚 Темы из аннотации</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>9 ключевых разделов</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Темы, близкие и понятные школьникам
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Школа, друзья, семья, хобби, музыка, спорт, игры, путешествия и социальные сети
          </p>
        </div>

        {/* Quick filter */}
        <div className="relative">
          <input
            type="text"
            placeholder="Найти тему или слово..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs rounded-xl bg-stone-100 border border-stone-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 w-full sm:w-64"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Topic Grid List */}
        <div className="lg:col-span-5 space-y-2 max-h-[500px] overflow-y-auto pr-1">
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 text-slate-950 shadow-xs'
                    : 'bg-stone-50/70 border-stone-200/70 hover:bg-stone-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-white text-slate-600 border border-stone-200'}`}>
                    {getIcon(topic.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {topic.titleRu}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {topic.titleDe}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-200/60 text-slate-600">
                  {topic.sampleWords.length} сл.
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Topic Detailed Showcase */}
        <div className="lg:col-span-7 bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200/80 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {selectedTopic.titleDe}
                </span>
                <h4 className="text-2xl font-black text-slate-900 font-display mt-0.5">
                  {selectedTopic.titleRu}
                </h4>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-stone-200 text-amber-600 shadow-xs">
                {getIcon(selectedTopic.icon)}
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedTopic.description}
            </p>

            {/* Fun Fact */}
            <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
              💡 <strong>Забавный факт из учебника:</strong> {selectedTopic.funFact}
            </div>

            {/* Vocabulary Mini-Pills with German Audio */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                Слова и фразы для школьников (нажмите, чтобы услышать)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTopic.sampleWords.map((word, wIdx) => (
                  <div
                    key={wIdx}
                    onClick={() => speakGerman(word.de)}
                    className="p-3 bg-white rounded-xl border border-stone-200 hover:border-amber-400 hover:shadow-xs cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-sm font-bold text-slate-900 block group-hover:text-amber-800 transition-colors">
                        {word.de}
                      </span>
                      {word.phonetic && (
                        <span className="text-[10px] text-amber-700 font-medium block">
                          [{word.phonetic}]
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        {word.ru}
                      </span>
                    </div>

                    <Volume2 className="w-4 h-4 text-slate-300 group-hover:text-amber-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-stone-200/80 text-xs text-slate-400 flex justify-between items-center">
            <span>Учебный блок A1–A2</span>
            <span>Comics &amp; Games Inside</span>
          </div>

        </div>

      </div>
    </section>
  );
};
