import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Attendance from './pages/Attendance';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Login from './pages/Login';
import Notices from './pages/Notices';
import ParentChildGrades from './pages/parent/ParentChildGrades';
import ParentTeacherCommunication from './pages/parent/ParentTeacherCommunication';
import RegistrarStudentResults from './pages/registrar/RegistrarStudentResults';
import StoreInventory from './pages/store/StoreInventory';
import StudentGrades from './pages/student/StudentGrades';
import StudentMaterials from './pages/student/StudentMaterials';
import StudentRegister from './pages/StudentRegister';
import TeacherMarksEntry from './pages/teacher/TeacherMarksEntry';
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
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/select" element={<Navigate to="/login" replace />} />
              <Route path="/login/teacher" element={<Navigate to="/login" replace />} />
              <Route path="/login/student" element={<Navigate to="/login" replace />} />
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
                path="/grades"
                element={
                  <ProtectedRoute>
                    <StudentGrades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/child-results"
                element={
                  <ProtectedRoute>
                    <ParentChildGrades />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/parent-messages"
                element={
                  <ProtectedRoute>
                    <ParentTeacherCommunication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher/marks"
                element={
                  <ProtectedRoute>
                    <TeacherMarksEntry />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/registrar/results"
                element={
                  <ProtectedRoute>
                    <RegistrarStudentResults />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/store/inventory"
                element={
                  <ProtectedRoute>
                    <StoreInventory />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/materials"
                element={
                  <ProtectedRoute>
                    <StudentMaterials />
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
    </ThemeProvider>
  );
}
