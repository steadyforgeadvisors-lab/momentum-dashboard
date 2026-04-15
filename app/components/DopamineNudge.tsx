"use client";
import { useEffect } from "react";

interface DopamineNudgeProps {
  show: boolean;
  onDone: () => void;
}

export default function DopamineNudge({ show, onDone }: DopamineNudgeProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
      <div className="animate-bounce text-center">
        <div className="text-6xl mb-3">✅</div>
        <div className="text-2xl font-bold text-emerald-400 font-mono">+100 XP</div>
        <div className="text-sm text-slate-400 mt-2">Momentum building...</div>
      </div>
    </div>
  );
}
