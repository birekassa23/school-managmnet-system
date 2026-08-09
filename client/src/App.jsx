import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import Attendance from './pages/Attendance';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Notices from './pages/Notices';
import RoleSelect from './pages/RoleSelect';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import TeacherLogin from './pages/TeacherLogin';
import TeacherRegister from './pages/TeacherRegister';
import VideoLectures from './pages/VideoLectures';
import Welcome from './pages/Welcome';

function RootRedirect() {
  const { token } = useAuth();
  if (token) return <Navigate to="/home" replace />;
  return <Welcome />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RootRedirect />} />
            <Route path="/select" element={<RoleSelect />} />
            <Route path="/login/teacher" element={<TeacherLogin />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/register/student" element={<StudentRegister />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notices"
              element={
                <ProtectedRoute>
                  <Notices />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lectures"
              element={
                <ProtectedRoute>
                  <VideoLectures />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/attendance"
              element={
                <ProtectedRoute>
                  <Attendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/register"
              element={
                <ProtectedRoute>
                  <TeacherRegister />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
