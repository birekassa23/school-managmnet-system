import { useState } from 'react';

const mockBehaviorMonthly = [
  { month: 'Sept', score: 78, discipline: 80, punctuality: 75, participation: 79 },
  { month: 'Oct', score: 82, discipline: 84, punctuality: 80, participation: 82 },
  { month: 'Nov', score: 85, discipline: 88, punctuality: 82, participation: 85 },
  { month: 'Dec', score: 89, discipline: 90, punctuality: 87, participation: 90 },
  { month: 'Jan', score: 92, discipline: 94, punctuality: 90, participation: 92 },
  { month: 'Feb', score: 96, discipline: 98, punctuality: 95, participation: 95 },
];

const teacherBehaviorRemarks = [
  {
    date: '2026-02-08',
    teacher: 'Mr. Hailemariam Desalegn (Homeroom Teacher)',
    category: 'Punctuality & Leadership',
    type: 'Positive Commendation',
    comment: 'Abebe showed outstanding improvement in morning arrival punctuality and led his class team effectively during science project week.',
    color: 'emerald',
  },
  {
    date: '2026-01-22',
    teacher: 'Mrs. Selamawit Bekele (Physics)',
    category: 'Class Participation',
    type: 'Active Engagement',
    comment: 'Demonstrates great active listening and asks insightful questions in physics lab sessions.',
    color: 'sky',
  },
  {
    date: '2025-11-15',
    teacher: 'Dr. Yared Tilahun (Chemistry)',
    category: 'Conduct & Respect',
    type: 'Behavioral Improvement',
    comment: 'Significant positive change in classroom focus and collaboration with group peers.',
    color: 'amber',
  },
];

export default function BehavioralChartWidget() {
  const [activeMetric, setActiveMetric] = useState('score'); // 'score', 'discipline', 'punctuality', 'participation'

  const maxVal = 100;
  const chartHeight = 160;
  const chartWidth = 500;

  // Compute SVG points
  const points = mockBehaviorMonthly
    .map((d, index) => {
      const x = (index / (mockBehaviorMonthly.length - 1)) * (chartWidth - 40) + 20;
      const y = chartHeight - (d[activeMetric] / maxVal) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="space-y-6">
      {/* Visual Chart Header & Metric Selectors */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <i className="fas fa-chart-line text-emerald-500" /> Behavioral Change & Growth Trajectory
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Monthly conduct rating trend for Abebe Bikila (Academic Year 2025/2026)
            </p>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMetric('score')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeMetric === 'score'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Overall Progress
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('discipline')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeMetric === 'discipline'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Discipline
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('punctuality')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeMetric === 'punctuality'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Punctuality
            </button>
          </div>
        </div>

        {/* SVG Trend Graph */}
        <div className="relative pt-2">
          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
              {/* Grid Lines */}
              {[25, 50, 75, 100].map((val) => {
                const y = chartHeight - (val / maxVal) * (chartHeight - 30) - 15;
                return (
                  <line
                    key={val}
                    x1="20"
                    y1={y}
                    x2={chartWidth - 20}
                    y2={y}
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeDasharray="4 4"
                  />
                );
              })}

              {/* Area Gradient Fill */}
              <defs>
                <linearGradient id="behaviorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <polygon
                points={`20,${chartHeight - 15} ${points} ${chartWidth - 20},${chartHeight - 15}`}
                fill="url(#behaviorGradient)"
              />

              {/* Trend Polyline */}
              <polyline
                fill="none"
                stroke="#10B981"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />

              {/* Data Node Circles */}
              {mockBehaviorMonthly.map((d, index) => {
                const x = (index / (mockBehaviorMonthly.length - 1)) * (chartWidth - 40) + 20;
                const y = chartHeight - (d[activeMetric] / maxVal) * (chartHeight - 30) - 15;
                return (
                  <g key={d.month}>
                    <circle cx={x} cy={y} r="6" fill="#10B981" className="stroke-white dark:stroke-slate-900 stroke-2" />
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      className="fill-slate-900 dark:fill-white font-bold text-[10px]"
                    >
                      {d[activeMetric]}%
                    </text>
                    <text
                      x={x}
                      y={chartHeight - 2}
                      textAnchor="middle"
                      className="fill-slate-500 dark:fill-slate-400 font-semibold text-[10px]"
                    >
                      {d.month}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* 4 Metric Progress Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Overall Discipline</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">98 / 100</span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold">+18% growth</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/50 dark:border-sky-800/40">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Class Punctuality</span>
            <span className="text-xl font-black text-sky-600 dark:text-sky-400 mt-0.5 block">95 / 100</span>
            <span className="text-[10px] text-sky-700 dark:text-sky-300 font-semibold">+20% improvement</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-800/40">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Active Participation</span>
            <span className="text-xl font-black text-amber-600 dark:text-amber-400 mt-0.5 block">95 / 100</span>
            <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Excellent</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/50 dark:border-purple-800/40">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Peer Collaboration</span>
            <span className="text-xl font-black text-purple-600 dark:text-purple-400 mt-0.5 block">96 / 100</span>
            <span className="text-[10px] text-purple-700 dark:text-purple-300 font-semibold">High Social Respect</span>
          </div>
        </div>
      </div>

      {/* Detailed Teacher Remarks & Conduct Evaluation */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
          <i className="fas fa-comment-alt text-amber-500" /> Teacher Conduct Remarks & Behavioral Evaluations
        </h3>

        <div className="space-y-3">
          {teacherBehaviorRemarks.map((r, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fas fa-user-check text-emerald-500" /> {r.teacher}
                </span>
                <span className="text-[11px] text-slate-400">{r.date}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{r.comment}"
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40">
                  {r.category}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/40">
                  {r.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
