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
    <div className="home-dashboard" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ color: 'var(--awa-navy)', margin: 0 }}>📅 Upcoming School Events</h1>
            <p style={{ color: 'var(--awa-muted)', margin: '0.25rem 0 0' }}>
              Calendar of celebrations, sports events, academic tests, and parent conferences.
            </p>
          </div>
          {canCreate && (
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '0.65rem 1.5rem',
                borderRadius: 25,
                background: 'linear-gradient(135deg, var(--awa-gold-light), var(--awa-gold))',
                color: 'var(--awa-navy)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(201, 162, 39, 0.4)',
              }}
            >
              + Create New Event
            </button>
          )}
        </div>

        {msg && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderRadius: 8,
              marginBottom: '1.5rem',
              background: msg.type === 'success' ? '#d1fae5' : '#fee2e2',
              color: msg.type === 'success' ? '#065f46' : '#991b1b',
            }}
          >
            {msg.text}
          </div>
        )}

        {/* Events List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {events.map((evt) => (
            <div
              key={evt.id}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(12, 35, 64, 0.06)',
                borderLeft: '5px solid var(--awa-gold)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--awa-gold)', textTransform: 'uppercase', marginBottom: 4 }}>
                📆 {evt.event_date ? new Date(evt.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA'}
              </div>
              <h3 style={{ margin: '0 0 0.5rem', color: 'var(--awa-navy)', fontSize: '1.15rem' }}>{evt.title}</h3>
              <p style={{ color: 'var(--awa-muted)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1, margin: '0 0 1rem' }}>
                {evt.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                📍 <strong>Location:</strong> {evt.location || 'Campus'} <br />
                ⏰ <strong>Time:</strong> {evt.start_time || '09:00'} - {evt.end_time || '12:00'}
              </div>
              {canCreate && (
                <button
                  onClick={() => handleDelete(evt.id)}
                  style={{
                    marginTop: '0.85rem',
                    alignSelf: 'flex-end',
                    padding: '0.25rem 0.75rem',
                    background: '#fee2e2',
                    color: '#991b1b',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  Delete Event
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '90%', maxWidth: 500 }}>
              <h2 style={{ margin: '0 0 1rem', color: 'var(--awa-navy)' }}>Create New School Event</h2>
              <form onSubmit={handleCreate}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Event Title</label>
                  <input
                    type="text"
                    required
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Description</label>
                  <textarea
                    required
                    rows={3}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Date</label>
                    <input
                      type="date"
                      required
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: 4 }}>Location</label>
                    <input
                      type="text"
                      style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #ccc' }}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{ padding: '0.5rem 1.25rem', borderRadius: 6, border: '1px solid #ccc', background: '#fff' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: '0.5rem 1.25rem', borderRadius: 6, border: 'none', background: 'var(--awa-navy)', color: '#fff', fontWeight: 600 }}
                  >
                    Publish Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
