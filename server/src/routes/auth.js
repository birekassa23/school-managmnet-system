import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../db.js';
import { requireAuth, requirePrincipal, signToken } from '../middleware/auth.js';

const router = Router();

const alphaName = /^[a-zA-Z]*$/;

router.post('/teacher/login', async (req, res) => {
  const { uid, pwd } = req.body;
  if (!uid?.trim() || !pwd) {
    return res.status(400).json({ error: 'empty', message: 'Username and password required' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `teachers.detail` WHERE username = ? OR email = ? LIMIT 1',
      [uid.trim(), uid.trim()]
    );
    if (!rows.length) {
      return res.status(401).json({ error: 'notfound' });
    }
    const row = rows[0];
    const ok = await bcrypt.compare(pwd, row.password);
    if (!ok) {
      return res.status(401).json({ error: 'notmatch' });
    }
    const user = {
      role: 'teacher',
      id: row.ID,
      first: row.firstname,
      last: row.lastname,
      email: row.email,
      user: row.username,
      phn: row['phone.number'],
      class: row['assigned.class'],
    };
    const token = signToken(user);
    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server' });
  }
});

router.post('/student/login', async (req, res) => {
  const { suid, spwd } = req.body;
  if (!suid?.trim() || !spwd) {
    return res.status(400).json({ error: 'empty' });
  }
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `std.parent` WHERE username = ? LIMIT 1',
      [suid.trim()]
    );
    if (!rows.length) {
      return res.status(401).json({ error: 'notfound' });
    }
    const row = rows[0];
    const ok = await bcrypt.compare(spwd, row.password);
    if (!ok) {
      return res.status(401).json({ error: 'notmatch' });
    }
    const user = {
      role: 'student',
      id: row.sn,
      first: row.firstname,
      last: row.lastname,
      userid: row.username,
      phn: row['phone.number'],
    };
    const token = signToken(user);
    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server' });
  }
});

router.post('/student/register', async (req, res) => {
  const { fname, sname, phn, uid, pwd } = req.body;
  if (!fname || !sname || !uid || !pwd || phn === undefined || phn === '') {
    return res.status(400).json({ error: 'empty' });
  }
  if (!alphaName.test(fname) || !alphaName.test(sname)) {
    return res.status(400).json({ error: 'invalid' });
  }
  if (pwd.length < 6) {
    return res.status(400).json({ error: 'shortpass' });
  }
  const phnStr = String(phn);
  if (!/^\d+$/.test(phnStr) || phnStr.length !== 10) {
    return res.status(400).json({ error: 'notphn' });
  }
  try {
    const [existing] = await pool.query(
      'SELECT sn FROM `std.parent` WHERE username = ? LIMIT 1',
      [uid.trim()]
    );
    if (existing.length) {
      return res.status(409).json({ error: 'usernametaken' });
    }
    const hashed = await bcrypt.hash(pwd, 10);
    await pool.query(
      'INSERT INTO `std.parent` (firstname, lastname, `phone.number`, username, password) VALUES (?, ?, ?, ?, ?)',
      [fname, sname, phnStr, uid.trim(), hashed]
    );
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server' });
  }
});

router.post('/teacher/register', requireAuth, requirePrincipal, async (req, res) => {
  const { first, last, uid, email, pwd, phn, class: assignedClass } = req.body;
  if (!first || !last || !uid || !email || !pwd || phn === undefined || assignedClass === undefined) {
    return res.status(400).json({ error: 'empty' });
  }
  if (!alphaName.test(first) || !alphaName.test(last)) {
    return res.status(400).json({ error: 'invalid' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'email' });
  }
  if (pwd.length < 6) {
    return res.status(400).json({ error: 'shortpass' });
  }
  const phnStr = String(phn);
  const classStr = String(assignedClass);
  if (!/^\d+$/.test(phnStr) || phnStr.length !== 10 || !/^\d+$/.test(classStr)) {
    return res.status(400).json({ error: 'notnum' });
  }
  try {
    const [byUser] = await pool.query(
      'SELECT ID FROM `teachers.detail` WHERE username = ? LIMIT 1',
      [uid.trim()]
    );
    if (byUser.length) {
      return res.status(409).json({ error: 'usernametaken' });
    }
    const [byEmail] = await pool.query(
      'SELECT ID FROM `teachers.detail` WHERE email = ? LIMIT 1',
      [email.trim()]
    );
    if (byEmail.length) {
      return res.status(409).json({ error: 'emailtaken' });
    }
    const hashed = await bcrypt.hash(pwd, 10);
    await pool.query(
      'INSERT INTO `teachers.detail` (firstname, lastname, `phone.number`, username, password, `assigned.class`, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first, last, phnStr, uid.trim(), hashed, classStr, email.trim()]
    );
    return res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server' });
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
