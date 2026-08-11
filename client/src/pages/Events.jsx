import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { isTeacher, isPrincipal } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    startTime: '09:00',
    endTime: '12:00',
    location: 'Main Auditorium',
    targetAudience: 'all',
  });

  const canCreate = isTeacher || isPrincipal;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await api('/events');
      setEvents(data || []);
    } catch (err) {
      console.warn('Using initial events list:', err.message);
      setEvents([
        {
          id: 1,
          title: 'Annual Sports & Cultural Day 2026',
          description: 'Inter-house sports competitions, music performance, and award ceremony for students.',
          event_date: '2026-09-15',
          start_time: '08:30:00',
          end_time: '16:00:00',
          location: 'Academy Sports Complex',
          organizer_name: 'Principal Office',
        },
        {
          id: 2,
          title: 'Parent-Teacher Orientation Conference',
          description: 'First term academic progress review meeting with parents and class tutors.',
          event_date: '2026-10-05',
          start_time: '09:00:00',
          end_time: '13:00:00',
          location: 'School Hall A',
          organizer_name: 'Administration',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      await api('/events', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setMsg({ type: 'success', text: '✅ Event created successfully!' });
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      setMsg({ type: 'error', text: err.message || 'Failed to create event' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api(`/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    } catch (err) {
      alert(err.message || 'Failed to delete event');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            📅 Upcoming School Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Calendar of celebrations, sports events, academic tests, and parent conferences.
          </p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <i className="fas fa-plus" /> Create New Event
          </button>
        )}
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-sm font-medium text-center ${
            msg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
          }`}
        >
          {msg.text}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400">
          <i className="fas fa-spinner fa-spin fa-2x mb-2" />
          <p className="text-sm">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <i className="fas fa-calendar-times text-4xl text-slate-300 dark:text-slate-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Events Scheduled</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Upcoming school events will be listed here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((evt) => (
            <article
              key={evt.id}
              className="flex flex-col p-6 rounded-2xl bg-white dark:bg-slate-900 border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-xs font-bold capitalize tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                📆 {evt.event_date ? new Date(evt.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{evt.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1 mb-4">{evt.description}</p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>📍 <strong>Location:</strong> {evt.location || 'Campus Auditorium'}</div>
                <div>⏰ <strong>Time:</strong> {evt.start_time || '09:00'} - {evt.end_time || '12:00'}</div>
              </div>
              {canCreate && (
                <button
                  onClick={() => handleDelete(evt.id)}
                  className="mt-4 self-end px-3 py-1 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-600 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <i className="fas fa-trash-alt mr-1" /> Delete Event
                </button>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto animate-fade-in border border-slate-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New School Event</h2>
              <button
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-lg cursor-pointer p-1"
                onClick={() => setShowModal(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  placeholder="e.g. Science Fair 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-y"
                  placeholder="Provide event details and agenda..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-1">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize tracking-wider mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                    placeholder="Auditorium / Field"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
