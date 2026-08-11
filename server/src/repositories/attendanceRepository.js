import pool from '../config/db.js';

export async function markStudentAttendance(studentId, sectionId, attendanceDate, status, remarks, markedByUserId) {
  const [res] = await pool.query(
    `INSERT INTO student_attendance (student_id, section_id, attendance_date, status, remarks, marked_by_user_id)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), remarks = VALUES(remarks), marked_by_user_id = VALUES(marked_by_user_id)`,
    [studentId, sectionId, attendanceDate, status, remarks || null, markedByUserId]
  );
  return res;
}

export async function getAttendanceBySectionAndDate(sectionId, dateStr) {
  const [rows] = await pool.query(
    `SELECT sa.id, sa.student_id, sa.attendance_date, sa.status, sa.remarks,
            u.first_name, u.last_name, s.admission_number
     FROM student_attendance sa
     JOIN students s ON sa.student_id = s.id
     JOIN users u ON s.user_id = u.id
     WHERE sa.section_id = ? AND sa.attendance_date = ?
     ORDER BY u.last_name, u.first_name`,
    [sectionId, dateStr]
  );
  return rows;
}

export async function getStudentAttendanceStats(studentId) {
  const [rows] = await pool.query(
    `SELECT 
        COUNT(*) AS total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present_days,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent_days,
        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS late_days,
        SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) AS excused_days
     FROM student_attendance
     WHERE student_id = ?`,
    [studentId]
  );
  return rows[0] || { total_days: 0, present_days: 0, absent_days: 0, late_days: 0, excused_days: 0 };
}

export async function getStudentAttendanceHistory(studentId) {
  const [rows] = await pool.query(
    `SELECT sa.id, sa.attendance_date, sa.status, sa.remarks,
            sec.name AS section_name, c.name AS class_name
     FROM student_attendance sa
     JOIN sections sec ON sa.section_id = sec.id
     JOIN classes c ON sec.class_id = c.id
     WHERE sa.student_id = ?
     ORDER BY sa.attendance_date DESC`,
    [studentId]
  );
  return rows;
}
