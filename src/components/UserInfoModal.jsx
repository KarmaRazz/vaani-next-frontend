"use client";

import { useState } from "react";
import { AuthAPI } from "../lib/api";
import Link from "next/link";

export default function UserInfoModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);

  const openAndFetch = async () => {
    setOpen(true);
    setLoading(true);
    setErr("");
    setUser(null);
    try {
      const res = await AuthAPI.me();          // expects { user: {...} } OR user object
      setUser(res?.user || res || null);
    } catch (e) {
      setErr(e?.status === 401 ? "Not logged in." : (e?.message || "Failed to load"));
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    setErr("");
    setUser(null);
  };

  return (
    <>
      {/* trigger button (temporary) */}
      <button onClick={openAndFetch} className="btn-ghost">
        Show my info (temp)
      </button>

      {/* modal */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="card w-full max-w-lg p-6 bg-white relative">
            <button onClick={close} className="absolute top-2 right-2 btn-ghost" aria-label="Close">✕</button>
            <h3 className="text-xl font-semibold mb-4">Your account</h3>

            {loading && <p>Loading…</p>}

            {!loading && err && (
              <div className="rounded-lg bg-red-50 text-red-700 px-3 py-2 text-sm">
                {err} {err === "Not logged in." && (<Link href="/login" className="underline ml-1">Log in</Link>)}
              </div>
            )}

            {!loading && !err && user && (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <span className="font-medium">Name</span><span className="col-span-2">{user.name}</span>
                  {user.username && (<><span className="font-medium">Username</span><span className="col-span-2">{user.username}</span></>)}
                  <span className="font-medium">Email</span><span className="col-span-2">{user.email}</span>
                  {user.phoneNumber && (<><span className="font-medium">Phone</span><span className="col-span-2">{user.phoneNumber}</span></>)}
                  {user.role && (<><span className="font-medium">Role</span><span className="col-span-2">{user.role}</span></>)}
                </div>

                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-600">Raw response</summary>
                  <pre className="mt-2 bg-gray-50 rounded-lg p-3 text-xs overflow-auto">
{JSON.stringify(user, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
