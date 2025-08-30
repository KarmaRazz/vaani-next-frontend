"use client";
import DashboardHeader from "./_components/DashboardHeader";
import DashboardSidebar from "./_components/DashboardSidebar";

export default function StudentLayout({ children }) {
  return (
    <div className="student-shell min-h-screen w-full grid grid-cols-1 md:grid-cols-[260px_minmax(0,1fr)] bg-[#FFF9F5]">
      <aside className="border-r bg-white md:sticky md:top-0 md:h-screen overflow-y-auto">
        <DashboardSidebar />
      </aside>
      <div className="min-w-0 h-full overflow-y-auto">
        <DashboardHeader />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
