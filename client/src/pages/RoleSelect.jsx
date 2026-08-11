import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function RoleSelect() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
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

      <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8 text-center">
        Select Portal Access
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
        <Link
          to="/login/teacher"
          className="group flex flex-col items-center p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 text-center backdrop-blur-md"
        >
          <i className="fas fa-chalkboard-teacher text-5xl text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">Teacher & Staff</span>
          <small className="text-xs text-slate-500 dark:text-slate-400 mt-1">Staff Administrative Portal</small>
        </Link>

        <Link
          to="/login/student"
          className="group flex flex-col items-center p-8 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:border-amber-400 dark:hover:border-amber-400 hover:-translate-y-1 transition-all duration-200 text-center backdrop-blur-md"
        >
          <i className="fas fa-user-graduate text-5xl text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-slate-900 dark:text-white">Student & Parent</span>
          <small className="text-xs text-slate-500 dark:text-slate-400 mt-1">Family & Student Portal</small>
        </Link>
      </div>

      <p className="mt-8 text-center">
        <Link to="/" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
          ← Back to Welcome Page
        </Link>
      </p>
    </div>
  );
}
