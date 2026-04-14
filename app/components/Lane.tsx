"use client";
import { Task } from "@/lib/tasks";
import TaskCard from "./TaskCard";

interface LaneProps {
  tasks: Task[];
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Lane({ tasks, onStart, onComplete, onDelete }: LaneProps) {
  const captured = tasks.filter(t => t.status === "captured");
  const active = tasks.filter(t => t.status === "doing" || t.status === "done");
  const totalXP = tasks.filter(t => t.status === "done").reduce((sum, t) => sum + t.xp, 0);

  return (
    <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0 p-4 overflow-hidden">
      {/* Left — Captured */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest">
            ⚡ Captured ({captured.length})
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {captured.length === 0 && (
            <p className="text-slate-700 text-sm font-mono text-center mt-10">
              Brain empty. Type something above ↑
            </p>
          )}
          {captured.map(task => (
            <TaskCard key={task.id} task={task} onStart={onStart} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-slate-800 shrink-0" />

      {/* Right — Doing / Done */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-400 text-xs font-mono uppercase tracking-widest">
            🎯 Doing / Done ({active.length})
          </h2>
          {totalXP > 0 && (
            <span className="text-cyan-400 text-xs font-mono font-bold">+{totalXP} XP</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {active.length === 0 && (
            <p className="text-slate-700 text-sm font-mono text-center mt-10">
              Nothing in motion. Hit Start on a task ↑
            </p>
          )}
          {active.map(task => (
            <TaskCard key={task.id} task={task} onStart={onStart} onComplete={onComplete} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
