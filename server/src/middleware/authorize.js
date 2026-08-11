/**
 * Enforces dynamic Role-Based Access Control (RBAC).
 * Checks if the authenticated user possesses the required permission code or role.
 */

export function requirePermission(permissionCode) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const permissions = req.user.permissions || [];
    const roles = req.user.roles || [];

    // Super admin bypasses permission checks
    if (roles.includes('super_admin') || permissions.includes(permissionCode)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: `Access denied. Requires permission: '${permissionCode}'`,
    });
  };
}

export function requireRole(allowedRoles) {
  const rolesList = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const userRoles = req.user.roles || [];
    const hasRole = userRoles.some((r) => rolesList.includes(r)) || userRoles.includes('super_admin');

    if (!hasRole) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Allowed roles: [${rolesList.join(', ')}]`,
      });
    }

    next();
  };
}
