import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import noticeRoutes from './routes/notices.js';
import galleryRoutes from './routes/gallery.js';
import videoRoutes from './routes/videos.js';
import attendanceRoutes from './routes/attendance.js';
import eventRoutes from './routes/events.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Ensure upload directories exist
[config.uploads.imageDir, config.uploads.videoDir, config.uploads.documentDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Security & Body parsing Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static upload assets
const uploadsRootDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsRootDir));

// Health Check API
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    system: 'Azene Wube Academy SMS API Server',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API Routes (v1 & legacy backward-compatible mounts)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/events', eventRoutes);

// Legacy route aliases for backward compatibility
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/events', eventRoutes);

// 404 Route handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'API Route Not Found' });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Azene Wube Academy SMS API running on http://localhost:${config.port}`);
  console.log(`🔒 Environment: ${config.nodeEnv}`);
});
