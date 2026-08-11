import { Link } from 'react-router-dom';

export default function StudentAttendanceWidget() {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-lg">
            <i className="fas fa-user-graduate" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">My Academic Record</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Student Attendance & Lectures</p>
          </div>
        </div>
        <Link
          to="/lectures"
          className="px-4 py-2 rounded-xl bg-sky-500 text-white font-bold text-xs shadow-md hover:bg-sky-600 transition-all flex items-center gap-1.5"
        >
          <i className="fas fa-play-circle" /> Watch Lectures
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Attendance Rate</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">96%</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Available Lessons</span>
          <span className="text-2xl font-black text-amber-500 mt-1 block">12 Videos</span>
        </div>
      </div>
    </div>
  );
}
