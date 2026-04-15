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
  const doing = tasks.filter(t => t.status === "doing");
  const done = tasks.filter(t => t.status === "done");

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full flex flex-col lg:flex-row gap-6 p-6 overflow-hidden">
        {/* Column 1: Captured */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900/30 rounded-xl border border-slate-800/50 p-4">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">⚡ Inbox</h2>
            <div className="text-xs text-slate-500 mt-1">{captured.length} tasks</div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {captured.length === 0 ? (
              <p className="text-slate-600 text-sm text-center py-8">Ready to focus</p>
            ) : (
              captured.map(task => (
                <TaskCard key={task.id} task={task} onStart={onStart} onComplete={onComplete} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>

        {/* Column 2: Active */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900/30 rounded-xl border border-slate-800/50 p-4">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">🎯 Active</h2>
            <div className="text-xs text-slate-500 mt-1">{doing.length} in progress</div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {doing.length === 0 ? (
              <p className="text-slate-600 text-sm text-center py-8">Start a task</p>
            ) : (
              doing.map(task => (
                <TaskCard key={task.id} task={task} onStart={onStart} onComplete={onComplete} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>

        {/* Column 3: Done */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900/30 rounded-xl border border-slate-800/50 p-4">
          <div className="mb-4">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">✓ Done</h2>
            <div className="text-xs text-slate-500 mt-1">{done.length} completed</div>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {done.length === 0 ? (
              <p className="text-slate-600 text-sm text-center py-8">Complete a task</p>
            ) : (
              done.map(task => (
                <TaskCard key={task.id} task={task} onStart={onStart} onComplete={onComplete} onDelete={onDelete} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
