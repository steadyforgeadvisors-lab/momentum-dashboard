"use client";
import { useEffect, useState, useCallback } from "react";
import { Task, loadTasks, saveTasks, makeTask } from "@/lib/tasks";
import Chute from "./components/Chute";
import Lane from "./components/Lane";
import DopamineNudge from "./components/DopamineNudge";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showNudge, setShowNudge] = useState(false);
  const [ready, setReady] = useState(false);

  // Load from localStorage after hydration
  useEffect(() => {
    setTasks(loadTasks());
    setReady(true);
  }, []);

  // Persist whenever tasks change
  useEffect(() => {
    if (ready) saveTasks(tasks);
  }, [tasks, ready]);

  const capture = useCallback((title: string) => {
    setTasks(prev => [makeTask(title), ...prev]);
  }, []);

  const startTask = useCallback((id: string) => {
    const now = new Date().toISOString();
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: "doing" as const, started_at: now } : t
    ));
  }, []);

  const completeTask = useCallback((id: string) => {
    const now = new Date().toISOString();
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status: "done" as const, completed_at: now } : t
    ));
    setShowNudge(true);
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const totalXP = tasks.filter(t => t.status === "done").reduce((s, t) => s + t.xp, 0);

  if (!ready) return null;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between px-4 py-2 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-black text-lg tracking-tight">⚡ MOMENTUM</span>
          <span className="text-slate-600 text-xs font-mono">ADHD HUD v1.0</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-500">{tasks.filter(t => t.status !== "done").length} active</span>
          {totalXP > 0 && <span className="text-cyan-400 font-bold">+{totalXP} XP</span>}
        </div>
      </header>

      <Chute onCapture={capture} />

      <Lane
        tasks={tasks}
        onStart={startTask}
        onComplete={completeTask}
        onDelete={deleteTask}
      />

      <DopamineNudge show={showNudge} onDone={() => setShowNudge(false)} />
    </div>
  );
}
