import { Link } from 'react-router-dom';

export default function RoleSelect() {
  return (
    <section className="role-page">
      <h1>Sign in as</h1>
      <div className="role-grid">
        <Link to="/login/teacher" className="role-card">
          <i className="fas fa-chalkboard-teacher" aria-hidden />
          <span>Teacher</span>
          <small>Staff portal</small>
        </Link>
        <Link to="/login/student" className="role-card">
          <i className="fas fa-user-graduate" aria-hidden />
          <span>Student / Parent</span>
          <small>Family portal</small>
        </Link>
      </div>
      <p style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" style={{ color: 'var(--awa-muted)', fontSize: '0.9rem' }}>
          ← Back to home
        </Link>
      </p>
    </section>
  );
}
