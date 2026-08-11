import path from 'path';
import multer from 'multer';
import * as galleryRepo from '../repositories/galleryRepository.js';
import { safeUnlink } from '../utils/fileHelper.js';
import { config } from '../config/index.js';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, config.uploads.imageDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueBase = `img_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueBase}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error('Only JPG, JPEG, PNG, and WEBP image files are allowed'));
  },
}).single('file');

export async function getGallery(req, res, next) {
  try {
    const images = await galleryRepo.getAllImages();
    res.json({ success: true, data: images });
  } catch (err) {
    next(err);
  }
}

export async function uploadImage(req, res, next) {
  try {
    const { event, title, desc, description } = req.body;
    const finalTitle = (event || title)?.trim();
    const finalDesc = (desc || description)?.trim();

    if (!finalTitle || !req.file) {
      if (req.file) await safeUnlink(req.file.path);
      return res.status(400).json({ success: false, message: 'Image title and file are required' });
    }

    const relativePath = `/uploads/images/${req.file.filename}`;
    const id = await galleryRepo.createImage(finalTitle, finalDesc, req.file.filename, relativePath, req.user.id);

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: { id, fileName: req.file.filename, filePath: relativePath },
    });
  } catch (err) {
    if (req.file) await safeUnlink(req.file.path);
    next(err);
  }
}

export async function deleteImage(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ success: false, message: 'Invalid image ID' });
    }

    const image = await galleryRepo.getImageById(id);
    if (image) {
      // 1. Delete database record
      await galleryRepo.deleteImage(id);
      // 2. Unlink physical file from disk
      const fullPath = path.join(config.uploads.imageDir, image.file_name);
      await safeUnlink(fullPath);
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (err) {
    next(err);
  }
}
