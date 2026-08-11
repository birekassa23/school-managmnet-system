import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const mockCourseGrades = [
  {
    id: 1,
    courseCode: 'MATH-10',
    courseName: 'Mathematics (10th Grade)',
    teacher: 'Mr. Hailemariam Desalegn',
    test1: 18, // out of 20
    quiz: 9, // out of 10
    midterm: 27, // out of 30
    final: 36, // out of 40
    total: 90,
    letterGrade: 'A',
    progress: 90,
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
    progress: 83,
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
    progress: 95,
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
    progress: 87,
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
    progress: 89,
  },
];

export default function StudentGrades() {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);

  const studentName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || user?.username || 'Student';

  // Overall average
  const overallAvg = Math.round(
    mockCourseGrades.reduce((sum, c) => sum + c.total, 0) / mockCourseGrades.length
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-sky-400">
            Personal Academic Results
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            My Course Grades & Progress 📊
          </h1>
          <p className="text-slate-300 text-sm">
            Student: <span className="font-bold text-white">{studentName}</span> | Overall GPA Average: <span className="font-bold text-amber-400">{overallAvg}%</span>
          </p>
        </div>
      </header>

      {/* Course Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockCourseGrades.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCourse(c)}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-sky-400 transition-all cursor-pointer space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                {c.courseCode}
              </span>
              <span className="text-lg font-black text-amber-500">{c.letterGrade}</span>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{c.courseName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Instructor: {c.teacher}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Score: {c.total}/100</span>
                <span>{c.progress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Exam Breakdown Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
          <i className="fas fa-list-alt text-sky-500" /> Exam & Assessment Breakdown
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900 dark:bg-slate-950 text-white text-xs tracking-wider font-semibold">
              <tr>
                <th className="p-4">Course Name</th>
                <th className="p-4">Test 1 (20%)</th>
                <th className="p-4">Quiz/Assignment (10%)</th>
                <th className="p-4">Midterm (30%)</th>
                <th className="p-4">Final Exam (40%)</th>
                <th className="p-4 text-right">Total Score</th>
                <th className="p-4 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {mockCourseGrades.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{c.courseName}</td>
                  <td className="p-4">{c.test1} / 20</td>
                  <td className="p-4">{c.quiz} / 10</td>
                  <td className="p-4">{c.midterm} / 30</td>
                  <td className="p-4">{c.final} / 40</td>
                  <td className="p-4 font-extrabold text-sky-600 dark:text-sky-400 text-right">{c.total} %</td>
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
