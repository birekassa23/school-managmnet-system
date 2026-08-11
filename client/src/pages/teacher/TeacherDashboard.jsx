import { Link } from 'react-router-dom';
import AttendanceMarkingWidget from '../../components/teacher/AttendanceMarkingWidget';
import { useAuth } from '../../context/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Teacher';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-emerald-400">
            Academic Teacher Workspace
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {displayName} 👨‍🏫
          </h1>
          <p className="text-slate-300 text-sm">
            Take classroom attendance, enter student test marks/results, and push reports to lead teachers.
          </p>
        </div>
      </header>

      {/* Attendance Marking Widget */}
      <AttendanceMarkingWidget />

      {/* Quick Teacher Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/attendance"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-emerald-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-user-check" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Take Attendance</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Submit daily class register</p>
        </Link>

        <Link
          to="/teacher/marks"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-emerald-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-pen-nib" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Take Student Marks</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Input scores & push results</p>
        </Link>

        <Link
          to="/notices"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-emerald-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-bullhorn" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Class Notices</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Post classroom announcements</p>
        </Link>
      </div>
    </div>
  );
}
