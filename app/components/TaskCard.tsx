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
    <div
      className={`group relative rounded-lg border p-3 transition-all duration-200 ${
        isDone
          ? "border-slate-800 bg-slate-800/20 opacity-60"
          : isDoing
          ? "border-cyan-400/40 bg-cyan-400/5 shadow-lg shadow-cyan-400/5 ring-1 ring-cyan-400/10"
          : "border-slate-700/50 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/60"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0 pt-0.5">
          <p
            className={`text-sm font-medium leading-snug break-words ${
              isDone ? "line-through text-slate-600" : "text-slate-200"
            }`}
          >
            {isDoing && <span className="inline-block mr-1.5 text-cyan-400">▶</span>}
            {task.title}
          </p>
          {isDoing && task.started_at && <TimeVisualizer startedAt={task.started_at} />}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 flex-wrap justify-end">
          {!isDoing && !isDone && (
            <button
              onClick={() => onStart(task.id)}
              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 px-2.5 py-1 border border-cyan-400/40 hover:border-cyan-400/60 bg-cyan-400/5 hover:bg-cyan-400/10 rounded-md transition-all duration-150"
            >
              Start
            </button>
          )}
          {isDoing && (
            <button
              onClick={() => onComplete(task.id)}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 px-2.5 py-1 border border-emerald-400/40 hover:border-emerald-400/60 bg-emerald-400/5 hover:bg-emerald-400/10 rounded-md transition-all duration-150"
            >
              Done
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs font-medium text-slate-500 hover:text-red-400 px-1.5 py-1 hover:bg-red-400/10 rounded-md transition-all duration-150"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
