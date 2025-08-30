"use client";
import { useRef } from "react";
import NoteCard from "./NoteCard";

export default function NotesCarousel({ items=[], onAdd }) {
  const ref = useRef(null);
  const scrollBy = (dx) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <div className="relative">
      <button aria-label="Prev" onClick={() => scrollBy(-320)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full">‹</button>
      <div ref={ref} className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-2">
        {items.map(n => (
          <div key={n.id} className="min-w-[280px] max-w-[280px]">
            <NoteCard item={n} onAdd={onAdd} />
          </div>
        ))}
      </div>
      <button aria-label="Next" onClick={() => scrollBy(320)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn-ghost rounded-full">›</button>
    </div>
  );
}
