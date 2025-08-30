"use client";
import { useEffect, useState } from "react";

export default function NoteFormModal({ initial, onClose, onSave, goal, subjects }) {
  const [form, setForm] = useState({
    id: null,
    title: "",
    type: "note",
    subjectId: subjects[0]?.id || null,
    goalSlugs: [goal],
    price: 0,
    sheetLink: "",
    isPublished: true
  });

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const set = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title?.trim()) return alert("Title is required");
    if (!form.subjectId) return alert("Subject is required");
    if (!form.sheetLink?.trim()) return alert("Google Drive link is required");
    onSave({ ...form });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="card w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 btn-ghost">✕</button>
        <h3 className="text-xl font-semibold mb-4">{form.id?'Edit Note':'Create New Note'}</h3>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input className="input" value={form.title} onChange={e=>set('title', e.target.value)} />
          </div>

          <div>
            <label className="label">Type</label>
            <select className="input" value={form.type} onChange={e=>set('type', e.target.value)}>
              <option value="note">Note</option>
              <option value="formula">Formula</option>
              <option value="derivation">Derivation</option>
            </select>
          </div>

          <div>
            <label className="label">Subject</label>
            <select className="input" value={form.subjectId ?? ''} onChange={e=>set('subjectId', Number(e.target.value))}>
              {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Goal Tags</label>
            <div className="flex gap-2">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.goalSlugs.includes('cee')}
                       onChange={(e)=> set('goalSlugs', e.target.checked ? Array.from(new Set([...form.goalSlugs,'cee'])) : form.goalSlugs.filter(x=>x!=='cee'))} />
                CEE
              </label>
              {/* add more when new goals exist */}
            </div>
          </div>

          <div>
            <label className="label">Price</label>
            <input className="input" type="number" min={0}
                   value={form.price} onChange={e=>set('price', Number(e.target.value))} placeholder="0 for Free" />
          </div>

          <div>
            <label className="label">Google Drive View-Only Link</label>
            <input className="input" value={form.sheetLink} onChange={e=>set('sheetLink', e.target.value)} placeholder="https://drive.google.com/..." />
          </div>

          <label className="inline-flex items-center gap-2">
            <input type="checkbox" checked={form.isPublished} onChange={e=>set('isPublished', e.target.checked)} />
            Publish immediately (visible on website)
          </label>

          <div className="pt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button className="btn-primary">{form.id?'Save Changes':'Create Note'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
