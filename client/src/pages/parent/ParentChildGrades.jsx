import BehavioralChartWidget from '../../components/parent/BehavioralChartWidget';
import { useAuth } from '../../context/AuthContext';

const abebeCourseResults = [
  {
    id: 1,
    courseCode: 'MATH-10',
    courseName: 'Mathematics (10th Grade)',
    teacher: 'Mr. Hailemariam Desalegn',
    test1: 18,
    quiz: 9,
    midterm: 27,
    final: 36,
    total: 90,
    letterGrade: 'A',
    status: 'Excellence',
  },
  {
    id: 2,
    courseCode: 'PHYS-10',
    courseName: 'Physics (10th Grade)',
    teacher: 'Mrs. Selamawit Bekele',
    test1: 16,
    quiz: 8,
    midterm: 25,
    final: 34,
    total: 83,
    letterGrade: 'B+',
    status: 'Very Good',
  },
  {
    id: 3,
    courseCode: 'CHEM-10',
    courseName: 'Chemistry (10th Grade)',
    teacher: 'Dr. Yared Tilahun',
    test1: 19,
    quiz: 10,
    midterm: 28,
    final: 38,
    total: 95,
    letterGrade: 'A+',
    status: 'Outstanding',
  },
  {
    id: 4,
    courseCode: 'ENG-10',
    courseName: 'English (10th Grade)',
    teacher: 'Ms. Bethlehem Assefa',
    test1: 17,
    quiz: 9,
    midterm: 26,
    final: 35,
    total: 87,
    letterGrade: 'A-',
    status: 'Great Progress',
  },
  {
    id: 5,
    courseCode: 'BIO-10',
    courseName: 'Biology (10th Grade)',
    teacher: 'Mr. Dawit Kebede',
    test1: 18,
    quiz: 8,
    midterm: 27,
    final: 36,
    total: 89,
    letterGrade: 'A-',
    status: 'Great Progress',
  },
];

export default function ParentChildGrades() {
  const { user } = useAuth();
  const parentName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Parent';

  const overallAvg = Math.round(
    abebeCourseResults.reduce((sum, c) => sum + c.total, 0) / abebeCourseResults.length
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-purple-400">
            Family Academic Progress Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Abebe Bikila's Academic & Behavioral Report 🎓
          </h1>
          <p className="text-slate-300 text-sm">
            Parent: <span className="font-bold text-white">{parentName}</span> | Child: <span className="font-bold text-amber-400">Abebe Bikila (Grade 10 - Adm No: ADM-202601)</span>
          </p>
        </div>
      </header>

      {/* Child Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Overall GPA Average</span>
          <span className="text-3xl font-black text-amber-500 mt-1 block">{overallAvg}%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Attendance Rate</span>
          <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">96%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Behavioral Growth Score</span>
          <span className="text-3xl font-black text-sky-500 mt-1 block">96 / 100</span>
        </div>
      </div>

      {/* Behavioral Change & Graph Section */}
      <BehavioralChartWidget />

      {/* Exam Results Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <i className="fas fa-graduation-cap text-purple-500" /> Abebe Bikila's Course Grade Report
          </h3>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fas fa-print" /> Print Full Report Card
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">Assigned Course</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Test 1 (20%)</th>
                <th className="p-4">Quiz (10%)</th>
                <th className="p-4">Midterm (30%)</th>
                <th className="p-4">Final (40%)</th>
                <th className="p-4 text-right">Total Score</th>
                <th className="p-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {abebeCourseResults.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{c.courseName}</td>
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400">{c.teacher}</td>
                  <td className="p-4">{c.test1} / 20</td>
                  <td className="p-4">{c.quiz} / 10</td>
                  <td className="p-4">{c.midterm} / 30</td>
                  <td className="p-4">{c.final} / 40</td>
                  <td className="p-4 font-extrabold text-purple-600 dark:text-purple-400 text-right">{c.total} %</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
                      {c.letterGrade}
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
