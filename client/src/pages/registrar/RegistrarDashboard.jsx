import { Link } from 'react-router-dom';
import StaffManagementWidget from '../../components/admin/StaffManagementWidget';
import { useAuth } from '../../context/AuthContext';

export default function RegistrarDashboard() {
  const { user } = useAuth();
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Registrar';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-sky-400">
            Academic Registrar & Enrollment Hub
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {displayName} 📑
          </h1>
          <p className="text-slate-300 text-sm">
            Register students, receive & review class marks from lead teachers, and inspect results across all grade sections.
          </p>
        </div>
      </header>

      {/* Staff & Student Management Summary Widget */}
      <StaffManagementWidget />

      {/* Registrar Core Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/register/student"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-sky-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-user-graduate" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Register Student</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enroll new student accounts</p>
        </Link>

        <Link
          to="/registrar/results"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-sky-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-table" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">All Class Results</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review class head submissions</p>
        </Link>

        <Link
          to="/notices"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-sky-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-bullhorn" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">School Notices</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Publish announcements</p>
        </Link>
      </div>
    </div>
  );
}
