import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

const loginErrors = {
  empty: 'Please fill in username and password.',
  notfound: 'Account not found.',
  notmatch: 'Incorrect password.',
};

export default function StudentLogin() {
  const [suid, setSuid] = useState('');
  const [spwd, setSpwd] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await api('/auth/student/login', {
        method: 'POST',
        body: JSON.stringify({ suid, spwd }),
      });
      login(data.token, data.user);
      navigate('/home');
    } catch (err) {
      setError(loginErrors[err.code] || 'Login failed.');
    }
  };

  return (
    <form className="down" onSubmit={onSubmit}>
      <div className="login-box">
        <h1>Login</h1>
        {error && <p className="form-error">{error}</p>}
        <div className="textbox">
          <i className="fa fa-user" />
          <input
            type="text"
            name="suid"
            placeholder="username/email"
            value={suid}
            onChange={(e) => setSuid(e.target.value)}
          />
        </div>
        <div className="textbox">
          <i className="fa fa-lock" />
          <input
            type="password"
            name="spwd"
            placeholder="Password"
            value={spwd}
            onChange={(e) => setSpwd(e.target.value)}
          />
        </div>
        <button type="submit" name="submit" className="loggg">
          Log In <i className="fas fa-sign-in-alt" />
        </button>
        <p>
          <Link to="/register/student">Dont have account? Create now.</Link>
        </p>
        <p>
          <Link to="/select">Back to role selection</Link>
        </p>
      </div>
    </form>
  );
}
