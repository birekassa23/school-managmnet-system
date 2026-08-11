import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function loadStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadStoredUser);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = (nextToken, nextUser) => {
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const hasPermission = (code) => {
    if (!user) return false;
    const roles = user.roles || (user.role ? [user.role] : []);
    if (
      roles.includes('super_admin') ||
      roles.includes('main_director') ||
      roles.includes('vice_director') ||
      roles.includes('hr') ||
      roles.includes('administrator') ||
      roles.includes('store')
    ) {
      return true;
    }
    // Allow Class Monitor / Rep to mark attendance when teachers iterate
    if (code === 'attendance.manage' && (user.isClassMonitor || user.isClassRep || roles.includes('class_monitor'))) {
      return true;
    }
    const permissions = user.permissions || [];
    return permissions.includes(code);
  };

  const value = useMemo(() => {
    const roles = user?.roles || (user?.role ? [user.role] : []);
    const isTeacher = roles.includes('teacher');
    const isStudent = roles.includes('student');
    const isHR = roles.includes('hr');
    const isStore = roles.includes('store') || roles.includes('storekeeper') || roles.includes('inventory_manager');
    const isRegistrar = roles.includes('registrar') || (roles.includes('administrator') && !roles.includes('main_director') && !roles.includes('vice_director') && !roles.includes('super_admin') && !roles.includes('hr'));
    const isDirector =
      roles.includes('main_director') ||
      roles.includes('vice_director') ||
      roles.includes('principal') ||
      roles.includes('super_admin');
    const isPrincipal = isDirector || isHR;
    const isClassMonitor = Boolean(user?.isClassMonitor || user?.isClassRep || roles.includes('class_monitor'));

    return {
      user,
      token,
      roles,
      isTeacher,
      isStudent,
      isHR,
      isStore,
      isRegistrar,
      isDirector,
      isPrincipal,
      isClassMonitor,
      hasPermission,
      login,
      logout,
    };
  }, [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
