export type Task = {
  id: string;
  title: string;
  status: "captured" | "doing" | "done";
  xp: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
};

const KEY = "momentum_tasks";

export function loadTasks(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

export function makeTask(title: string): Task {
  return {
    id: crypto.randomUUID(),
    title,
    status: "captured",
    xp: 100,
    created_at: new Date().toISOString(),
    started_at: null,
    completed_at: null,
  };
}
