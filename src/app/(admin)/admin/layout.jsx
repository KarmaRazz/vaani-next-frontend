"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AdminLayout({ children }) {
  const sp = useSearchParams();
  const view = sp.get("view") || "overview";

  return (
    <div className="admin-shell min-h-screen w-full grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] bg-white">
      <aside className="border-r bg-gray-50 md:sticky md:top-0 md:h-screen overflow-y-auto">
        <div className="p-4">
          <p className="font-semibold text-vaani-primary">Vaani Admin</p>
          <nav className="mt-4 space-y-1 text-sm">
            <Link href="/admin?view=overview"
              className={`block rounded px-3 py-2 hover:bg-gray-100 ${view==='overview'?'bg-gray-200 font-medium':''}`}>
              Overview
            </Link>
            <Link href="/admin?view=notes"
              className={`block rounded px-3 py-2 hover:bg-gray-100 ${view==='notes'?'bg-gray-200 font-medium':''}`}>
              Notes
            </Link>
          </nav>
        </div>
      </aside>
      <div className="min-w-0 h-full overflow-y-auto p-4 md:p-6">{children}</div>
    </div>
  );
}
