"use client";
import { useMemo, useState } from "react";
import notesSeed from "../../data/notes.json";
import goals from "../../data/goals.json";
import subjects from "../../data/subjects.json";
import NoteCard from "../../components/notes/NoteCard";


export default function NotesPage() {
  const [goal, setGoal] = useState("cee"); // only CEE for now
  const [subjectId, setSubjectId] = useState(null);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("note"); // 'note' | 'formula-derivation'

  const list = useMemo(() => {
    const typeSet = tab === "note" ? ["note"] : ["formula", "derivation"];
    return notesSeed
      .filter(n => n.isPublished)
      .filter(n => n.goalSlugs?.includes(goal))
      .filter(n => (subjectId ? n.subjectId === subjectId : true))
      .filter(n => typeSet.includes(n.type))
      .filter(n => (q ? n.title.toLowerCase().includes(q.toLowerCase()) : true));
  }, [goal, subjectId, q, tab]);

  const byGoalSubjects = subjects.filter(s => goals.find(g => g.slug === goal)?.id === s.goalId);

  const addToDashboard = (item) => {
    // TODO: swap to POST /api/student/notes when backend is ready
    alert(`Added "${item.title}" to dashboard (placeholder).`);
  };

  return (
    <section className="section py-12">
      <h1 className="text-center text-3xl font-bold">Study Notes</h1>
      <p className="text-center text-gray-600 mt-2">Access comprehensive notes and formulas</p>

      {/* Goal filter (chips) */}
      <div className="mt-6 flex justify-center gap-3">
        {goals.map(g => (
          <button key={g.slug}
            className={`px-4 py-1.5 rounded-full border ${goal===g.slug ? 'bg-vaani-primary text-white border-transparent' : 'hover:bg-gray-50'}`}
            onClick={() => { setGoal(g.slug); setSubjectId(null); }}>
            {g.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative">
          <input className="input pl-10" placeholder="Search chapters, subjects, or goals..."
                 value={q} onChange={e=>setQ(e.target.value)} />
          <span className="absolute left-3 top-1/2 -translate-y-1/2">🔎</span>
        </div>
      </div>

      {/* Subject chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={()=>setSubjectId(null)}
          className={`px-3 py-1 rounded ${subjectId===null?'bg-vaani-primary text-white':'bg-gray-100'}`}>All</button>
        {byGoalSubjects.map(s => (
          <button key={s.id} onClick={()=>setSubjectId(s.id)}
            className={`px-3 py-1 rounded ${subjectId===s.id?'bg-vaani-primary text-white':'bg-gray-100'}`}>
            {s.name}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 justify-end">
        <button className={`btn-ghost ${tab==='note'?'!bg-gray-200':''}`} onClick={()=>setTab('note')}>Notes</button>
        <button className={`btn-ghost ${tab!=='note'?'!bg-gray-200':''}`} onClick={()=>setTab('formula-derivation')}>Formulas & Derivations</button>
      </div>

      {/* Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(item => (
          <NoteCard key={item.id} item={item} onAdd={addToDashboard} />
        ))}
        {list.length===0 && (
          <div className="col-span-full text-center text-gray-600 py-10">No notes match your filters.</div>
        )}
      </div>
    </section>
  );
}
