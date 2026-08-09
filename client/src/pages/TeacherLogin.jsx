import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

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
      setError(loginErrors[err.code] || 'Login failed.');
    }
  };

  return (
    <section className="body">
      <form onSubmit={onSubmit}>
        <div className="login-box">
          <h1>login</h1>
          <br />
          {error && <p className="form-error">{error}</p>}
          <div className="textbox">
            <i className="fa fa-user" />
            <input
              type="text"
              name="uid"
              placeholder="Username/E-mail"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
            />
          </div>
          <div className="textbox">
            <i className="fa fa-lock" />
            <input
              type="password"
              name="pwd"
              placeholder="Password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <button type="submit" className="btn" name="submit">
            Log In <i className="fas fa-sign-in-alt fa-1.2g" />
          </button>
        </div>
      </form>
      <p>
        <Link to="/select">Back to role selection</Link>
      </p>
    </section>
  );
}
