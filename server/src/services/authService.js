import * as userRepo from '../repositories/userRepository.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signToken } from '../utils/jwt.js';

export async function loginUser(identifier, password) {
  if (!identifier?.trim() || !password) {
    const err = new Error('Username/email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await userRepo.findUserByUsernameOrEmail(identifier);
  if (!user) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  if (user.status !== 'active') {
    const err = new Error('Account is suspended or inactive');
    err.status = 403;
    throw err;
  }

  const isValidPassword = await comparePassword(password, user.password_hash);
  if (!isValidPassword) {
    const err = new Error('Invalid credentials');
    err.status = 401;
    throw err;
  }

  const roles = await userRepo.getUserRoles(user.id);
  const permissions = await userRepo.getUserPermissions(user.id);

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    roles,
    permissions,
  };

  const token = signToken(payload);

  return {
    token,
    user: payload,
  };
}

export async function registerStudent({ username, email, password, firstName, lastName, phoneNumber }) {
  if (!username || !password || !firstName || !lastName || !phoneNumber) {
    const err = new Error('All mandatory student fields are required');
    err.status = 400;
    throw err;
  }

  if (password.length < 6) {
    const err = new Error('Password must be at least 6 characters');
    err.status = 400;
    throw err;
  }

  if (!/^\d{10}$/.test(phoneNumber)) {
    const err = new Error('Phone number must be a valid 10-digit string');
    err.status = 400;
    throw err;
  }

  const existing = await userRepo.findUserByUsernameOrEmail(username);
  if (existing) {
    const err = new Error('Username is already taken');
    err.status = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);
  const userId = await userRepo.createUser({
    username,
    email,
    passwordHash,
    firstName,
    lastName,
    phoneNumber,
  });

  await userRepo.assignUserRole(userId, 'student');
  const admissionNumber = `ADM-${Date.now().toString().slice(-6)}`;
  await userRepo.createStudentProfile(userId, admissionNumber, `${firstName} Parent`, phoneNumber);

  return { userId, admissionNumber };
}

export async function registerTeacher({ username, email, password, firstName, lastName, phoneNumber, qualification, specialization }) {
  if (!username || !email || !password || !firstName || !lastName || !phoneNumber) {
    const err = new Error('All mandatory teacher fields are required');
    err.status = 400;
    throw err;
  }

  const existing = await userRepo.findUserByUsernameOrEmail(username);
  if (existing) {
    const err = new Error('Username or email is already registered');
    err.status = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);
  const userId = await userRepo.createUser({
    username,
    email,
    passwordHash,
    firstName,
    lastName,
    phoneNumber,
  });

  await userRepo.assignUserRole(userId, 'teacher');
  const employeeId = `EMP-${Date.now().toString().slice(-6)}`;
  await userRepo.createTeacherProfile(userId, employeeId, qualification, specialization);

  return { userId, employeeId };
}
