import { useEffect, useState } from 'react';
import { api, uploadUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Gallery() {
  const { isTeacher } = useAuth();
  const [images, setImages] = useState([]);
  const [event, setEvent] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const rows = await api('/gallery');
    setImages(rows);
  };

  useEffect(() => {
    load().catch(() => setMessage('Could not load gallery.'));
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
      setMessage('Upload successful.');
      await load();
    } catch (err) {
      const map = { empty: 'Fill event, description, and file.', not_supported: 'Only JPG/PNG images.' };
      setMessage(map[err.code] || 'Upload failed.');
    }
  };

  const remove = async (id) => {
    await api(`/gallery/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="mid">
      <p className="texttitle">Memorable Moments</p>
      {message && <p className="form-error">{message}</p>}
      {isTeacher && (
        <form onSubmit={upload} encType="multipart/form-data">
          <div className="uploadpic">
            <input type="text" name="event" placeholder="Which Event is it related with??" value={event} onChange={(e) => setEvent(e.target.value)} />
            <br />
            <input type="text" name="desc" placeholder="Short Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <br />
            <label htmlFor="gallery-file">
              <span className="glyphicon glyphicon-folder-open" style={{ marginBottom: 5, cursor: 'pointer', fontSize: 30 }} aria-hidden="true">
                Select Picture
              </span>
              <input type="file" name="file" id="gallery-file" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            <br />
            <button type="submit" name="submit">
              Upload <i className="fas fa-cloud-upload-alt" />
            </button>
          </div>
        </form>
      )}
      <div className="gallery-container" style={{ marginLeft: 255 }}>
        {images.map((row) => (
          <div key={row.imageid} style={{ border: '1px solid black' }}>
            <div
              style={{
                width: 320,
                height: 260,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundImage: `url(${uploadUrl(row.imagename, 'image')})`,
                borderBottom: '1px solid black',
              }}
              className="imageholder"
            />
            <h2>Event: {row.imageevent}</h2>
            <h3>Description: {row.imagedesc}</h3>
            <h4>Uploaded by: {row.uploader}</h4>
            {isTeacher && (
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  remove(row.imageid);
                }}
                style={{ float: 'right' }}
              >
                <button type="submit" name="delete" id="deletepic">
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
