import { useState } from 'react';

const mockCourseMaterials = [
  {
    id: 1,
    course: 'Mathematics (10th Grade)',
    title: 'Algebra & Quadratic Equations Handout',
    type: 'PDF Document',
    size: '2.4 MB',
    date: '2026-08-05',
    url: '#',
  },
  {
    id: 2,
    course: 'Physics (10th Grade)',
    title: 'Newtonian Physics & Dynamics Lecture Notes',
    type: 'PDF Document',
    size: '3.8 MB',
    date: '2026-08-07',
    url: '#',
  },
  {
    id: 3,
    course: 'Chemistry (10th Grade)',
    title: 'Chemical Reactions & Stoichiometry Guide',
    type: 'PDF Document',
    size: '1.9 MB',
    date: '2026-08-08',
    url: '#',
  },
  {
    id: 4,
    course: 'Biology (10th Grade)',
    title: 'Cellular Respiration & Genetics Summary Notes',
    type: 'PDF Document',
    size: '4.2 MB',
    date: '2026-08-10',
    url: '#',
  },
];

export default function StudentMaterials() {
  const [search, setSearch] = useState('');

  const filtered = mockCourseMaterials.filter(
    (m) =>
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-950 p-6 md:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-widest text-sky-400">
            Course Study Materials & Handouts
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            My Course Study Materials 📚
          </h1>
          <p className="text-slate-300 text-sm">
            Download curriculum lecture notes, handouts, worksheets, and study resources.
          </p>
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center px-4">
        <i className="fas fa-search text-slate-400 mr-3 text-sm" />
        <input
          type="text"
          placeholder="Search materials by title or course name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none bg-transparent text-slate-900 dark:text-white"
        />
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl">
                <i className="fas fa-file-pdf" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 block">{m.course}</span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{m.title}</h4>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  {m.type} • {m.size} • Uploaded {m.date}
                </span>
              </div>
            </div>

            <a
              href={m.url}
              onClick={(e) => {
                e.preventDefault();
                alert(`Downloading ${m.title}...`);
              }}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Download Material"
            >
              <i className="fas fa-download" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
