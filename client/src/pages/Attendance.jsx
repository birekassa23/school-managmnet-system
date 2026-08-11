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

  // Sample student roster for section marking
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
      // Try fetching existing section attendance records
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
        // Initialize default present status
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

      // Fetch summary stats
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
    <div className="home-dashboard" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ color: 'var(--awa-navy)', marginBottom: '0.5rem' }}>📋 Student Attendance Manager</h1>
        <p style={{ color: 'var(--awa-muted)', marginBottom: '1.5rem' }}>
          Select class section and date to record daily attendance, track absences, and view statistics.
        </p>

        {msg && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: 8,
              marginBottom: '1.5rem',
              background: msg.type === 'success' ? '#d1fae5' : '#fee2e2',
              color: msg.type === 'success' ? '#065f46' : '#991b1b',
              fontWeight: 500,
            }}
          >
            {msg.text}
          </div>
        )}

        {/* Section & Date Select Controls */}
        <div
          style={{
            background: '#fff',
            padding: '1.25rem',
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--awa-navy)', marginBottom: 4 }}>
              Class & Section
            </label>
            <select
              value={sectionId}
              onChange={(e) => setSectionId(e.target.value)}
              style={{ padding: '0.5rem 1rem', borderRadius: 6, border: '1px solid #ccc' }}
            >
              <option value="1">Grade 9 - Section A</option>
              <option value="2">Grade 10 - Section B</option>
              <option value="3">Grade 11 - Section A</option>
              <option value="4">Grade 12 - Section C</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--awa-navy)', marginBottom: 4 }}>
              Attendance Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ padding: '0.45rem 1rem', borderRadius: 6, border: '1px solid #ccc' }}
            />
          </div>
        </div>

        {/* Attendance Marking Table */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              marginBottom: '1.5rem',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--awa-navy)', color: '#fff', fontSize: '0.9rem' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>#</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Admission No</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Student Name</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Remarks / Notes</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((row, idx) => (
                  <tr key={row.studentId} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{idx + 1}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--awa-muted)', fontSize: '0.85rem' }}>
                      {row.admission}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: 'var(--awa-navy)' }}>
                      {row.name}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row.studentId, e.target.value)}
                        disabled={!canMark}
                        style={{
                          padding: '0.35rem 0.65rem',
                          borderRadius: 6,
                          fontWeight: 600,
                          border: '1px solid #ccc',
                          background:
                            row.status === 'present'
                              ? '#ecfdf5'
                              : row.status === 'absent'
                              ? '#fef2f2'
                              : row.status === 'late'
                              ? '#fffbeb'
                              : '#eff6ff',
                          color:
                            row.status === 'present'
                              ? '#047857'
                              : row.status === 'absent'
                              ? '#b91c1c'
                              : row.status === 'late'
                              ? '#b45309'
                              : '#1d4ed8',
                        }}
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                        <option value="excused">Excused</option>
                      </select>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <input
                        type="text"
                        placeholder="Add optional note..."
                        value={row.remarks}
                        onChange={(e) => handleRemarkChange(row.studentId, e.target.value)}
                        disabled={!canMark}
                        style={{ width: '90%', padding: '0.35rem 0.5rem', borderRadius: 4, border: '1px solid #ddd' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {canMark && (
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: 30,
                background: 'linear-gradient(135deg, var(--awa-gold-light), var(--awa-gold))',
                color: 'var(--awa-navy)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(201, 162, 39, 0.4)',
              }}
            >
              {saving ? 'Saving Attendance...' : 'Save Attendance Records'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
