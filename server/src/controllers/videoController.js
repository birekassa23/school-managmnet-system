import path from 'path';
import multer from 'multer';
import * as videoRepo from '../repositories/videoRepository.js';
import { safeUnlink } from '../utils/fileHelper.js';
import { config } from '../config/index.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploads.videoDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueBase = `vid_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueBase}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.mp4', '.mkv', '.webm'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only MP4, MKV, and WEBM video files are allowed'));
  },
}).single('file');

export async function getVideos(req, res, next) {
  try {
    const videos = await videoRepo.getAllVideos();
    res.json({ success: true, data: videos });
  } catch (err) {
    next(err);
  }
}

export async function uploadVideo(req, res, next) {
  try {
    const { title, desc, description, gradeId, class: recommendedClass } = req.body;
    const finalTitle = title?.trim();
    const finalDesc = (desc || description)?.trim();

    if (!finalTitle || !req.file) {
      if (req.file) await safeUnlink(req.file.path);
      return res.status(400).json({ success: false, message: 'Video title and file are required' });
    }

    const relativePath = `/uploads/videos/${req.file.filename}`;
    const id = await videoRepo.createVideo(
      finalTitle,
      finalDesc,
      req.file.filename,
      relativePath,
      Number(gradeId) || null,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: 'Video lecture uploaded successfully',
      data: { id, fileName: req.file.filename, filePath: relativePath },
    });
  } catch (err) {
    if (req.file) await safeUnlink(req.file.path);
    next(err);
  }
}

export async function deleteVideo(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid video ID' });
    }

    const video = await videoRepo.getVideoById(id);
    if (video) {
      // 1. Delete database record
      await videoRepo.deleteVideo(id);
      // 2. Unlink physical file from disk
      const fullPath = path.join(config.uploads.videoDir, video.file_name);
      await safeUnlink(fullPath);
    }

    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (err) {
    next(err);
  }
}
