import * as authService from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { username, uid, password, pwd } = req.body;
    const identifier = username || uid;
    const pass = password || pwd;

    const result = await authService.loginUser(identifier, pass);
    res.json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function registerStudent(req, res, next) {
  try {
    const { username, uid, email, password, pwd, firstName, fname, lastName, sname, phoneNumber, phn } = req.body;
    const result = await authService.registerStudent({
      username: username || uid,
      email,
      password: password || pwd,
      firstName: firstName || fname,
      lastName: lastName || sname,
      phoneNumber: String(phoneNumber || phn || ''),
    });

    res.status(201).json({
      success: true,
      message: 'Student account registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function registerTeacher(req, res, next) {
  try {
    const { username, email, password, firstName, first, lastName, last, phoneNumber, phn, qualification, specialization } = req.body;
    const result = await authService.registerTeacher({
      username,
      email,
      password,
      firstName: firstName || first,
      lastName: lastName || last,
      phoneNumber: String(phoneNumber || phn || ''),
      qualification,
      specialization,
    });

    res.status(201).json({
      success: true,
      message: 'Teacher account registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function me(req, res) {
  res.json({
    success: true,
    data: { user: req.user },
  });
}
