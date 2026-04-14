"use client";
import { useEffect } from "react";

interface DopamineNudgeProps {
  show: boolean;
  onDone: () => void;
}

export default function DopamineNudge({ show, onDone }: DopamineNudgeProps) {
  useEffect(() => {
    if (show) {
      const id = setTimeout(onDone, 2000);
      return () => clearTimeout(id);
    }
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="animate-bounce text-center">
        <div className="text-5xl mb-2">✅</div>
        <div className="text-cyan-400 font-black text-2xl font-mono tracking-tight">NICE! +100 XP</div>
      </div>
    </div>
  );
}
