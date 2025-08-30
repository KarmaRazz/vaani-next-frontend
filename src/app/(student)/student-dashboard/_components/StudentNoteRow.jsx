"use client";
import Link from "next/link";

export default function StudentNoteRow({ item, onRemove }) {
  const price = (item.price || 0) > 0 ? `₹${item.price}` : "Free";
  const typeLabel = item.type === "note" ? "Note" : item.type === "formula" ? "Formula" : "Derivation";

  return (
    <div className="bg-white rounded-xl border p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gray-100 grid place-items-center text-xl">📄</div>
        <div>
          <p className="font-semibold">{item.title}</p>
          <div className="mt-1 flex gap-2 text-xs">
            <span className="rounded-full bg-gray-100 px-2 py-0.5">{(item.goalSlugs || []).join(", ").toUpperCase()}</span>
            <span className="rounded-full bg-green-100 text-green-700 px-2 py-0.5">{price}</span>
            <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5">{typeLabel}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <a href={item.sheetLink} target="_blank" rel="noreferrer" className="btn-ghost">👁️ View</a>
        <button onClick={onRemove} className="btn-ghost text-red-600">🗑 Remove</button>
      </div>
    </div>
  );
}
