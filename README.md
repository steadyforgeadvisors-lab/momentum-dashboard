# ⚡ Momentum Dashboard — ADHD HUD

> Flat-capture. Focus. Dopamine. Your ADHD brain's command center.

A self-hosted, offline-first task dashboard built for how ADHD brains actually work.
Deploy your own instance in under 5 minutes. Your data, your Supabase, your rules.

---

## ✨ Features

- **The Chute** — Full-width capture input. Type anything. Hit `Enter`. It's captured.
- **The Lane** — 2-column HUD: Captured left, Doing/Done right.
- **Time Visualizer** — `$[▓▓▓▓▓░░░░░]$` — Visual time bar.
- **Dopamine Nudge** — `✅ NICE! +100 XP` — Animated celebration on every completion.
- **XP System** — Daily XP tracker so momentum feels real.
- **Offline-First PWA** — Works without internet. Install on phone like a native app.
- **Privacy-First** — All data stays in YOUR Supabase. Nothing shared.

---

## 🚀 Deploy in 5 Minutes

### Step 1 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) → Create a new project
2. Open **SQL Editor** → paste `supabase-schema.sql` → Run
3. Go to **Project Settings → API** → Copy `Project URL` and `anon public` key

### Step 2 — Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/steadyforgeadvisors-lab/momentum-dashboard&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Your+Supabase+project+URL+and+anon+key)

Or manually:
1. Fork/clone this repo
2. Import to [vercel.com](https://vercel.com)
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy ✅

### Step 3 — Install as PWA (Optional)

- **iPhone:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Menu → Add to Home Screen
- **Desktop:** Click install icon in browser address bar

---

## 🏗 Local Dev

```bash
git clone https://github.com/steadyforgeadvisors-lab/momentum-dashboard
cd momentum-dashboard
npm install
cp .env.example .env.local
# fill in .env.local
npm run dev
```

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (Postgres + Auth) |
| Styling | Tailwind CSS v4 |
| PWA | Service Worker (offline-first) |
| Deployment | Vercel (one-click) |

---

## 💰 License

MIT — Use it, sell it, fork it.

---

*Built for ADHD brains. By someone who gets it.*