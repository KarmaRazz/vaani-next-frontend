"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientShell({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isStudent = pathname.startsWith("/student-dashboard");

  if (isAdmin || isStudent) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
