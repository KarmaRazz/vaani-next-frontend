// Simple localStorage-backed store until backend endpoints are ready.
// Keyed per user: vaani:student:<userId>:items
// Item: { noteId: number, addedAt: ISOString }

const canUseDom = () => typeof window !== "undefined";

const key = (userId) => `vaani:student:${userId}:items`;

export function listItems(userId) {
  if (!canUseDom() || !userId) return [];
  try {
    const raw = localStorage.getItem(key(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function hasItem(userId, noteId) {
  return listItems(userId).some((it) => it.noteId === noteId);
}

export function addItem(userId, noteId) {
  if (!canUseDom() || !userId || !noteId) return;
  const items = listItems(userId);
  if (items.find((i) => i.noteId === noteId)) return;
  items.push({ noteId, addedAt: new Date().toISOString() });
  localStorage.setItem(key(userId), JSON.stringify(items));
}

export function removeItem(userId, noteId) {
  if (!canUseDom() || !userId) return;
  const next = listItems(userId).filter((i) => i.noteId !== noteId);
  localStorage.setItem(key(userId), JSON.stringify(next));
}
