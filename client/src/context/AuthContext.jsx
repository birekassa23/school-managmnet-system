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
    if (roles.includes('super_admin')) return true;
    const permissions = user.permissions || [];
    return permissions.includes(code);
  };

  const value = useMemo(() => {
    const roles = user?.roles || (user?.role ? [user.role] : []);
    const isTeacher = roles.includes('teacher');
    const isStudent = roles.includes('student');
    const isPrincipal = roles.includes('principal') || roles.includes('super_admin');

    return {
      user,
      token,
      roles,
      isTeacher,
      isStudent,
      isPrincipal,
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
