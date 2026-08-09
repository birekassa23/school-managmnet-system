import jwt from 'jsonwebtoken';

function getSecret() {
  return process.env.JWT_SECRET || 'dev-secret-change-in-production';
}

export function signToken(payload) {
  return jwt.sign(payload, getSecret(), { expiresIn: '7d' });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(header.slice(7), getSecret());
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

export function requireTeacher(req, res, next) {
  if (req.user?.role !== 'teacher') {
    return res.status(403).json({ error: 'Teachers only' });
  }
  next();
}

export function requirePrincipal(req, res, next) {
  if (req.user?.role !== 'teacher' || req.user.id !== 5) {
    return res.status(403).json({ error: 'Principal access only' });
  }
  next();
}
