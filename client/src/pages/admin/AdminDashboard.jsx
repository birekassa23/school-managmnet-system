import { Link } from 'react-router-dom';
import StaffManagementWidget from '../../components/admin/StaffManagementWidget';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Administrator';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-amber-400">
            Executive Administrative Control
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {displayName} 👋
          </h1>
          <p className="text-slate-300 text-sm">
            Azene Wube Academy System Oversight, Staff Registration & School Management.
          </p>
        </div>
      </header>

      {/* Staff Management Widget */}
      <StaffManagementWidget />

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          to="/teacher/register"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-user-plus" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Register Staff</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Onboard academic teachers</p>
        </Link>

        <Link
          to="/notices"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-bullhorn" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">School Notices</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Publish announcements</p>
        </Link>

        <Link
          to="/attendance"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-clipboard-list" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Attendance Logs</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review school registers</p>
        </Link>

        <Link
          to="/events"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-calendar-alt" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">School Events</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Manage activities</p>
        </Link>
      </div>
    </div>
  );
}
