import { useAuth } from '../context/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import ParentDashboard from './parent/ParentDashboard';
import RegistrarDashboard from './registrar/RegistrarDashboard';
import StoreDashboard from './store/StoreDashboard';
import StudentDashboard from './student/StudentDashboard';
import TeacherDashboard from './teacher/TeacherDashboard';

export default function Home() {
  const { roles } = useAuth();

  // Store Keeper & Inventory Workspace Dashboard
  if (roles.includes('store') || roles.includes('storekeeper') || roles.includes('inventory_manager')) {
    return <StoreDashboard />;
  }

  // Academic Registrar Dashboard
  if (roles.includes('administrator') || roles.includes('registrar')) {
    return <RegistrarDashboard />;
  }

  // Executive Directors & HR Oversight Dashboard
  if (
    roles.includes('main_director') ||
    roles.includes('vice_director') ||
    roles.includes('super_admin') ||
    roles.includes('hr')
  ) {
    return <AdminDashboard />;
  }

  // Academic Teacher Dashboard
  if (roles.includes('teacher')) {
    return <TeacherDashboard />;
  }

  // Student Dashboard
  if (roles.includes('student')) {
    return <StudentDashboard />;
  }

  // Family / Parent Guardian Dashboard
  if (roles.includes('parent')) {
    return <ParentDashboard />;
  }

  // Default Fallback
  return <StudentDashboard />;
}
