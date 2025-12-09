# ⚡ Vercel Setup - Quick Start

## 1️⃣ Push to GitHub (2 min)

```bash
git init
git add .
git commit -m "Rooted RSVP Tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git
git push -u origin main
```

## 2️⃣ Deploy to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import" → "Deploy"
5. ✅ Done! Your site is live at `https://your-project.vercel.app`

## 3️⃣ Set Up Auto-Updates (1 min per item)

Go to your **Vercel project settings** → **Environment Variables**

Add:
- `CRON_TOKEN` = `your-secret-token` (anything you want)

Then go to **GitHub Settings** → **Secrets** and add:
- `VERCEL_TOKEN` (from https://vercel.com/account/tokens)
- `VERCEL_URL` = `your-project.vercel.app` (without https://)
- `CRON_TOKEN` = same as above

## 4️⃣ Enable Actions

Go to **GitHub** → **Actions** → Click to enable workflows

## ✅ Done!

- Your site is live ✓
- Data updates every hour ✓
- Changes auto-deploy ✓

**Site URL:** `https://your-project.vercel.app`

See `VERCEL_DEPLOY.md` for detailed setup & troubleshooting!
