"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const NavItem = ({ href, active, icon, children }) => (
  <Link
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl mx-3 my-1 ${
      active ? "bg-vaani-primary text-white" : "hover:bg-gray-100"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{children}</span>
  </Link>
);

export default function DashboardSidebar() {
  const sp = useSearchParams();
  const view = sp.get("view") || "notes";

  return (
    <div className="p-4">
      <div className="px-3 py-2">
        <p className="text-vaani-primary font-bold text-lg">Student Panel</p>
      </div>
      <nav className="mt-2">
        <NavItem href="/student-dashboard?view=notes" active={view==="notes"} icon="📚">
          My Notes
        </NavItem>
        <NavItem href="/student-dashboard?view=profile" active={view==="profile"} icon="👤">
          Profile Info
        </NavItem>
        <div className="opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl mx-3 my-1">
            <span className="text-lg">📈</span>
            <span className="font-medium">Progress Tracker</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
