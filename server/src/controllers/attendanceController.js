import * as attendanceRepo from '../repositories/attendanceRepository.js';

export async function markAttendance(req, res, next) {
  try {
    const { sectionId, attendanceDate, records } = req.body;

    if (!sectionId || !attendanceDate || !Array.isArray(records) || !records.length) {
      return res.status(400).json({
        success: false,
        message: 'sectionId, attendanceDate, and non-empty records array are required',
      });
    }

    const markedByUserId = req.user.id;
    for (const rec of records) {
      if (!rec.studentId || !rec.status) continue;
      await attendanceRepo.markStudentAttendance(
        rec.studentId,
        sectionId,
        attendanceDate,
        rec.status,
        rec.remarks,
        markedByUserId
      );
    }

    res.json({
      success: true,
      message: 'Attendance marked successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getSectionAttendance(req, res, next) {
  try {
    const { sectionId, date } = req.query;
    if (!sectionId || !date) {
      return res.status(400).json({ success: false, message: 'sectionId and date query parameters are required' });
    }

    const records = await attendanceRepo.getAttendanceBySectionAndDate(Number(sectionId), date);
    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
}

export async function getStudentAttendanceSummary(req, res, next) {
  try {
    const studentId = Number(req.params.studentId || req.user.id);
    const stats = await attendanceRepo.getStudentAttendanceStats(studentId);
    const history = await attendanceRepo.getStudentAttendanceHistory(studentId);

    const totalDays = Number(stats.total_days) || 0;
    const presentDays = Number(stats.present_days) || 0;
    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 100;

    res.json({
      success: true,
      data: {
        stats: {
          ...stats,
          attendance_percentage: `${percentage}%`,
        },
        history,
      },
    });
  } catch (err) {
    next(err);
  }
}
