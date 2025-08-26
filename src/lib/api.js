// lib/api.js
// Lightweight client for the Vaani backend
// Uses cookie-based auth: credentials: 'include'

export const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const withBase = (path) => `${API_URL}${path}`; // path should start with /api

async function fetchJSON(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(withBase(path), {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    credentials: 'include',
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!res.ok) {
    const error = new Error(data?.message || `Request failed (${res.status})`);
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
}

export const AuthAPI = {
  // Accept email OR 10-digit phone in the single "identifier" field.
  // Backend should accept either {email, password} OR {phoneNumber, password}.
  login: (identifier, password) => {
    const body = identifier.includes('@')
      ? { email: identifier, password }
      : { phoneNumber: identifier, password };
    return fetchJSON('/api/auth/login', { method: 'POST', body });
  },

  // Map signup UI -> backend payload (name + username derived)
  signup: ({ firstName, lastName, email, phone, password }) => {
    const name = `${firstName} ${lastName}`.trim();
    const username = (email?.split('@')[0] || `${firstName}${lastName}` || 'user').toLowerCase();
    const body = { name, email, username, password, phoneNumber: phone || undefined };
    return fetchJSON('/api/auth/signup', { method: 'POST', body });
  },

  me:    () => fetchJSON('/api/auth/me'),
  logout: () => fetchJSON('/api/auth/logout', { method: 'POST' }),
};
