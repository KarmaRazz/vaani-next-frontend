"use client";
import Link from "next/link";

export default function EmptyState({ type }) {
  const isNotes = type === "note";
  return (
    <div className="text-center py-16 bg-white rounded-2xl border">
      <div className="text-6xl mb-4">{isNotes ? "📘" : "🧮"}</div>
      <p className="text-xl font-semibold">
        {isNotes ? "No notes added yet" : "No formulas added yet"}
      </p>
      <p className="text-gray-600 mt-1">
        Browse our library and add {isNotes ? "notes" : "formulas"} to build your collection.
      </p>
      <Link
        href={isNotes ? "/notes?tab=notes" : "/notes?tab=formulas"}
        className="btn-primary mt-6 inline-flex"
      >
        {isNotes ? "Browse Notes" : "Browse Formulas"}
      </Link>
    </div>
  );
}
