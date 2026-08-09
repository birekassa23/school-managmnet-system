import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Notices() {
  const { isTeacher } = useAuth();
  const [notices, setNotices] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const rows = await api('/notices');
    setNotices(rows);
  };

  useEffect(() => {
    load().catch(() => setError('Could not load notices.'));
  }, []);

  const publish = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api('/notices', {
        method: 'POST',
        body: JSON.stringify({ notice: text }),
      });
      setText('');
      await load();
    } catch {
      setError('Could not publish notice.');
    }
  };

  const remove = async (id) => {
    await api(`/notices/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="mid">
      <p className="texttitle">Notices</p>
      {error && <p className="form-error">{error}</p>}
      {isTeacher && (
        <div className="comment">
          <form className="notice" onSubmit={publish}>
            <textarea
              name="notice"
              id="notice"
              placeholder="Write Information Here To Publish It"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <br />
            <button type="submit" id="publish" name="submit">
              Publish
            </button>
          </form>
        </div>
      )}
      <div
        className="d-flex flex-column bd-highlight mb-3 notice-list"
        style={{
          textAlign: 'center',
          marginTop: isTeacher ? 125 : 15,
          backgroundColor: 'white',
          width: 886,
          marginLeft: 328,
          border: '1px solid black',
          overflowY: 'scroll',
          overflowX: 'hidden',
          height: isTeacher ? 600 : 750,
        }}
      >
        {notices.map((row) => (
          <div key={row.COMMENTid} style={{ border: '1px solid black', position: 'relative' }}>
            <div className="p-2 bd-highlight">
              <p className="dates">{row.insert_date}</p>
            </div>
            <div className="p-2 bd-highlight">
              <p className="naau">Notice Issued By : {row.user}</p>
            </div>
            <div className="p-2 bd-highlight">
              <p className="notice">{row.notice}</p>
            </div>
            {isTeacher && (
              <form
                className="delete_form"
                onSubmit={(e) => {
                  e.preventDefault();
                  remove(row.COMMENTid);
                }}
              >
                <button name="delete" type="submit">
                  Delete
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
