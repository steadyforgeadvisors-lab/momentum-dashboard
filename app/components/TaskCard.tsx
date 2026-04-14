"use client";
import { Task } from "@/lib/tasks";
import TimeVisualizer from "./TimeVisualizer";

interface TaskCardProps {
  task: Task;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onStart, onComplete, onDelete }: TaskCardProps) {
  const isDone = task.status === "done";
  const isDoing = task.status === "doing";

  return (
    <div className={`group relative rounded-xl border p-3 mb-2 transition-all duration-200 ${
      isDone
        ? "border-slate-700 bg-slate-900/50 opacity-50"
        : isDoing
        ? "border-cyan-400/50 bg-slate-800 shadow-lg shadow-cyan-400/10"
        : "border-slate-700 bg-slate-900 hover:border-slate-600"
    }`}>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm font-mono leading-snug flex-1 ${
          isDone ? "line-through text-slate-500" : "text-slate-200"
        }`}>
          {isDoing && <span className="text-cyan-400 mr-1">▶</span>}
          {task.title}
        </p>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          {!isDoing && !isDone && (
            <button
              onClick={() => onStart(task.id)}
              className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-0.5 border border-cyan-400/40 rounded-md"
            >
              Start
            </button>
          )}
          {isDoing && (
            <button
              onClick={() => onComplete(task.id)}
              className="text-xs text-green-400 hover:text-green-300 px-2 py-0.5 border border-green-400/40 rounded-md"
            >
              Done ✓
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs text-slate-600 hover:text-red-400 px-1.5 py-0.5 rounded-md"
          >
            ✕
          </button>
        </div>
      </div>
      <TimeVisualizer startedAt={task.started_at} />
    </div>
  );
}
