import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function StoreDashboard() {
  const { user } = useAuth();
  const displayName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Store Keeper';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-amber-400">
            Academy Store & Stock Management Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Welcome, {displayName} 📦
          </h1>
          <p className="text-slate-300 text-sm">
            Manage educational supplies, textbooks, laboratory gear, classroom furniture, and stock requisitions.
          </p>
        </div>
      </header>

      {/* Stock Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 capitalize">Total Inventory Registered</span>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white">638 Items</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">Across 5 Categories</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 capitalize">Estimated Assets Value</span>
          <h3 className="text-3xl font-black text-emerald-600 dark:text-emerald-400">1,154,200 ETB</h3>
          <p className="text-xs text-slate-400 font-semibold pt-1">School Property Balance</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 capitalize">Low Stock & Reorder Alerts</span>
          <h3 className="text-3xl font-black text-amber-500">2 Items</h3>
          <p className="text-xs text-red-500 font-semibold pt-1">Lab Set & Sports Nets</p>
        </div>
      </div>

      {/* Store Keeper Action Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/store/inventory"
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group space-y-2"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            <i className="fas fa-boxes" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Store Stock & Inventory</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">View textbook stocks, add new items, and track total inventory assets.</p>
        </Link>

        <Link
          to="/notices"
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all hover:border-amber-400 block group space-y-2"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            <i className="fas fa-bullhorn" />
          </div>
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Academy Bulletins</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Read and post store maintenance and stock arrival notices.</p>
        </Link>
      </div>
    </div>
  );
}
