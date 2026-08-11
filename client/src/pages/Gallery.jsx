import { useEffect, useState } from 'react';
import { api, uploadUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Gallery() {
  const { isTeacher, isPrincipal } = useAuth();
  const [images, setImages] = useState([]);
  const [event, setEvent] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const canUpload = isTeacher || isPrincipal;

  const load = async () => {
    setLoading(true);
    try {
      const rows = await api('/gallery');
      setImages(rows || []);
    } catch {
      setMessage('Could not load gallery.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    setMessage('');
    const body = new FormData();
    body.append('event', event);
    body.append('desc', desc);
    if (file) body.append('file', file);
    try {
      await api('/gallery', { method: 'POST', body });
      setEvent('');
      setDesc('');
      setFile(null);
      setMessage('✅ Photo uploaded successfully.');
      await load();
    } catch (err) {
      const map = { empty: 'Please fill event, description, and select a file.', not_supported: 'Only JPG/PNG images are supported.' };
      setMessage(map[err.code] || err.message || 'Upload failed.');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await api(`/gallery/${id}`, { method: 'DELETE' });
      await load();
    } catch {
      setMessage('Could not delete photo.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            📸 Memorable Moments
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            School gallery of events, student activities, sports, and achievements.
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
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload New Photo</h3>
          <form onSubmit={upload} encType="multipart/form-data" className="space-y-3">
            <input
              type="text"
              name="event"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Event / Activity Name"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              required
            />
            <input
              type="text"
              name="desc"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
              placeholder="Short Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <label
              htmlFor="gallery-file"
              className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-amber-400/70 bg-amber-400/5 dark:bg-amber-400/10 text-slate-900 dark:text-white font-semibold text-sm cursor-pointer hover:bg-amber-400/10 transition-colors"
            >
              <i className="fas fa-folder-open text-xl text-amber-500" />
              <span>{file ? file.name : 'Select Image File (JPG/PNG)'}</span>
              <input
                type="file"
                name="file"
                id="gallery-file"
                className="hidden"
                accept="image/jpeg,image/png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <i className="fas fa-cloud-upload-alt" /> Upload Photo
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fas fa-spinner fa-spin fa-2x mb-2" />
          <p className="text-sm">Loading gallery...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <i className="fas fa-images text-4xl text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Photos Yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Uploaded gallery photos will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((row) => {
            const imgId = row.id || row.imageid;
            const eventName = row.title || row.imageevent || 'School Event';
            const description = row.description || row.imagedesc || '';
            const uploader = row.uploader_name || row.uploader || 'Staff';
            const fileName = row.file_name || row.imagename;

            return (
              <article
                key={imgId}
                className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="w-full h-56 bg-cover bg-center bg-no-repeat bg-slate-100 dark:bg-slate-800"
                  style={{ backgroundImage: `url(${uploadUrl(fileName, 'image')})` }}
                />
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{eventName}</h2>
                    {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">By: {uploader}</span>
                    {canUpload && (
                      <button
                        type="button"
                        onClick={() => remove(imgId)}
                        className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <i className="fas fa-trash-alt mr-1" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
