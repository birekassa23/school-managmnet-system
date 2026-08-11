import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const errors = {
  empty: 'All mandatory fields are required.',
  invalid: 'Names must contain letters only.',
  email: 'Invalid email address format.',
  shortpass: 'Password must be at least 6 characters.',
  notnum: 'Phone number must be a 10-digit number.',
  usernametaken: 'Username is already taken by another account.',
  emailtaken: 'Email is already registered in the system.',
};

export default function TeacherRegister() {
  const { isPrincipal } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first: '',
    last: '',
    uid: '',
    email: '',
    pwd: '',
    phn: '',
    class: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isPrincipal) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Access Restricted</h2>
        <p className="text-slate-500 dark:text-slate-400">Only the School Principal can register new academic teachers.</p>
        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api('/auth/teacher/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(errors[err.code] || err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            👨‍🏫 Register New Teacher
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Register new academic faculty members and assign their teaching classes.
          </p>
        </div>
        <Link to="/home" className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
          ← Back to Dashboard
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-sm font-medium border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-sm font-medium border border-emerald-200 dark:border-emerald-800 text-center">
          ✅ Teacher account registered successfully! Redirecting...
        </div>
      )}

      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="first" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                First Name *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-user text-slate-400 mr-3 text-sm" />
                <input
                  id="first"
                  type="text"
                  name="first"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="e.g. Abebe"
                  value={form.first}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="last" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Last Name *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-user text-slate-400 mr-3 text-sm" />
                <input
                  id="last"
                  type="text"
                  name="last"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="e.g. Bikila"
                  value={form.last}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="uid" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Account Username *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-id-badge text-slate-400 mr-3 text-sm" />
                <input
                  id="uid"
                  type="text"
                  name="uid"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="e.g. abebe.b"
                  value={form.uid}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                E-mail Address *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-envelope text-slate-400 mr-3 text-sm" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="teacher@azenewube.edu.et"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="pwd" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Password *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-lock text-slate-400 mr-3 text-sm" />
                <input
                  id="pwd"
                  type="password"
                  name="pwd"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="At least 6 characters"
                  value={form.pwd}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="phn" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
                Phone Number *
              </label>
              <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
                <i className="fas fa-phone text-slate-400 mr-3 text-sm" />
                <input
                  id="phn"
                  type="text"
                  name="phn"
                  className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                  placeholder="e.g. 0911223344"
                  value={form.phn}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="class" className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
              Assigned Class / Grade Section
            </label>
            <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-amber-400 bg-white dark:bg-slate-950">
              <i className="fas fa-chalkboard-teacher text-slate-400 mr-3 text-sm" />
              <input
                id="class"
                type="text"
                name="class"
                className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
                placeholder="e.g. Grade 10 - Section A"
                value={form.class}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Link to="/home" className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <i className="fas fa-user-plus" /> {loading ? 'Registering Teacher...' : 'Register Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
