import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <section className="landing">
      <div className="landing-badge">
        <i className="fas fa-star" aria-hidden />
        Excellence in education
      </div>
      <div className="landing-logo" aria-hidden>
        <i className="fas fa-graduation-cap" />
      </div>
      <h1 className="landing-title">
        Welcome to <span>Azene Wube Academy</span>
      </h1>
      <p className="landing-tagline">
        Your digital campus for notices, lessons, events, gallery, and attendance — all in one place for
        students, parents, and teachers.
      </p>
      <Link to="/select" className="landing-cta">
        Enter portal
        <i className="fas fa-arrow-right" aria-hidden />
      </Link>
      <div className="landing-features">
        <div className="landing-feature">
          <i className="fas fa-book-reader" aria-hidden />
          Video lessons
        </div>
        <div className="landing-feature">
          <i className="fas fa-bullhorn" aria-hidden />
          School notices
        </div>
        <div className="landing-feature">
          <i className="fas fa-images" aria-hidden />
          Photo gallery
        </div>
      </div>
    </section>
  );
}
