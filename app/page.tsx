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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-800/50 flex items-center justify-between shrink-0 bg-slate-900/40 backdrop-blur-sm">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">⚡ MOMENTUM</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">ADHD HUD • Real-time focus tracker</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-right">
            <div className="text-slate-400 text-xs">Tasks</div>
            <div className="text-lg font-bold text-cyan-400">{tasks.filter(t => t.status !== "done").length}</div>
          </div>
          {totalXP > 0 && (
            <div className="text-right">
              <div className="text-slate-400 text-xs">XP</div>
              <div className="text-lg font-bold text-emerald-400">+{totalXP}</div>
            </div>
          )}
        </div>
      </header>

      {/* Input Zone */}
      <Chute onCapture={capture} />

      {/* Main Lane */}
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
