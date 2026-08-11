import { Router } from 'express';
import * as galleryCtrl from '../controllers/galleryController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

router.get('/', authenticate, galleryCtrl.getGallery);
router.post('/', authenticate, requirePermission('media.manage'), galleryCtrl.uploadMiddleware, galleryCtrl.uploadImage);
router.delete('/:id', authenticate, requirePermission('media.manage'), galleryCtrl.deleteImage);

export default router;
