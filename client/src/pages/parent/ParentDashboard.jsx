import { Link } from 'react-router-dom';
import ChildProgressWidget from '../../components/parent/ChildProgressWidget';
import { useAuth } from '../../context/AuthContext';

export default function ParentDashboard() {
  const { user } = useAuth();
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Parent / Guardian';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-purple-400">
            Family & Parent Guardian Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {displayName} 👨‍👩‍👧
          </h1>
          <p className="text-slate-300 text-sm">
            Track Abebe Bikila's exam results, behavioral trajectory, and message instructors directly.
          </p>
        </div>
      </header>

      {/* Child Progress Widget */}
      <ChildProgressWidget />

      {/* Parent Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/child-results"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-purple-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-graduation-cap" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Abebe's Exam Results</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Course grades & report card</p>
        </Link>

        <Link
          to="/parent-messages"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-purple-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-comments" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Contact Instructors</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Send comments to teachers</p>
        </Link>

        <Link
          to="/notices"
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-purple-400 block group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">
            <i className="fas fa-bullhorn" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">School Notices</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Official academy updates</p>
        </Link>
      </div>
    </div>
  );
}
