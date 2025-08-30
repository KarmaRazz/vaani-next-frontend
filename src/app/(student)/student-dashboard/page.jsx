"use client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const MyNotes = dynamic(() => import("./_sections/MyNotes"), { ssr: false });
const ProfileInfo = dynamic(() => import("./_sections/ProfileInfo"), { ssr: false });

export default function StudentDashboardPage() {
  const sp = useSearchParams();
  const view = sp.get("view") || "notes";

  if (view === "profile") return <ProfileInfo />;
  return <MyNotes />;
}

