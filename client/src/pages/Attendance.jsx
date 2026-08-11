import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Attendance() {
  const { isTeacher, isPrincipal } = useAuth();
  const [sectionId, setSectionId] = useState('1');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const sampleStudents = [
    { id: 1, name: 'Abebe Bikila', admission: 'ADM-00101' },
    { id: 2, name: 'Tigist Assefa', admission: 'ADM-00102' },
    { id: 3, name: 'Haile Gebrselassie', admission: 'ADM-00103' },
    { id: 4, name: 'Derartu Tulu', admission: 'ADM-00104' },
    { id: 5, name: 'Kenenisa Bekele', admission: 'ADM-00105' },
  ];

  const canMark = isTeacher || isPrincipal;

  useEffect(() => {
    loadAttendance();
  }, [sectionId, date]);

  const loadAttendance = async () => {
    setLoading(true);
    setMsg(null);
    try {
      const existing = await api(`/attendance/section?sectionId=${sectionId}&date=${date}`);
      if (existing && existing.length) {
        setAttendanceRecords(
          existing.map((r) => ({
            studentId: r.student_id,
            name: `${r.first_name} ${r.last_name}`,
            admission: r.admission_number,
            status: r.status,
            remarks: r.remarks || '',
          }))
        );
      } else {
        setAttendanceRecords(
          sampleStudents.map((s) => ({
            studentId: s.id,
            name: s.name,
            admission: s.admission,
            status: 'present',
            remarks: '',
          }))
        );
      }

      const sumRes = await api('/attendance/student');
      if (sumRes) setSummary(sumRes);
    } catch (err) {
      console.warn('Using default attendance grid:', err.message);
      setAttendanceRecords(
        sampleStudents.map((s) => ({
          studentId: s.id,
          name: s.name,
          admission: s.admission,
          status: 'present',
          remarks: '',
        }))
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setAttendanceRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status: newStatus } : r))
    );
  };

  const handleRemarkChange = (studentId, text) => {
    setAttendanceRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, remarks: text } : r))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await api('/attendance/mark', {
        method: 'POST',
        body: JSON.stringify({
          sectionId: Number(sectionId),
          attendanceDate: date,
          records: attendanceRecords,
        }),
      });
      setMsg({ type: 'success', text: '✅ Attendance recorded successfully!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to save attendance' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            📋 Student Attendance Manager
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Select class section and date to record daily attendance and track absences.
          </p>
        </div>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-sm font-medium text-center ${
            msg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Controls Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="flex-1 space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Class & Section
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
          >
            <option value="1">Grade 9 - Section A</option>
            <option value="2">Grade 10 - Section B</option>
            <option value="3">Grade 11 - Section A</option>
            <option value="4">Grade 12 - Section C</option>
          </select>
        </div>

        <div className="flex-1 space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Attendance Date
          </label>
          <input
            type="date"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      {/* Roster Table Container */}
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Admission No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Attendance Status</th>
                <th className="p-4">Notes / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {attendanceRecords.map((row, idx) => (
                <tr key={row.studentId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{idx + 1}</td>
                  <td className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400">{row.admission}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{row.name}</td>
                  <td className="p-4">
                    <select
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                        row.status === 'present'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : row.status === 'absent'
                          ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                          : row.status === 'late'
                          ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                          : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                      }`}
                      value={row.status}
                      onChange={(e) => handleStatusChange(row.studentId, e.target.value)}
                      disabled={!canMark}
                    >
                      <option value="present" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Present</option>
                      <option value="absent" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Absent</option>
                      <option value="late" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Late</option>
                      <option value="excused" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Excused</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Optional remark..."
                      value={row.remarks}
                      onChange={(e) => handleRemarkChange(row.studentId, e.target.value)}
                      disabled={!canMark}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {canMark && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <i className="fas fa-save" /> {saving ? 'Saving...' : 'Save Attendance Records'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
