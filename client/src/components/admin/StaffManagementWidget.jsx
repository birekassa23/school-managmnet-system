import { Link } from 'react-router-dom';

export default function StaffManagementWidget() {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg">
            <i className="fas fa-user-shield" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Staff & Faculty Management</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Director & HR Onboarding Portal</p>
          </div>
        </div>
        <Link
          to="/teacher/register"
          className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-500 transition-all flex items-center gap-1.5"
        >
          <i className="fas fa-user-plus" /> Register New Teacher
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Academic Staff</span>
          <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">24 Active</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Enrolled Students</span>
          <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">480 Active</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Active Sections</span>
          <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">12 Grades</span>
        </div>
      </div>
    </div>
  );
}
