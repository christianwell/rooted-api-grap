# ⚡ Vercel Setup - 5 Minutes

## Step 1: Push to GitHub (1 min)

```bash
cd /home/christian/vscode/rooted-api-grap
git init
git add .
git commit -m "Rooted RSVP Tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 2: Deploy to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select your `rooted-api-grap` repository
5. Click **"Import"**
6. Click **"Deploy"**
7. ✅ **Done!** Your site is live at `https://your-project.vercel.app`

## Step 3: Enable Auto-Updates (2 min)

### A. Set Environment Variable in Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `CRON_TOKEN`
   - **Value:** `your-secret-token-123` (any random string)
   - Click **"Save"**

### B. Set GitHub Secrets

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Add these 3 secrets:

   **Secret 1:**
   - Name: `VERCEL_TOKEN`
   - Value: Get from https://vercel.com/account/tokens (click "Create Token", copy it)

   **Secret 2:**
   - Name: `VERCEL_ORG_ID`
   - Value: Your Vercel org ID (visible in project URL or Vercel settings)

   **Secret 3:**
   - Name: `CRON_TOKEN`
   - Value: Same as the Vercel environment variable above

### C. Enable GitHub Actions

1. Go to **Actions** tab in GitHub
2. Click **"I understand my workflows, go ahead and enable them"**

## ✅ Done!

Now your site:
- ✅ Is live at `https://your-project.vercel.app`
- ✅ Updates data every 1 minute via GitHub Actions
- ✅ Auto-deploys when you push changes
- ✅ Has a global CDN (super fast!)

## How It Works

1. **Every 1 minute:** GitHub Actions calls your Vercel update endpoint
2. **Endpoint:** Fetches RSVP count and saves to `data.json`
3. **Auto-commit:** Changes are pushed to GitHub
4. **Auto-deploy:** Vercel redeploys your site
5. **Live:** You see updated data instantly!

## Test It

1. Wait 1-2 minutes after enabling Actions
2. Check your GitHub repo → **Actions** tab
3. You should see "Update RSVP Data" workflow running
4. Once complete, visit your Vercel URL
5. Check the RSVP count and timestamps

## Your URLs

- **Site:** `https://your-project.vercel.app`
- **GitHub:** `https://github.com/YOUR-USERNAME/rooted-api-grap`

## Troubleshooting

**Actions not running?**
- Make sure you enabled workflows
- Check Actions tab for errors

**Data not updating?**
- Verify environment variables are set correctly
- Check if `CRON_TOKEN` matches in both Vercel and GitHub

**Need help?**
- See `HOW_UPDATES_WORK.md`
- See `VERCEL_DEPLOY.md`

---

**That's it! Your tracker is now live and auto-updating every minute! 🚀**
