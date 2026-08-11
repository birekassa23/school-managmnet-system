import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const loginErrors = {
  empty: 'Please fill in username and password.',
  notfound: 'Account not found.',
  notmatch: 'Incorrect password.',
};

export default function TeacherLogin() {
  const [uid, setUid] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api('/auth/teacher/login', {
        method: 'POST',
        body: JSON.stringify({ uid, pwd }),
      });
      login(data.token, data.user);
      navigate('/home');
    } catch (err) {
      setError(loginErrors[err.code] || err.message || 'Login failed.');
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

      <div className="w-full max-w-sm bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 text-center backdrop-blur-md">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Staff & Teacher Login</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Azene Wube Academy Portal Access</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-medium border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <div className="flex items-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus-within:ring-2 focus-within:ring-amber-400">
            <i className="fas fa-user text-slate-400 mr-3 text-sm" />
            <input
              type="text"
              name="uid"
              placeholder="Username / E-mail"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              required
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus-within:ring-2 focus-within:ring-amber-400">
            <i className="fas fa-lock text-slate-400 mr-3 text-sm" />
            <input
              type="password"
              name="pwd"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            Log In <i className="fas fa-sign-in-alt ml-1.5" />
          </button>
        </form>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          <Link to="/select" className="text-amber-600 dark:text-amber-400 font-semibold hover:underline">
            ← Back to Role Selection
          </Link>
        </p>
      </div>
    </div>
  );
}
