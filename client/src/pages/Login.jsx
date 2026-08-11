import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, username: identifier, password }),
      });

      const token = response.token || response.data?.token;
      const user = response.user || response.data?.user;

      if (!token || !user) {
        throw new Error('Authentication response invalid.');
      }

      login(token, user);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Invalid username/email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-amber-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
      {/* Top Right Theme Switcher Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
          aria-label="Toggle theme"
          className="w-11 h-11 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg flex items-center justify-center text-slate-700 dark:text-amber-300 hover:scale-110 transition-all cursor-pointer backdrop-blur-md"
        >
          <i className={`fas ${isDark ? 'fa-sun text-amber-300 text-lg' : 'fa-moon text-slate-700 text-lg'}`} />
        </button>
      </div>

      <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-center backdrop-blur-md">
        {/* Header Branding */}
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/images/academy_logo.jpg"
            alt="Azene Wube Academy Logo"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-lg shadow-amber-500/20"
          />
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Azene Wube Academy
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Unified Portal Sign In
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-medium border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {/* Unified Login Form */}
        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <div className="space-y-1">
            <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
              Username / E-mail
            </label>
            <div className="flex items-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus-within:ring-2 focus-within:ring-amber-400">
              <i className="fas fa-user text-slate-400 mr-3 text-sm" />
              <input
                type="text"
                name="identifier"
                placeholder="Enter your account username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="flex items-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus-within:ring-2 focus-within:ring-amber-400">
              <i className="fas fa-lock text-slate-400 mr-3 text-sm" />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'} <i className="fas fa-sign-in-alt ml-1.5" />
          </button>
        </form>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
          <div>
            <Link to="/register/student" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
              New Student? Create an account →
            </Link>
          </div>
          <div>
            <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
