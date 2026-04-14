# ⚡ Momentum Dashboard — ADHD HUD

> Flat-capture. Focus. Dopamine. Your ADHD brain's command center.

A **zero-config** task dashboard built for how ADHD brains actually work.
Deploy to Vercel in 60 seconds. No database setup. No accounts. Just works.

---

## ✨ Features

- **The Chute** — Full-width capture input. Type anything. Hit `Enter`. Done.
- **The Lane** — 2-column HUD: Captured → Doing → Done
- **Time Visualizer** — `$[▓▓▓▓▓░░░░░]$` Live timer bar for active tasks
- **Dopamine Nudge** — `✅ NICE! +100 XP` Animated celebration on every completion
- **XP Tracker** — Daily XP accumulates as you crush tasks
- **Offline-First PWA** — Works without internet. Installable on phone
- **Privacy-First** — All data stays in YOUR browser. Nothing sent anywhere

---

## 🚀 Deploy in 60 Seconds

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/steadyforgeadvisors-lab/momentum-dashboard)

1. Click the button above
2. Connect your GitHub
3. Click **Deploy** — no env vars needed
4. Done ✅

---

## 📱 Install as App (PWA)

- **iPhone:** Safari → Share → Add to Home Screen
- **Android:** Chrome → Menu → Add to Home Screen  
- **Desktop:** Click install icon in browser address bar

---

## 🏗 Local Development

```bash
git clone https://github.com/steadyforgeadvisors-lab/momentum-dashboard
cd momentum-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Storage | localStorage (browser-native) |
| PWA | Service Worker (offline-first) |
| Deploy | Vercel (one-click) |

---

## 💾 Data Storage

By default, all tasks are saved in your browser's `localStorage`. Your data never leaves your device.

**Want cloud sync across devices?** The optional `supabase-schema.sql` is included if you want to extend the app with Supabase.

---

## 📄 License

MIT — Use it, sell it, fork it.

---

*Built for ADHD brains. By someone who gets it.*
