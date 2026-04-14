"use client";
import { useEffect, useState } from "react";

interface TimeVisualizerProps {
  startedAt: string | null;
}

export default function TimeVisualizer({ startedAt }: TimeVisualizerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => {
      const ms = Date.now() - new Date(startedAt).getTime();
      setElapsed(Math.min(ms / 1000, 3600)); // cap at 1 hour
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, [startedAt]);

  if (!startedAt) return null;

  const pct = Math.min(elapsed / 3600, 1);
  const filled = Math.round(pct * 10);
  const bar = "▓".repeat(filled) + "░".repeat(10 - filled);
  const mins = Math.floor(elapsed / 60);

  return (
    <div className="mt-2 font-mono text-xs text-slate-500">
      <span className="text-cyan-600">$[</span>
      <span className="text-cyan-400">{bar}</span>
      <span className="text-cyan-600">]$</span>
      <span className="ml-2 text-slate-600">{mins}m</span>
    </div>
  );
}
