"use client";
import { useEffect, useMemo, useState } from "react";
import { get } from "../../../../lib/api";
import subjects from "../../../../data/subjects.json";
import catalog from "../../../../data/notes.json";
import { listItems, removeItem } from "../../../../lib/studentStore";
import StudentNoteRow from "../_components/StudentNoteRow";
import EmptyState from "../_components/EmptyState";

export default function MyNotes() {
  const [me, setMe] = useState(null);
  const [tab, setTab] = useState("note"); // 'note' | 'formula-derivation'
  const [subjectId, setSubjectId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/auth/me");
        setMe(data || null);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const collectionIds = useMemo(() => (me?.id ? listItems(me.id).map(i => i.noteId) : []), [me]);
  const onlyFormFD = tab !== "note";
  const typeSet = onlyFormFD ? ["formula", "derivation"] : ["note"];

  const items = useMemo(() => {
    const all = catalog.filter(n => collectionIds.includes(n.id));
    const typed = all.filter(n => typeSet.includes(n.type));
    return subjectId ? typed.filter(n => n.subjectId === subjectId) : typed;
  }, [collectionIds, subjectId, typeSet]);

  const grouped = useMemo(() => {
    const g = new Map();
    for (const it of items) {
      const key = it.subjectId;
      if (!g.has(key)) g.set(key, []);
      g.get(key).push(it);
    }
    return Array.from(g.entries()).map(([sid, arr]) => ({
      subjectId: sid,
      subjectName: subjects.find(s => s.id === sid)?.name || "Subject",
      items: arr
    }));
  }, [items]);

  const onRemove = (noteId) => {
    if (!me?.id) return;
    if (!confirm("Remove this item from your dashboard?")) return;
    removeItem(me.id, noteId);
    // Trigger rerender by updating a dummy state (or rely on effect deps)
    setSubjectId((prev) => prev);
  };

  return (
    <div className="space-y-6">
      {/* tabs */}
      <div className="flex items-center gap-3">
        <button
          className={`px-4 py-2 rounded-xl border ${tab==='note' ? 'border-black' : 'border-gray-300'}`}
          onClick={()=>setTab("note")}
        >
          Notes
        </button>
        <button
          className={`px-4 py-2 rounded-xl border ${tab!=='note' ? 'border-black' : 'border-gray-300'}`}
          onClick={()=>setTab("formula-derivation")}
        >
          Formulas & Derivations
        </button>
      </div>

      {/* subject chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={()=>setSubjectId(null)}
          className={`px-3 py-1.5 rounded ${subjectId===null ? 'bg-vaani-primary text-white' : 'bg-gray-100'}`}
        >
          All
        </button>
        {subjects.map(s => (
          <button
            key={s.id}
            onClick={()=>setSubjectId(s.id)}
            className={`px-3 py-1.5 rounded ${subjectId===s.id ? 'bg-vaani-primary text-white' : 'bg-gray-100'}`}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* content */}
      {items.length === 0 ? (
        <EmptyState type={tab === "note" ? "note" : "formula"} />
      ) : (
        grouped.map(group => (
          <div key={group.subjectId} className="space-y-3">
            <h3 className="text-xl font-bold mt-4">{group.subjectName}</h3>
            {group.items.map(it => (
              <StudentNoteRow key={it.id} item={it} onRemove={() => onRemove(it.id)} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
