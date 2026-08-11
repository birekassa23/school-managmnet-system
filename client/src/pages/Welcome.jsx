import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Welcome() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 md:p-12 text-center bg-gradient-to-br from-slate-50 via-amber-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Top Right Theme Switcher Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
          aria-label="Toggle theme"
          className="w-11 h-11 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 dark:text-amber-300 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
        >
          <i className={`fas ${isDark ? 'fa-sun text-amber-300 text-lg' : 'fa-moon text-slate-700 text-lg'}`} />
        </button>
      </div>

      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl flex flex-col items-center space-y-6">
        {/* Excellence Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 dark:bg-amber-400/10 border border-amber-400/40 text-amber-800 dark:text-amber-300 text-xs font-bold capitalize tracking-widest shadow-sm">
          <i className="fas fa-star" /> Excellence in Education
        </div>

        {/* Brand Icon Badge */}
        <img
          src="/images/academy_logo.jpg"
          alt="Azene Wube Academy Logo"
          className="w-24 h-24 rounded-3xl object-cover border-2 border-amber-400/50 shadow-2xl shadow-amber-500/30"
        />

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-300 dark:to-amber-500">
            Azene Wube Academy
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
          Your digital campus for notices, lessons, events, gallery, and attendance — all in one place for students, parents, and teachers.
        </p>

        {/* CTA Button */}
        <Link
          to="/login"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-400/30 hover:scale-105 hover:shadow-amber-500/50 transition-all duration-200"
        >
          Enter Portal Access <i className="fas fa-arrow-right" />
        </Link>

        {/* Hero Campus Image Showcase Banner */}
        <div className="w-full mt-4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 max-w-3xl group relative">
          <img
            src="/images/campus_hero.jpg"
            alt="Azene Wube Academy Campus"
            className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6 text-left">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Digital Campus</span>
              <h3 className="text-white text-xl sm:text-2xl font-black">Modern Educational Facilities & Innovation</h3>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid with Rich Images */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-3xl">
          {/* Card 1: Video Lessons */}
          <div className="flex flex-col items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-400 transition-all backdrop-blur-md overflow-hidden text-left group">
            <div className="w-full h-36 overflow-hidden relative">
              <img
                src="/images/video_lessons.jpg"
                alt="Video Lessons"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center text-sm shadow-md">
                <i className="fas fa-book-reader" />
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white text-base block">Video Lessons</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Curated class lectures & course materials</span>
            </div>
          </div>

          {/* Card 2: School Notices */}
          <div className="flex flex-col items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-400 transition-all backdrop-blur-md overflow-hidden text-left group">
            <div className="w-full h-36 overflow-hidden relative">
              <img
                src="/images/school_notices.jpg"
                alt="School Notices"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center text-sm shadow-md">
                <i className="fas fa-bullhorn" />
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white text-base block">School Notices</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Instant academic announcements & bulletins</span>
            </div>
          </div>

          {/* Card 3: Photo Gallery */}
          <div className="flex flex-col items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-400 transition-all backdrop-blur-md overflow-hidden text-left group">
            <div className="w-full h-36 overflow-hidden relative">
              <img
                src="/images/photo_gallery.jpg"
                alt="Photo Gallery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center text-sm shadow-md">
                <i className="fas fa-images" />
              </div>
            </div>
            <div className="p-4 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white text-base block">Photo Gallery</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Memorable campus activities & student achievements</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
