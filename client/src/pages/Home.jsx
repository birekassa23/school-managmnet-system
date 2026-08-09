import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const tiles = [
  {
    to: '/events',
    icon: 'events',
    fa: 'fa-calendar-alt',
    label: 'School Events',
    desc: 'See upcoming activities and celebrations at the academy.',
  },
  {
    to: '/lectures',
    icon: 'lectures',
    fa: 'fa-play-circle',
    label: 'Video Lessons',
    desc: 'Watch class recordings and recommended study material.',
  },
  {
    to: '/notices',
    icon: 'notices',
    fa: 'fa-bullhorn',
    label: 'Important Notices',
    desc: 'Stay updated with announcements from staff and administration.',
  },
  {
    to: '/gallery',
    icon: 'gallery',
    fa: 'fa-camera',
    label: 'Picture Gallery',
    desc: 'Browse memorable moments from school life and events.',
  },
  {
    to: '/attendance',
    icon: 'attendance',
    fa: 'fa-clipboard-check',
    label: 'Student Attendance',
    desc: 'View and track attendance records for your class.',
  },
];

export default function Home() {
  const { user } = useAuth();
  const name = user?.first ? `${user.first}${user.last ? ` ${user.last}` : ''}` : 'Member';

  return (
    <div className="home-dashboard">
      <header className="home-hero">
        <div className="home-hero-inner">
          <p className="home-hero-eyebrow">Azene Wube Academy</p>
          <h1>Hello, {name}</h1>
          <p>
            Welcome to your dashboard. Choose a section below to explore events, lessons, notices, and more.
          </p>
        </div>
      </header>

      <h2 className="home-section-title">Quick access</h2>
      <div className="home-grid">
        {tiles.map((tile) => (
          <Link key={tile.to} to={tile.to} className="home-card">
            <div className={`home-card-icon ${tile.icon}`}>
              <i className={`fas ${tile.fa}`} aria-hidden />
            </div>
            <h3>{tile.label}</h3>
            <p>{tile.desc}</p>
            <span className="home-card-arrow">
              Open <i className="fas fa-chevron-right" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
