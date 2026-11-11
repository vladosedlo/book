import React, { useRef, useState } from 'react';
import { Video, Camera, Play, Clock, CheckCircle2, MonitorPlay } from 'lucide-react';
import { VideoLesson } from '../types';

const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'lesson-1',
    title: 'Видеоурок-1',
    description: 'Определенные и неопределенные артикли.',
    duration: '02:46',
    src: '/videos/lesson-1.mp4',
  },
  {
    id: 'lesson-2',
    title: 'Видеоурок-2',
    description: 'Грамматика.',
    duration: '06:45',
    src: '/videos/lesson-2.mp4',
  },
  {
    id: 'lesson-3',
    title: 'Видеоурок-3',
    description: 'Разговорная практика.',
    duration: '07:10',
    src: '/videos/lesson-3.mp4',
  },
];

export const VideoLessonsSection: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState(VIDEO_LESSONS[0].id);
  const playerRef = useRef<HTMLVideoElement>(null);

  const activeLesson = VIDEO_LESSONS.find((l) => l.id === activeLessonId) ?? VIDEO_LESSONS[0];

  const selectLesson = (lesson: VideoLesson) => {
    setActiveLessonId(lesson.id);
    setTimeout(() => playerRef.current?.play().catch(() => {}), 80);
  };

  return (
    <section id="video-lessons-section" className="scroll-mt-24 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-[11px] font-bold">
            <Camera className="w-3.5 h-3.5 text-rose-500" />
            <span>Видеоуроки</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-950 tracking-tight">
            Смотрите и слушайте немецкий
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Короткие видеоуроки к учебнику. Выберите урок в списке справа.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <MonitorPlay className="w-4 h-4 text-slate-400" />
          <span>{VIDEO_LESSONS.length} урока</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Player */}
        <div className="lg:col-span-8">
          <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
            <div className="relative aspect-video bg-black">
              <video
                key={activeLesson.id}
                ref={playerRef}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                controls
                playsInline
                preload="metadata"
                poster={activeLesson.poster}
                src={activeLesson.src}
              >
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>

            <div className="px-5 py-4 flex items-start justify-between gap-4 bg-slate-950">
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white font-display truncate">
                  {activeLesson.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeLesson.description}</p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-[11px] font-bold">
                <Clock className="w-3 h-3" />
                {activeLesson.duration}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 px-1 text-[11px] text-slate-500">
            <Video className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />

          </div>
        </div>

        {/* Vertical lesson list */}
        <aside className="lg:col-span-4">
          <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs p-2.5 space-y-2">
            {VIDEO_LESSONS.map((lesson, index) => {
              const isActive = lesson.id === activeLesson.id;
              return (
                <button
                  key={lesson.id}
                  id={`video-lesson-btn-${index + 1}`}
                  onClick={() => selectLesson(lesson)}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 border-slate-900 text-white shadow-md'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-gradient-to-br from-amber-500 to-rose-500' : 'bg-white border border-stone-200'
                    }`}
                  >
                    {isActive ? (
                      <Play className="w-4 h-4 text-white fill-current" />
                    ) : (
                      <span className="text-sm font-black text-slate-500 font-display">{index + 1}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-grow">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold font-display truncate">{lesson.title}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                    </div>
                    <p className={`text-[11px] truncate ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                      {lesson.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-slate-800 text-slate-300' : 'bg-white border border-stone-200 text-slate-400'
                    }`}
                  >
                    {lesson.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
};
