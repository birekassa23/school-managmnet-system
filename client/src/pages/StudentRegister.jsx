import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const errors = {
  empty: 'All fields are required.',
  invalid: 'Names must contain letters only.',
  shortpass: 'Password must be at least 6 characters.',
  notphn: 'Phone number must be 10 digits.',
  usernametaken: 'Username is already taken.',
};

export default function StudentRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fname: '',
    sname: '',
    phn: '',
    uid: '',
    pwd: '',
  });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api('/auth/student/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      navigate('/login/student', { state: { signup: 'success' } });
    } catch (err) {
      setError(errors[err.code] || err.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Student Registration</h1>
          <p className="text-xs text-slate-500 mt-1">Create a student portal account for Azene Wube Academy</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-medium border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 bg-white">
              <i className="fas fa-user text-slate-400 mr-2.5 text-xs" />
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                value={form.fname}
                onChange={onChange}
                required
                className="w-full text-xs outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 bg-white">
              <i className="fas fa-user text-slate-400 mr-2.5 text-xs" />
              <input
                type="text"
                name="sname"
                placeholder="Last Name"
                value={form.sname}
                onChange={onChange}
                required
                className="w-full text-xs outline-none bg-transparent"
              />
            </div>
          </div>

          <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 bg-white">
            <i className="fas fa-phone text-slate-400 mr-2.5 text-xs" />
            <input
              type="text"
              name="phn"
              placeholder="10-digit Phone Number"
              value={form.phn}
              onChange={onChange}
              required
              className="w-full text-xs outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 bg-white">
            <i className="fas fa-id-badge text-slate-400 mr-2.5 text-xs" />
            <input
              type="text"
              name="uid"
              placeholder="Username"
              value={form.uid}
              onChange={onChange}
              required
              className="w-full text-xs outline-none bg-transparent"
            />
          </div>

          <div className="flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-amber-400 bg-white">
            <i className="fas fa-lock text-slate-400 mr-2.5 text-xs" />
            <input
              type="password"
              name="pwd"
              placeholder="Password (min 6 chars)"
              value={form.pwd}
              onChange={onChange}
              required
              className="w-full text-xs outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer mt-2"
          >
            Register Account <i className="fas fa-user-plus ml-1.5" />
          </button>
        </form>

        <p className="text-xs text-slate-500">
          <Link to="/login/student" className="text-amber-600 font-semibold hover:underline">
            Already have an account? Log in here →
          </Link>
        </p>
      </div>
    </div>
  );
}
