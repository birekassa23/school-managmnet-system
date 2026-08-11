import { Router } from 'express';
import * as authCtrl from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

// Public routes
router.post('/login', authCtrl.login);
router.post('/teacher/login', authCtrl.login);
router.post('/student/login', authCtrl.login);
router.post('/student/register', authCtrl.registerStudent);

// Protected routes
router.get('/me', authenticate, authCtrl.me);
router.post('/teacher/register', authenticate, requirePermission('teachers.manage'), authCtrl.registerTeacher);

export default router;
