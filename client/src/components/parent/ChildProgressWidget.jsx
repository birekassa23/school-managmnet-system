import { Link } from 'react-router-dom';

export default function ChildProgressWidget() {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg">
            <i className="fas fa-child" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Child Progress Overview</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Family & Guardian Portal</p>
          </div>
        </div>
        <Link
          to="/notices"
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-md hover:bg-purple-700 transition-all flex items-center gap-1.5"
        >
          <i className="fas fa-bullhorn" /> View Notices
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/50 dark:border-purple-800/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="fas fa-user-check text-purple-600 dark:text-purple-400 text-xl" />
          <div>
            <span className="text-xs font-bold text-purple-900 dark:text-purple-200 block">Student: Abebe Bikila</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Grade 10 - Attendance: Present Today</span>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
          Present
        </span>
      </div>
    </div>
  );
}
