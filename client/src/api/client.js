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
  const body = contentType?.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    const message = body?.message || body?.error || 'Request failed';
    const err = new Error(message);
    err.status = res.status;
    err.data = body;
    throw err;
  }

  // Handle standard success envelope { success: true, data: ... }
  if (body && typeof body === 'object' && 'data' in body) {
    return body.data;
  }

  return body;
}

export function uploadUrl(filename, type = 'image') {
  const folder = type === 'video' ? 'videos' : 'images';
  return `/uploads/${folder}/${filename}`;
}
