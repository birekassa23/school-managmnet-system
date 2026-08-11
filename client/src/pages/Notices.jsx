import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Notices() {
  const { isTeacher, isPrincipal } = useAuth();
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const canPublish = isTeacher || isPrincipal;

  const load = async () => {
    setLoading(true);
    try {
      const rows = await api('/notices');
      setNotices(rows || []);
    } catch {
      setError('Could not load notices.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const publish = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setError('');
    try {
      await api('/notices', {
        method: 'POST',
        body: JSON.stringify({
          title: title.trim() || 'School Announcement',
          notice: text,
          content: text,
        }),
      });
      setTitle('');
      setText('');
      await load();
    } catch {
      setError('Could not publish notice.');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this notice?')) return;
    try {
      await api(`/notices/${id}`, { method: 'DELETE' });
      await load();
    } catch {
      setError('Could not delete notice.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            📢 Bulletin Notices
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official announcements and campus news from school administration.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-sm font-medium border border-red-200 dark:border-red-800 text-center">
          {error}
        </div>
      )}

      {canPublish && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Publish New Announcement</h3>
          <form onSubmit={publish} className="space-y-3">
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Notice Title / Headline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm min-h-[110px] resize-y"
              placeholder="Write detailed information here to publish..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <i className="fas fa-paper-plane" /> Publish Notice
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fas fa-spinner fa-spin fa-2x mb-2" />
          <p className="text-sm">Loading notices...</p>
        </div>
      ) : notices.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <i className="fas fa-inbox text-4xl text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Notices Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Announcements published by school staff will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((row) => {
            const noticeId = row.id || row.COMMENTid;
            const author = row.author_name || row.user || 'School Admin';
            const dateStr = row.created_at
              ? new Date(row.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
              : row.insert_date || '';
            const contentText = row.content || row.notice;
            const noticeTitle = row.title || 'School Announcement';

            return (
              <article
                key={noticeId}
                className="relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xs font-semibold text-slate-400 mb-1">{dateStr}</div>
                <div className="text-xs font-bold capitalize tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                  Issued By: {author}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{noticeTitle}</h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">{contentText}</p>

                {canPublish && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      remove(noticeId);
                    }}
                    className="absolute top-5 right-5"
                  >
                    <button
                      type="submit"
                      className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <i className="fas fa-trash-alt mr-1" /> Delete
                    </button>
                  </form>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
