import { useEffect, useState } from 'react';
import { api, uploadUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function VideoLectures() {
  const { isTeacher, isPrincipal } = useAuth();
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ class: '', title: '', desc: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const canUpload = isTeacher || isPrincipal;

  const load = async () => {
    setLoading(true);
    try {
      const rows = await api('/videos');
      setVideos(rows || []);
    } catch {
      setMessage('Could not load videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const upload = async (e) => {
    e.preventDefault();
    setMessage('');
    const body = new FormData();
    body.append('class', form.class);
    body.append('title', form.title);
    body.append('desc', form.desc);
    if (file) body.append('file', file);
    try {
      await api('/videos', { method: 'POST', body });
      setForm({ class: '', title: '', desc: '' });
      setFile(null);
      setMessage('✅ Video lecture uploaded successfully.');
      await load();
    } catch (err) {
      const map = { empty: 'Please fill all fields and select a video.', notmp4: 'Only MP4 videos are allowed.' };
      setMessage(map[err.code] || err.message || 'Upload failed.');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video lecture?')) return;
    try {
      await api(`/videos/${id}`, { method: 'DELETE' });
      await load();
    } catch {
      setMessage('Could not delete video lecture.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            🎥 Video Lectures
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Class recordings, study material, and video lessons for students.
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-sm font-medium text-center ${
            message.startsWith('✅')
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}
        >
          {message}
        </div>
      )}

      {canUpload && (
        <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload New Video Lesson</h3>
          <form onSubmit={upload} encType="multipart/form-data" className="space-y-3">
            <input
              type="text"
              name="class"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Recommended Class / Grade (e.g. Grade 10)"
              value={form.class}
              onChange={onChange}
              required
            />
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Lesson Topic / Title"
              value={form.title}
              onChange={onChange}
              required
            />
            <input
              type="text"
              name="desc"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Short Description of the lesson"
              value={form.desc}
              onChange={onChange}
            />
            <label
              htmlFor="video-file"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-amber-400/70 bg-amber-400/5 dark:bg-amber-400/10 text-slate-900 dark:text-white font-semibold text-sm cursor-pointer hover:bg-amber-400/10 transition-colors"
            >
              <i className="fas fa-video text-xl text-amber-500" />
              <span>{file ? file.name : 'Select MP4 Video File'}</span>
              <input
                type="file"
                name="file"
                id="video-file"
                className="hidden"
                accept="video/mp4"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <i className="fas fa-cloud-upload-alt" /> Upload Video
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fas fa-spinner fa-spin fa-2x mb-2" />
          <p className="text-sm">Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <i className="fas fa-film text-4xl text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Video Lectures Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Video lessons uploaded by teachers will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((row) => {
            const videoId = row.id || row.videoid;
            const videoTitle = row.title || row.videotitle || 'Video Lesson';
            const description = row.description || row.desc || '';
            const uploader = row.uploader_name || row.uploadedby || 'Teacher';
            const grade = row.grade_name || row.recommended || row.class || 'All Classes';
            const fileName = row.file_name || row.videofullname;

            return (
              <article
                key={videoId}
                className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-video bg-black">
                  <video controls preload="metadata" className="w-full h-full object-cover">
                    <source src={uploadUrl(fileName, 'video')} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{videoTitle}</h2>
                    {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      By: <strong className="text-slate-900 dark:text-white">{uploader}</strong>
                    </div>
                    <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">Grade: {grade}</div>
                  </div>
                  {canUpload && (
                    <button
                      type="button"
                      onClick={() => remove(videoId)}
                      className="self-end px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <i className="fas fa-trash-alt mr-1" /> Delete
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
