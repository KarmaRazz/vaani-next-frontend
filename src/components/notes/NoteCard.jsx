"use client";
import Link from "next/link";
import subjects from "../../data/subjects.json";
import goals from "../../data/goals.json";

const subjectName = (id) => subjects.find(s => s.id === id)?.name || "—";
const goalBadges = (slugs=[]) =>
  slugs.map(s => goals.find(g => g.slug === s)?.name || s);

export default function NoteCard({ item, onAdd }) {
  const price = (item.price || 0) > 0 ? `₹${item.price}` : "Free";
  const typeLabel = item.type === "note" ? "Note"
                  : item.type === "formula" ? "Formula"
                  : "Derivation";

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-start justify-between text-sm">
        <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5">{typeLabel}</span>
        <span className="text-gray-700">{price}</span>
      </div>

      <h3 className="mt-3 font-semibold">{item.title}</h3>
      <p className="mt-1 text-sm text-gray-600">{subjectName(item.subjectId)}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {goalBadges(item.goalSlugs).map((g, i) => (
          <span key={i} className="text-xs rounded-full bg-gray-100 px-2 py-0.5">{g}</span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <a href={item.sheetLink} target="_blank" rel="noreferrer" className="btn-ghost">View</a>
        <button onClick={() => onAdd?.(item)} className="btn-primary">Add to Dashboard</button>
      </div>
    </div>
  );
}
