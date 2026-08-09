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
      setError(errors[err.code] || 'Registration failed.');
    }
  };

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <h1>Students/Parents Registration</h1>
      {error && <p className="form-error">{error}</p>}
      <input type="text" name="fname" placeholder="First Name" value={form.fname} onChange={onChange} />
      <input type="text" name="sname" placeholder="Second Name" value={form.sname} onChange={onChange} />
      <input type="text" name="phn" placeholder="Phone Number" value={form.phn} onChange={onChange} />
      <input type="text" name="uid" placeholder="username" value={form.uid} onChange={onChange} />
      <input type="password" name="pwd" placeholder="Password" value={form.pwd} onChange={onChange} />
      <button type="submit" name="submit" className="btn">
        Register
      </button>
      <p>
        <Link to="/login/student">Already have an account? Log in</Link>
      </p>
    </form>
  );
}
