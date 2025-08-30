"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Only load the big manager when requested
const NotesManagement = dynamic(() => import("./_sections/NotesManager"), {
  ssr: false,
});

function Overview() {
  return (
    <div className="p-2 md:p-0">
      <h1 className="text-3xl font-bold">Admin Overview</h1>
      <p className="text-gray-600 mt-2">
        Use the sidebar to open <strong>Notes</strong>. There you’ll find search,
        goal/subject filters, the <strong>Notes ↔ Formulas &amp; Derivations</strong> toggle,
        and the <strong>Create Note</strong> button.
      </p>
    </div>
  );
}

export default function AdminPage() {
  const sp = useSearchParams();
  const view = sp.get("view") || "overview";

  if (view === "notes") return <NotesManagement />;   // ✅ only here
  return <Overview />;                                // ✅ no cards here
}
