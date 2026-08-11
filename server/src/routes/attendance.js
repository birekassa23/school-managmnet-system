import { Router } from 'express';
import * as attendanceCtrl from '../controllers/attendanceController.js';
import { authenticate } from '../middleware/authenticate.js';
import { requirePermission } from '../middleware/authorize.js';

const router = Router();

router.post('/mark', authenticate, requirePermission('attendance.mark'), attendanceCtrl.markAttendance);
router.get('/section', authenticate, requirePermission('attendance.view'), attendanceCtrl.getSectionAttendance);
router.get('/student/:studentId?', authenticate, requirePermission('attendance.view'), attendanceCtrl.getStudentAttendanceSummary);

export default router;
