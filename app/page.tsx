"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { getSupabase, Task } from "@/lib/supabase";
import Chute from "./components/Chute";
import Lane from "./components/Lane";
import DopamineNudge from "./components/DopamineNudge";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!ready) return;
    const sb = getSupabase();
    sb.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUserId(data.session.user.id);
      } else {
        sb.auth.signInAnonymously().then(({ data }) => {
          setUserId(data.user?.id ?? null);
        });
      }
    });
  }, [ready]);

  useEffect(() => {
    if (!userId) return;
    const sb = getSupabase();
    sb.from("tasks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setTasks((data as Task[]) ?? []);
        setLoading(false);
      });
  }, [userId]);

  const capture = useCallback(async (title: string) => {
    if (!userId) return;
    const sb = getSupabase();
    const { data } = await sb.from("tasks").insert({
      title, status: "captured", xp: 100, user_id: userId,
    }).select().single();
    if (data) setTasks(prev => [data as Task, ...prev]);
  }, [userId]);

  const startTask = useCallback(async (id: string) => {
    const now = new Date().toISOString();
    await getSupabase().from("tasks").update({ status: "doing", started_at: now }).eq("id", id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "doing", started_at: now } : t));
  }, []);

  const completeTask = useCallback(async (id: string) => {
    const now = new Date().toISOString();
    await getSupabase().from("tasks").update({ status: "done", completed_at: now }).eq("id", id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "done", completed_at: now } : t));
    setShowNudge(true);
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await getSupabase().from("tasks").delete().eq("id", id);
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
          <span className="text-green-500 text-xs">● LIVE</span>
        </div>
      </header>

      <Chute onCapture={capture} />

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-slate-700 font-mono text-sm">
          Syncing with your brain...
        </div>
      ) : (
        <Lane tasks={tasks} onStart={startTask} onComplete={completeTask} onDelete={deleteTask} />
      )}

      <DopamineNudge show={showNudge} onDone={() => setShowNudge(false)} />
    </div>
  );
}