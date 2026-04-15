"use client";
import { useEffect, useState } from "react";

interface TimeVisualizerProps {
  startedAt?: string;
}

export default function TimeVisualizer({ startedAt }: TimeVisualizerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const start = new Date(startedAt).getTime();
      setElapsed(Math.floor((now - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  if (!startedAt) return null;

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;

  return (
    <div className="text-xs text-cyan-400/70 font-mono mt-1">
      {mins}m {secs}s elapsed
    </div>
  );
}
