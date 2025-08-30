"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { get } from "../../../..//lib/api"; // adjust if your api.js exports differ

export default function DashboardHeader() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await get("/auth/me");
        setMe(data || null);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-[#FFF2EA] border-b">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold">Hi, {me?.firstName || me?.name || "Student"}</h1>
          <p className="text-gray-600 -mt-1">Manage your learning journey</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="btn-ghost">🏠 Home</Link>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vaani-primary to-vaani-accent text-white grid place-items-center font-semibold">
            {((me?.firstName || me?.name || "S")[0] || "S").toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
