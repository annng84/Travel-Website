# Metropolitan Heritage Society & Foundation Web Platform

A modern, responsive institutional website built with **React / Next-ready architecture**, **Tailwind CSS**, and **TypeScript**.

Featuring:
1. **Home**: Hero section with photography, Latin motto, core institutional pillars, and next upcoming event spotlight with live countdown.
2. **History**: Interactive chronological timeline and narrative story chapter views with primary archival document inspections, seals, and signatories dating back to 1888.
3. **Committee**: Leadership directory categorized by Executive Council, Standing Committees, and Trustees, with search, term filters, and full member dossiers.
4. **Events**: Calendar of upcoming convocations with interactive seat reservations, digital admission passes, Apple/Google calendar (.ics) exports, and past event recaps.
5. **Archive & Ingestion Hub**: Ingest custom PDFs, Word docs, photos, update leadership rosters, or customize brand color palettes in real-time with local storage persistence.

---

## 🚀 Immediate Deployment to GitHub & Vercel

This repository is pre-configured for **zero-configuration deployment on Vercel** using the included `vercel.json`.

### 1. Commit & Push to GitHub

```bash
git init
git add .
git commit -m "feat: complete heritage society platform with history, committee, events"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### 2. Deploy to Vercel (1-Click)

1. Go to [vercel.com/new](https://vercel.com/new).
2. Connect your GitHub account and import your repository.
3. Vercel automatically detects the Vite framework and root `vercel.json`.
4. Click **Deploy**. Your site will be live within 30 seconds with automatic HTTPS and CDN.

---

## 🛠 Local Development

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run preview
```
