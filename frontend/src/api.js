// Small helper for calling the backend API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// api('POST', '/api/posts', data) -> parsed JSON, or throws an Error with a readable message
export async function api(method, path, data) {
  let res;
  try {
    res = await fetch(API_URL + path, {
      method,
      credentials: 'include', // send the session cookie
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined
    });
  } catch (e) {
    throw new Error('Cannot reach the server. Is the backend running?');
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error((body.errors || [body.error || 'Something went wrong']).join('. '));
    error.status = res.status;
    throw error;
  }
  return body;
}
