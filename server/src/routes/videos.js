import { Router } from 'express';
import * as videoCtrl from '../controllers/videoController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

router.get('/', authenticate, videoCtrl.getVideos);
router.post('/', authenticate, requirePermission('media.manage'), videoCtrl.uploadMiddleware, videoCtrl.uploadVideo);
router.delete('/:id', authenticate, requirePermission('media.manage'), videoCtrl.deleteVideo);

export default router;
