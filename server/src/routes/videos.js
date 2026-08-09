import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';
import { requireAuth, requireTeacher } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../../uploads/video');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const base = `lesson.${Date.now()}.${Math.round(Math.random() * 1e9)}.mp4`;
    cb(null, base);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.mp4') cb(null, true);
    else cb(new Error('notmp4'));
  },
});

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM videolect ORDER BY videoid DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

router.post('/', requireAuth, requireTeacher, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err?.message === 'notmp4') {
      return res.status(400).json({ error: 'notmp4' });
    }
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'upload' });
    }
    const { title, desc, class: recommended } = req.body;
    if (!title?.trim() || !desc?.trim() || !recommended?.trim() || !req.file) {
      return res.status(400).json({ error: 'empty' });
    }
    try {
      await pool.query(
        'INSERT INTO videolect (videotitle, description, videofullname, ordervideo, recommended, uploadedby) VALUES (?, ?, ?, ?, ?, ?)',
        [title.trim(), desc.trim(), req.file.filename, '1', recommended.trim(), req.user.first]
      );
      res.status(201).json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'server' });
    }
  });
});

export default router;
