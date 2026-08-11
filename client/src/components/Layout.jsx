import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SiteFooter from './SiteFooter';

export default function Layout() {
  const { user, logout, isPrincipal, isDirector, isTeacher, isStudent, isClassMonitor, isRegistrar, isStore, roles } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isParent = roles.includes('parent');
  const roleBadge = isDirector
    ? 'Director'
    : isStore
    ? 'Store Keeper'
    : isRegistrar
    ? 'Registrar'
    : isTeacher
    ? 'Teacher'
    : isClassMonitor
    ? 'Class Monitor'
    : isParent
    ? 'Parent'
    : user
    ? 'Student'
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/80 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      {user && (
        <>
          {/* Mobile Navigation Header (< md) */}
          <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white border-b border-slate-200 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-white px-4 flex items-center justify-between shadow-sm md:hidden transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-xs px-2 py-1 rounded bg-amber-400 text-slate-900 tracking-wider">
                AWA
              </span>
              <span className="font-bold text-base tracking-tight">Azene Wube</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer"
                title={isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
                aria-label="Toggle theme"
              >
                <i className={`fas ${isDark ? 'fa-sun text-amber-300 text-base' : 'fa-moon text-slate-700 text-base'}`} />
              </button>
              {roleBadge && (
                <span className="text-xs font-semibold capitalize tracking-wider px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-300 border border-amber-400/30">
                  {roleBadge}
                </span>
              )}
              <button
                type="button"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-lg hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
              </button>
            </div>
          </header>

          {/* Backdrop for Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden animate-fade-in"
              onClick={closeMobileMenu}
              aria-hidden="true"
            />
          )}

          {/* Sidebar Navigation */}
          <aside
            className={`fixed top-0 left-0 bottom-0 z-50 bg-white border-r border-slate-200/90 text-slate-800 dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800 dark:text-white flex flex-col shadow-xl md:shadow-2xl transition-all duration-300 ease-in-out md:translate-x-0 ${
              sidebarCollapsed ? 'md:w-20' : 'md:w-64'
            } ${
              mobileMenuOpen
                ? 'translate-x-0 top-16 h-[calc(100vh-4rem)] w-64'
                : '-translate-x-full md:translate-x-0 h-full'
            }`}
          >
            {/* Collapse/Expand Toggle Button on Sidebar Right Edge (< or >) */}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex absolute -right-3.5 top-7 w-7 h-7 rounded-full bg-amber-400 text-slate-950 items-center justify-center text-xs font-black shadow-lg hover:scale-110 hover:bg-amber-300 transition-all cursor-pointer z-50 border-2 border-white dark:border-slate-950"
              title={sidebarCollapsed ? 'Expand sidebar (>)' : 'Collapse sidebar (<)'}
              aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <i className={`fas ${sidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`} />
            </button>

            {/* Brand Logo */}
            <div
              className={`p-5 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 ${
                sidebarCollapsed ? 'md:justify-center md:px-2' : ''
              }`}
            >
              <img
                src="/images/academy_logo.jpg"
                alt="Azene Wube Academy Logo"
                className="w-11 h-11 shrink-0 rounded-xl object-cover border border-amber-400/40 shadow-lg shadow-amber-500/20"
              />
              <div className={sidebarCollapsed ? 'md:hidden' : 'block'}>
                <h2 className="text-lg font-bold leading-tight text-slate-900 dark:text-white whitespace-nowrap">
                  Azene Wube
                </h2>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 tracking-widest whitespace-nowrap">
                  Academy SMS
                </span>
              </div>
            </div>

            {/* User Profile Info */}
            <div
              className={`mt-4 mb-2 p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3 ${
                sidebarCollapsed ? 'md:mx-2 md:justify-center md:p-2' : 'mx-4'
              }`}
            >
              <div className="text-2xl text-amber-500 dark:text-amber-300 shrink-0">
                <i className="fas fa-user-circle" />
              </div>
              <div className={`flex flex-col truncate ${sidebarCollapsed ? 'md:hidden' : 'block'}`}>
                <span className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                  {user.firstName || user.username}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{roleBadge || 'User'}</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col gap-1.5 p-3 overflow-y-auto">
              <NavLink
                to="/home"
                onClick={closeMobileMenu}
                title="Home"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                  }`
                }
              >
                <i className="fas fa-home w-5 text-center text-base shrink-0" />
                <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Dashboard</span>
              </NavLink>

              {/* Master Class Results View (Registrars & Directors) */}
              {(isDirector || isRegistrar) && (
                <NavLink
                  to="/registrar/results"
                  onClick={closeMobileMenu}
                  title="All Class Results"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-table w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>All Class Results</span>
                </NavLink>
              )}

              {/* Register Student (Registrars & Directors) */}
              {(isDirector || isRegistrar) && (
                <NavLink
                  to="/register/student"
                  onClick={closeMobileMenu}
                  title="Register Student"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-user-graduate w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Register Student</span>
                </NavLink>
              )}

              {/* Register Staff (Directors ONLY) */}
              {isDirector && (
                <NavLink
                  to="/teacher/register"
                  onClick={closeMobileMenu}
                  title="Register Teacher"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-user-plus w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Register Staff</span>
                </NavLink>
              )}

              {/* Store Keeper & Directors Stock & Inventory */}
              {(isStore || isDirector) && (
                <NavLink
                  to="/store/inventory"
                  onClick={closeMobileMenu}
                  title="Store Inventory"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-boxes w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Store Inventory</span>
                </NavLink>
              )}

              {/* Attendance Marking: Teachers, Directors, or Class Monitors */}
              {(isTeacher || isDirector || isClassMonitor) && (
                <NavLink
                  to="/attendance"
                  onClick={closeMobileMenu}
                  title="Attendance Register"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-clipboard-check w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Attendance</span>
                </NavLink>
              )}

              {/* Teacher Enter Student Marks */}
              {isTeacher && (
                <NavLink
                  to="/teacher/marks"
                  onClick={closeMobileMenu}
                  title="Take Student Marks"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-pen-nib w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Student Marks</span>
                </NavLink>
              )}

              {/* Student Personal Grades */}
              {isStudent && (
                <NavLink
                  to="/grades"
                  onClick={closeMobileMenu}
                  title="My Grades & Exams"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-chart-bar w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>My Grades & Exams</span>
                </NavLink>
              )}

              {/* Course Study Materials */}
              {isStudent && (
                <NavLink
                  to="/materials"
                  onClick={closeMobileMenu}
                  title="Study Materials"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-book-open w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Study Materials</span>
                </NavLink>
              )}

              {/* Family / Parent View Child Results */}
              {isParent && (
                <NavLink
                  to="/child-results"
                  onClick={closeMobileMenu}
                  title="Child Exam Results"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-graduation-cap w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Child Exam Results</span>
                </NavLink>
              )}

              {/* Parent Message Instructors */}
              {isParent && (
                <NavLink
                  to="/parent-messages"
                  onClick={closeMobileMenu}
                  title="Contact Instructors"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-comments w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Contact Instructors</span>
                </NavLink>
              )}

              <NavLink
                to="/notices"
                onClick={closeMobileMenu}
                title="Notices"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                  }`
                }
              >
                <i className="fas fa-bullhorn w-5 text-center text-base shrink-0" />
                <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Notices</span>
              </NavLink>

              {/* Video Lectures (Executive Directors ONLY) */}
              {isDirector && (
                <NavLink
                  to="/lectures"
                  onClick={closeMobileMenu}
                  title="Video Lectures"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-video w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Video Lectures</span>
                </NavLink>
              )}

              {/* Upcoming Events (Executive Directors ONLY) */}
              {isDirector && (
                <NavLink
                  to="/events"
                  onClick={closeMobileMenu}
                  title="Upcoming Events"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-calendar-alt w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Upcoming Events</span>
                </NavLink>
              )}

              {/* Gallery (Executive Directors ONLY) */}
              {isDirector && (
                <NavLink
                  to="/gallery"
                  onClick={closeMobileMenu}
                  title="Gallery"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      sidebarCollapsed ? 'md:justify-center md:px-0' : ''
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10'
                    }`
                  }
                >
                  <i className="fas fa-images w-5 text-center text-base shrink-0" />
                  <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Gallery</span>
                </NavLink>
              )}
            </nav>

            {/* Sidebar Controls Footer: Icon-only Theme Toggle & Logout */}
            <div className="p-3 border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle theme"
                className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-amber-300 border border-slate-200 dark:border-white/10 flex items-center justify-center text-base hover:bg-slate-200 dark:hover:bg-white/20 transition-all cursor-pointer hover:scale-105"
              >
                <i className={`fas ${isDark ? 'fa-sun text-amber-300' : 'fa-moon text-slate-700'}`} />
              </button>

              <button
                type="button"
                onClick={handleLogout}
                title="Log out"
                className={`flex-1 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-300 font-semibold text-sm hover:bg-red-500/20 transition-all cursor-pointer ${
                  sidebarCollapsed ? 'md:justify-center md:px-0' : 'justify-center'
                }`}
              >
                <i className="fas fa-sign-out-alt shrink-0" />
                <span className={sidebarCollapsed ? 'md:hidden' : 'inline'}>Log out</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ${
          user
            ? sidebarCollapsed
              ? 'md:pl-28 pt-20 md:pt-8 p-6 md:p-10'
              : 'md:pl-72 pt-20 md:pt-8 p-6 md:p-10'
            : ''
        }`}
      >
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
