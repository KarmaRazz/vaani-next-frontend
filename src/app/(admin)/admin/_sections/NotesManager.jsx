"use client";
import { useMemo, useState } from "react";
import goals from "../../../../data/goals.json";
import subjects from "../../../../data/subjects.json";
import seed from "../../../../data/notes.json";
import NoteFormModal from "../notes/_components/NoteFormModal";
import NotesTable from "../notes/_components/NotesTable";
import NotesFilters from "../notes/_components/NotesFilters";

export default function NotesManager() {
  const [tab, setTab] = useState("note"); // 'note' | 'formula-derivation'
  const [q, setQ] = useState("");
  const [goal, setGoal] = useState("cee");
  const [subjectId, setSubjectId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [rows, setRows] = useState(seed);

  const typeSet = tab === "note" ? ["note"] : ["formula", "derivation"];
  const subjectName = (id) => subjects.find(s => s.id === id)?.name || "—";
  const byGoalSubjects = subjects.filter(s => goals.find(g => g.slug === goal)?.id === s.goalId);

  const list = useMemo(() =>
    rows
      .filter(r => typeSet.includes(r.type))
      .filter(r => r.goalSlugs?.includes(goal))
      .filter(r => (subjectId ? r.subjectId === subjectId : true))
      .filter(r => (q ? r.title.toLowerCase().includes(q.toLowerCase()) || subjectName(r.subjectId).toLowerCase().includes(q.toLowerCase()) : true)),
    [rows, typeSet, goal, subjectId, q]
  );

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (row) => { setEditing(row); setModalOpen(true); };
  const upsert = (payload) => setRows(prev => (payload.id ? prev.map(r => r.id===payload.id?payload:r) : [{ ...payload, id: Math.max(0,...prev.map(r=>r.id||0))+1, createdAt:new Date().toISOString() }, ...prev]));
  const remove = (id) => setRows(prev => prev.filter(r => r.id !== id));

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notes Management</h1>
        <p className="text-gray-600">Manage notes, formulas and derivations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button className={`btn-ghost ${tab==='note'?'!bg-gray-200':''}`} onClick={()=>setTab('note')}>Notes</button>
        <button className={`btn-ghost ${tab!=='note'?'!bg-gray-200':''}`} onClick={()=>setTab('formula-derivation')}>Formulas & Derivations</button>
        <div className="flex-1" />
        <button className="btn-primary" onClick={openCreate}>Create Note</button>
      </div>

      {/* Filters */}
      <NotesFilters
        q={q} setQ={setQ}
        goal={goal} setGoal={(g)=>{ setGoal(g); setSubjectId(null); }}
        subjectId={subjectId} setSubjectId={setSubjectId}
        subjects={byGoalSubjects}
      />

      {/* Table */}
      <NotesTable rows={list} subjectName={subjectName} onEdit={openEdit} onDelete={remove} />

      {/* Modal */}
      {modalOpen && (
        <NoteFormModal
          initial={editing}
          onClose={()=>setModalOpen(false)}
          onSave={(data)=>{ upsert(data); setModalOpen(false); }}
          goal={goal}
          subjects={byGoalSubjects}
        />
      )}
    </>
  );
}
