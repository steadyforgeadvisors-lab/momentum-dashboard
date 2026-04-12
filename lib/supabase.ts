// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type Task = {
  id: string;
  user_id: string;
  title: string;
  status: "captured" | "doing" | "done";
  xp: number;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabase: SupabaseClient<any> | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSupabase(): SupabaseClient<any> {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars. See README.");
  _supabase = createClient(url, key);
  return _supabase;
}