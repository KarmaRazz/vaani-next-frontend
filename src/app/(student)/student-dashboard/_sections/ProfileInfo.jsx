"use client";
import { useEffect, useMemo, useState } from "react";
import { get } from "../../../../lib/api";
import { listItems } from "../../../../lib/studentStore";

export default function ProfileInfo() {
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

  const notesCount = useMemo(() => (me?.id ? listItems(me.id).length : 0), [me]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border p-6">
        <h2 className="text-2xl font-bold mb-4">Profile Info</h2>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vaani-primary to-vaani-accent text-white grid place-items-center text-2xl font-semibold">
            {((me?.firstName || me?.name || "S")[0] || "S").toUpperCase()}
          </div>
          <div>
            <p className="text-2xl font-bold">{me?.firstName ? `${me.firstName} ${me?.lastName || ""}`.trim() : (me?.name || "Student Member")}</p>
            <p className="text-gray-600">{me?.email || "—"}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-gray-600">Notes Accessed</p>
            <p className="text-3xl font-extrabold">{notesCount}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-gray-600">Phone</p>
            <p className="text-xl font-semibold">{me?.phone || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
