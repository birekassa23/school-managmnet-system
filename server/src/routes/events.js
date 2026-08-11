import { Router } from 'express';
import * as eventCtrl from '../controllers/eventController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

router.get('/', authenticate, eventCtrl.getEvents);
router.post('/', authenticate, requirePermission('events.manage'), eventCtrl.createEvent);
router.delete('/:id', authenticate, requirePermission('events.manage'), eventCtrl.deleteEvent);

export default router;
