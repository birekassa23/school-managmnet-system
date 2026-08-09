import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../db.js';
import { requireAuth, requireTeacher } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, '../../uploads/image');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = `image.${Date.now()}.${Math.round(Math.random() * 1e9)}`;
    cb(null, base + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('not_supported'));
  },
});

const router = Router();

router.get('/', requireAuth, async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM images ORDER BY orderid');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

router.post('/', requireAuth, requireTeacher, (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err?.message === 'not_supported') {
      return res.status(400).json({ error: 'not_supported' });
    }
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'upload' });
    }
    const { event, desc } = req.body;
    if (!event?.trim() || !desc?.trim() || !req.file) {
      return res.status(400).json({ error: 'empty' });
    }
    try {
      const [countRows] = await pool.query('SELECT COUNT(*) AS c FROM images');
      const orderid = countRows[0].c + 1;
      await pool.query(
        'INSERT INTO images (imageevent, imagedesc, uploader, orderid, imagename) VALUES (?, ?, ?, ?, ?)',
        [event.trim(), desc.trim(), req.user.first, orderid, req.file.filename]
      );
      res.status(201).json({ ok: true });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'server' });
    }
  });
});

router.delete('/:id', requireAuth, requireTeacher, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'invalid' });
  }
  try {
    const [rows] = await pool.query('SELECT imagename FROM images WHERE imageid = ?', [id]);
    if (rows.length) {
      await pool.query('DELETE FROM images WHERE imageid = ?', [id]);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server' });
  }
});

export default router;
