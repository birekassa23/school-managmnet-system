import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { user, logout, isPrincipal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {user && (
        <>
          <form className="logg" onSubmit={(e) => e.preventDefault()}>
            <button type="button" className="btn" onClick={handleLogout}>
              Log out <i className="fas fa-sign-out-alt" />
            </button>
          </form>
          <div id="mySidenav" className="sidenav">
            <Link to="/home">Home</Link>
            <Link to="/notices">Notices</Link>
            <Link to="/lectures">Video Lectures</Link>
            <Link to="/events">Upcomming Events</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/attendance">Attendance</Link>
          </div>
          {isPrincipal && (
            <div className="con">
              <Link to="/teacher/register">Register a new teacher</Link>
            </div>
          )}
        </>
      )}
      <Outlet />
      <SiteFooter />
    </>
  );
}
