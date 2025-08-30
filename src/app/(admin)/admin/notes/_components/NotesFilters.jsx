"use client";
export default function NotesFilters({ q, setQ, goal, setGoal, subjectId, setSubjectId, subjects }) {
  return (
    <div className="card p-4 mt-4">
      <div className="grid md:grid-cols-3 gap-4">
        <input className="input" placeholder="Search by title or subject..."
               value={q} onChange={e=>setQ(e.target.value)} />

        <select className="input" value={goal} onChange={e=>setGoal(e.target.value)}>
          <option value="cee">All Goals: CEE</option>
        </select>

        <select className="input" value={subjectId ?? ""} onChange={e=>setSubjectId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">All Subjects</option>
          {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>
    </div>
  );
}
