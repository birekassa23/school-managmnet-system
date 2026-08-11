import { useState } from 'react';

const mockAllClassResults = {
  'Grade 10 - Section A': [
    { id: 1, admNo: 'ADM-202601', name: 'Abebe Bikila', math: 90, physics: 83, chemistry: 95, english: 87, biology: 89, gpa: 88.8, status: 'Passed (A)' },
    { id: 2, admNo: 'ADM-202602', name: 'Tigist Assefa', math: 85, physics: 80, chemistry: 88, english: 84, biology: 86, gpa: 84.6, status: 'Passed (B+)' },
    { id: 3, admNo: 'ADM-202603', name: 'Kenenisa Bekele', math: 95, physics: 92, chemistry: 96, english: 90, biology: 94, gpa: 93.4, status: 'Passed (A+)' },
    { id: 4, admNo: 'ADM-202604', name: 'Derartu Tulu', math: 78, physics: 75, chemistry: 80, english: 79, biology: 82, gpa: 78.8, status: 'Passed (B)' },
    { id: 5, admNo: 'ADM-202605', name: 'Haile Gebrselassie', math: 98, physics: 95, chemistry: 99, english: 92, biology: 96, gpa: 96.0, status: 'Passed (A+)' },
  ],
  'Grade 10 - Section B': [
    { id: 6, admNo: 'ADM-202606', name: 'Meseret Defar', math: 88, physics: 85, chemistry: 90, english: 89, biology: 87, gpa: 87.8, status: 'Passed (A-)' },
    { id: 7, admNo: 'ADM-202607', name: 'Genzebe Dibaba', math: 92, physics: 89, chemistry: 94, english: 91, biology: 90, gpa: 91.2, status: 'Passed (A)' },
    { id: 8, admNo: 'ADM-202608', name: 'Tirunesh Dibaba', math: 94, physics: 91, chemistry: 95, english: 93, biology: 92, gpa: 93.0, status: 'Passed (A+)' },
  ],
  'Grade 9 - Section A': [
    { id: 9, admNo: 'ADM-202609', name: 'Sifan Hassan', math: 91, physics: 88, chemistry: 93, english: 90, biology: 89, gpa: 90.2, status: 'Passed (A)' },
    { id: 10, admNo: 'ADM-202610', name: 'Lamecha Girma', math: 86, physics: 82, chemistry: 87, english: 85, biology: 84, gpa: 84.8, status: 'Passed (B+)' },
  ],
  'Grade 11 - Section A': [
    { id: 11, admNo: 'ADM-202611', name: 'Selemon Barega', math: 93, physics: 90, chemistry: 92, english: 89, biology: 91, gpa: 91.0, status: 'Passed (A)' },
    { id: 12, admNo: 'ADM-202612', name: 'Yomif Kejelcha', math: 89, physics: 86, chemistry: 90, english: 88, biology: 87, gpa: 88.0, status: 'Passed (A-)' },
  ],
};

const submittedPushesFromTeachers = [
  { date: '2026-08-11 10:10 AM', leadTeacher: 'Mr. Hailemariam Desalegn', class: 'Grade 10 - Section A', course: 'Mathematics (MATH-10)', count: 5 },
  { date: '2026-08-11 09:45 AM', leadTeacher: 'Mrs. Selamawit Bekele', class: 'Grade 10 - Section A', course: 'Physics (PHYS-10)', count: 5 },
  { date: '2026-08-10 03:20 PM', leadTeacher: 'Dr. Yared Tilahun', class: 'Grade 10 - Section B', course: 'Chemistry (CHEM-10)', count: 3 },
];

export default function RegistrarStudentResults() {
  const [selectedClass, setSelectedClass] = useState('Grade 10 - Section A');
  const [search, setSearch] = useState('');

  const currentClassStudents = mockAllClassResults[selectedClass] || [];

  const filteredStudents = currentClassStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-sky-400">
            Registrar Master Gradebook & Transcripts
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            All Class Student Results & Submissions 📊
          </h1>
          <p className="text-slate-300 text-sm">
            Inspect marks submitted by homeroom lead teachers, verify course grades, and manage student transcripts.
          </p>
        </div>
      </header>

      {/* Class Head Pushed Results Log Summary */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <i className="fas fa-inbox text-amber-500" /> Recent Results Pushed by Class Lead Teachers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {submittedPushesFromTeachers.map((p, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span>{p.class}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Received
                </span>
              </div>
              <span className="text-xs text-sky-600 dark:text-sky-400 font-semibold block">{p.course}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Lead: {p.leadTeacher}</span>
              <span className="text-[10px] text-slate-400 block pt-1">{p.date} • {p.count} Students</span>
            </div>
          ))}
        </div>
      </div>

      {/* Class Filter Bar & Search */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex-1 space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Select Grade Class Section
          </label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-sky-400 font-bold"
          >
            {Object.keys(mockAllClassResults).map((cls) => (
              <option key={cls} value={cls}>
                {cls} ({mockAllClassResults[cls].length} Students)
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 space-y-1">
          <label className="block text-xs font-bold capitalize tracking-wider text-slate-700 dark:text-slate-300">
            Search Student Name or Adm No
          </label>
          <div className="flex items-center px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
            <i className="fas fa-search text-slate-400 mr-2.5 text-xs" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Master Class Results Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <i className="fas fa-table text-sky-500" /> Master Transcript Roster - {selectedClass}
          </h3>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs shadow-md hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fas fa-print" /> Export Class Transcripts
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">Admission No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4">Math</th>
                <th className="p-4">Physics</th>
                <th className="p-4">Chemistry</th>
                <th className="p-4">English</th>
                <th className="p-4">Biology</th>
                <th className="p-4 text-right">Average GPA</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                  <td className="p-4 font-mono text-xs text-slate-500">{s.admNo}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="p-4 font-medium">{s.math}%</td>
                  <td className="p-4 font-medium">{s.physics}%</td>
                  <td className="p-4 font-medium">{s.chemistry}%</td>
                  <td className="p-4 font-medium">{s.english}%</td>
                  <td className="p-4 font-medium">{s.biology}%</td>
                  <td className="p-4 font-extrabold text-sky-600 dark:text-sky-400 text-right text-base">
                    {s.gpa}%
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
