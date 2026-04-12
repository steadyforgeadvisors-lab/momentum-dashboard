"use client";
import { useEffect, useState } from "react";

const messages = [
  "✅ NICE! +100 XP",
  "🔥 ON FIRE! +100 XP",
  "⚡ LOCKED IN! +100 XP",
  "💪 CRUSHED IT! +100 XP",
  "🎯 BULLS-EYE! +100 XP",
];

export default function DopamineNudge({ show, onDone }: { show: boolean; onDone: () => void }) {
  const [msg] = useState(() => messages[Math.floor(Math.random() * messages.length)]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-bounce text-4xl font-black text-cyan-400 bg-slate-900 border-2 border-cyan-400 rounded-2xl px-10 py-6 shadow-2xl shadow-cyan-400/30">
        {msg}
      </div>
    </div>
  );
}