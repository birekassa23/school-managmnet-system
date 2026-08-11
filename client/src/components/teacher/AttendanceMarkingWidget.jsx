import { Link } from 'react-router-dom';

export default function AttendanceMarkingWidget() {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
            <i className="fas fa-clipboard-check" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Classroom Attendance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Daily Student Register</p>
          </div>
        </div>
        <Link
          to="/attendance"
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs shadow-md hover:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
        >
          <i className="fas fa-edit" /> Mark Attendance
        </Link>
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="fas fa-check-circle text-emerald-600 dark:text-emerald-400 text-xl" />
          <div>
            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">Grade 10 - Section A</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Today's register ready for marking</span>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
          Ready
        </span>
      </div>
    </div>
  );
}
