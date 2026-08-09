const API_BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('token');
}

export async function api(path, options = {}) {
  const headers = { ...options.headers };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type');
  const data = contentType?.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    const err = new Error(data?.message || data?.error || 'Request failed');
    err.status = res.status;
    err.code = data?.error;
    throw err;
  }
  return data;
}

export function uploadUrl(filename, type = 'image') {
  const folder = type === 'video' ? 'video' : 'image';
  return `/uploads/${folder}/${filename}`;
}
