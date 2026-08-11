import { supabase } from '../config/supabase.js';

export async function markStudentAttendance(studentId, sectionId, attendanceDate, status, remarks, markedByUserId) {
  const { data, error } = await supabase
    .from('student_attendance')
    .upsert(
      {
        student_id: studentId,
        section_id: sectionId,
        attendance_date: attendanceDate,
        status: status,
        remarks: remarks || null,
        marked_by_user_id: markedByUserId,
      },
      { onConflict: 'student_id,attendance_date' }
    )
    .select('*');

  if (error) throw error;
  return data;
}

export async function getAttendanceBySectionAndDate(sectionId, dateStr) {
  const { data, error } = await supabase
    .from('student_attendance')
    .select(`
      id,
      student_id,
      attendance_date,
      status,
      remarks,
      students:student_id (
        admission_number,
        users:user_id (first_name, last_name)
      )
    `)
    .eq('section_id', sectionId)
    .eq('attendance_date', dateStr);

  if (error) throw error;

  return (data || []).map((sa) => ({
    id: sa.id,
    student_id: sa.student_id,
    attendance_date: sa.attendance_date,
    status: sa.status,
    remarks: sa.remarks,
    admission_number: sa.students?.admission_number || '',
    first_name: sa.students?.users?.first_name || '',
    last_name: sa.students?.users?.last_name || '',
  }));
}

export async function getStudentAttendanceStats(studentId) {
  const { data, error } = await supabase
    .from('student_attendance')
    .select('status')
    .eq('student_id', studentId);

  if (error) throw error;

  const total_days = data ? data.length : 0;
  let present_days = 0;
  let absent_days = 0;
  let late_days = 0;
  let excused_days = 0;

  (data || []).forEach((row) => {
    if (row.status === 'present') present_days++;
    else if (row.status === 'absent') absent_days++;
    else if (row.status === 'late') late_days++;
    else if (row.status === 'excused') excused_days++;
  });

  return { total_days, present_days, absent_days, late_days, excused_days };
}

export async function getStudentAttendanceHistory(studentId) {
  const { data, error } = await supabase
    .from('student_attendance')
    .select(`
      id,
      attendance_date,
      status,
      remarks,
      sections:section_id (
        name,
        classes:class_id (name)
      )
    `)
    .eq('student_id', studentId)
    .order('attendance_date', { ascending: false });

  if (error) throw error;

  return (data || []).map((sa) => ({
    id: sa.id,
    attendance_date: sa.attendance_date,
    status: sa.status,
    remarks: sa.remarks,
    section_name: sa.sections?.name || '',
    class_name: sa.sections?.classes?.name || '',
  }));
}
