import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const errors = {
  empty: 'All fields are required.',
  invalid: 'Names must contain letters only.',
  email: 'Invalid email address.',
  shortpass: 'Password must be at least 6 characters.',
  notnum: 'Phone and class must be numeric.',
  usernametaken: 'Username is already taken.',
  emailtaken: 'Email is already registered.',
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

  if (!isPrincipal) {
    return <h1>this page is not permitted to you</h1>;
  }

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api('/auth/teacher/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(errors[err.code] || 'Registration failed.');
    }
  };

  return (
    <section className="main-container">
      <div className="wrapper-main">
        <h2>Sign up Form for teacher</h2>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">Teacher registered successfully.</p>}
        <form className="signup-form" onSubmit={onSubmit}>
          <input type="text" name="first" placeholder="First Name" value={form.first} onChange={onChange} />
          <br />
          <input type="text" name="last" placeholder="Last Name" value={form.last} onChange={onChange} />
          <br />
          <input type="text" name="uid" placeholder="Username" value={form.uid} onChange={onChange} />
          <br />
          <input type="text" name="email" placeholder="E-mail" value={form.email} onChange={onChange} />
          <br />
          <input type="password" name="pwd" placeholder="password" value={form.pwd} onChange={onChange} />
          <br />
          <input type="text" name="phn" placeholder="phone number" value={form.phn} onChange={onChange} />
          <br />
          <input type="text" name="class" placeholder="assigned class" value={form.class} onChange={onChange} />
          <br />
          <button type="submit" name="submit">
            Register Now
          </button>
        </form>
        <p>
          <Link to="/home">Back to home</Link>
        </p>
      </div>
    </section>
  );
}
