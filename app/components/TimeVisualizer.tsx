"use client";
import { useEffect, useState } from "react";

interface TimeVisualizerProps {
  startedAt: string | null;
  estimatedMinutes?: number;
}

export default function TimeVisualizer({ startedAt, estimatedMinutes = 25 }: TimeVisualizerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => {
      const ms = Date.now() - new Date(startedAt).getTime();
      setElapsed(Math.floor(ms / 60000));
    }, 10000);
    setElapsed(Math.floor((Date.now() - new Date(startedAt).getTime()) / 60000));
    return () => clearInterval(interval);
  }, [startedAt]);

  if (!startedAt) return null;

  const pct = Math.min(elapsed / estimatedMinutes, 1);
  const bars = 10;
  const filled = Math.round(pct * bars);
  const bar = "▓".repeat(filled) + "░".repeat(bars - filled);
  const color = pct < 0.6 ? "text-cyan-400" : pct < 0.9 ? "text-yellow-400" : "text-red-400";

  return (
    <div className={`text-xs font-mono mt-1 ${color}`}>
      $[{bar}]$ {elapsed}m / {estimatedMinutes}m
    </div>
  );
}