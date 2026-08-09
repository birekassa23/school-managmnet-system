import { useEffect, useState } from 'react';
import { api, uploadUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function VideoLectures() {
  const { isTeacher } = useAuth();
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({ class: '', title: '', desc: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const rows = await api('/videos');
    setVideos(rows);
  };

  useEffect(() => {
    load().catch(() => setMessage('Could not load videos.'));
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
      setMessage('Upload successful.');
      await load();
    } catch (err) {
      const map = { empty: 'Fill all fields and select a video.', notmp4: 'Only MP4 videos are allowed.' };
      setMessage(map[err.code] || 'Upload failed.');
    }
  };

  return (
    <div className="mid">
      <p className="texttitle">Video Lectures</p>
      {message && <p className="form-error">{message}</p>}
      {isTeacher && (
        <form onSubmit={upload} encType="multipart/form-data">
          <div className="uploadvid">
            <input type="text" name="class" placeholder="Which class is it recommended??" value={form.class} onChange={onChange} />
            <br />
            <input type="text" name="title" placeholder="Topic of video??" value={form.title} onChange={onChange} />
            <br />
            <input type="text" name="desc" placeholder="short Description" value={form.desc} onChange={onChange} />
            <br />
            <label htmlFor="video-file">
              <span className="glyphicon glyphicon-folder-open" style={{ marginBottom: 5, cursor: 'pointer', fontSize: 30 }} aria-hidden="true">
                Select Video
              </span>
              <input type="file" name="file" id="video-file" style={{ display: 'none' }} accept="video/mp4" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
            <br />
            <button type="submit" name="submit">
              Upload <i className="fas fa-cloud-upload-alt" />
            </button>
          </div>
        </form>
      )}
      <div className="gallery-container" style={{ marginLeft: 250 }}>
        {videos.map((row) => (
          <div key={row.videoid} style={{ margin: 5 }}>
            <video width="400" height="400" controls preload="metadata">
              <source src={uploadUrl(row.videofullname, 'video')} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            <h2>{row.videotitle}</h2>
            <h3>Description: {row.description}</h3>
            <h4>uploaded by : {row.uploadedby}</h4>
            <h5>For class: {row.recommended}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}
