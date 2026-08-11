import { Router } from 'express';
import * as noticeCtrl from '../controllers/noticeController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

router.get('/', authenticate, noticeCtrl.getNotices);
router.post('/', authenticate, requirePermission('notices.manage'), noticeCtrl.createNotice);
router.delete('/:id', authenticate, requirePermission('notices.manage'), noticeCtrl.deleteNotice);

export default router;
