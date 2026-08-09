import { Router } from 'express';
import pool from '../db.js';
import { requireAuth, requireTeacher } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT COMMENTid, insert_date, user, notice FROM notices ORDER BY COMMENTid DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

router.post('/', requireAuth, requireTeacher, async (req, res) => {
  const { notice } = req.body;
  if (!notice?.trim()) {
    return res.status(400).json({ error: 'empty' });
  }
  const user = req.user.first;
  const date = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const insertDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  try {
    await pool.query(
      'INSERT INTO notices (insert_date, user, notice) VALUES (?, ?, ?)',
      [insertDate, user, notice.trim()]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

router.delete('/:id', requireAuth, requireTeacher, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid' });
  }
  try {
    await pool.query('DELETE FROM notices WHERE COMMENTid = ?', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

export default router;
