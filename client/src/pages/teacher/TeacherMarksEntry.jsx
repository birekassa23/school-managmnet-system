import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const mockRosterStudents = [
  { id: 1, admNo: 'ADM-202601', name: 'Abebe Bikila', test1: 18, quiz: 9, midterm: 27, final: 36 },
  { id: 2, admNo: 'ADM-202602', name: 'Tigist Assefa', test1: 17, quiz: 8, midterm: 25, final: 34 },
  { id: 3, admNo: 'ADM-202603', name: 'Kenenisa Bekele', test1: 19, quiz: 10, midterm: 28, final: 38 },
  { id: 4, admNo: 'ADM-202604', name: 'Derartu Tulu', test1: 16, quiz: 8, midterm: 24, final: 33 },
  { id: 5, admNo: 'ADM-202605', name: 'Haile Gebrselassie', test1: 20, quiz: 10, midterm: 29, final: 39 },
];

export default function TeacherMarksEntry() {
  const { user } = useAuth();
  const teacherName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Teacher';

  const [selectedClass, setSelectedClass] = useState('Grade 10 - Section A');
  const [selectedCourse, setSelectedCourse] = useState('Mathematics (MATH-10)');
  const [leadTeacher, setLeadTeacher] = useState('Mr. Hailemariam Desalegn (Homeroom Teacher)');
  const [studentsMarks, setStudentsMarks] = useState(mockRosterStudents);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const calculateTotal = (s) => (Number(s.test1) || 0) + (Number(s.quiz) || 0) + (Number(s.midterm) || 0) + (Number(s.final) || 0);

  const calculateGrade = (total) => {
    if (total >= 90) return 'A';
    if (total >= 85) return 'A-';
    if (total >= 80) return 'B+';
    if (total >= 75) return 'B';
    if (total >= 70) return 'C+';
    if (total >= 60) return 'C';
    return 'D';
  };

  const handleScoreChange = (id, field, value) => {
    const num = Math.max(0, Math.min(40, Number(value) || 0));
    setStudentsMarks(
      studentsMarks.map((s) => (s.id === id ? { ...s, [field]: num } : s))
    );
  };

  const handlePushResults = (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setStatusMsg(`Successfully recorded and pushed course marks for ${selectedCourse} to ${leadTeacher}!`);
      setTimeout(() => setStatusMsg(''), 5000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-emerald-400">
            Academic Assessment & Gradebook Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Class Student Marks & Results Entry 📝
          </h1>
          <p className="text-slate-300 text-sm">
            Instructor: <span className="font-bold text-white">{teacherName}</span> | Input student test scores, midterms, and push finalized results to assigned lead teachers.
          </p>
        </div>
      </header>

      {/* Class & Course Selection Controls */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Assigned Class Section
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="Grade 10 - Section A">Grade 10 - Section A</option>
            <option value="Grade 10 - Section B">Grade 10 - Section B</option>
            <option value="Grade 9 - Section A">Grade 9 - Section A</option>
            <option value="Grade 11 - Section A">Grade 11 - Section A</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Subject Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="Mathematics (MATH-10)">Mathematics (MATH-10)</option>
            <option value="Physics (PHYS-10)">Physics (PHYS-10)</option>
            <option value="Chemistry (CHEM-10)">Chemistry (CHEM-10)</option>
            <option value="English (ENG-10)">English (ENG-10)</option>
            <option value="Biology (BIO-10)">Biology (BIO-10)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Assigned Class Lead Teacher
          </label>
          <input
            type="text"
            readOnly
            value={leadTeacher}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm outline-none font-medium"
          />
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-sm font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
          <i className="fas fa-check-circle text-lg" /> {statusMsg}
        </div>
      )}

      {/* Marks Input Table */}
      <form onSubmit={handlePushResults} className="space-y-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <i className="fas fa-edit text-emerald-500" /> Student Assessment Marks Entry
            </h3>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              {saving ? 'Pushing Results...' : 'Push Results to Lead Teacher & Database'} <i className="fas fa-paper-plane" />
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Admission No</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Test 1 (Max 20)</th>
                  <th className="p-4">Quiz (Max 10)</th>
                  <th className="p-4">Midterm (Max 30)</th>
                  <th className="p-4">Final Exam (Max 40)</th>
                  <th className="p-4 text-right">Total Score</th>
                  <th className="p-4 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {studentsMarks.map((s) => {
                  const total = calculateTotal(s);
                  const grade = calculateGrade(total);

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                      <td className="p-4 font-mono text-xs text-slate-500">{s.admNo}</td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white">{s.name}</td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={s.test1}
                          onChange={(e) => handleScoreChange(s.id, 'test1', e.target.value)}
                          className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 font-semibold"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={s.quiz}
                          onChange={(e) => handleScoreChange(s.id, 'quiz', e.target.value)}
                          className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 font-semibold"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={s.midterm}
                          onChange={(e) => handleScoreChange(s.id, 'midterm', e.target.value)}
                          className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 font-semibold"
                        />
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          min="0"
                          max="40"
                          value={s.final}
                          onChange={(e) => handleScoreChange(s.id, 'final', e.target.value)}
                          className="w-20 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-emerald-400 font-semibold"
                        />
                      </td>

                      <td className="p-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-right text-base">
                        {total} %
                      </td>

                      <td className="p-4 text-center">
                        <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                          {grade}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
}
