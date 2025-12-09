# 🚀 Deploying to Vercel

Vercel is a great hosting platform that's perfect for this project! It offers:
- **Fast global CDN** - Your site loads instantly worldwide
- **Serverless Functions** - Auto-update data without GitHub Actions
- **Easy deployment** - Connect your GitHub repo and auto-deploy
- **Free tier** - Includes everything you need

## Quick Setup (5 minutes)

### Step 1: Install Vercel CLI (Optional but helpful)

```bash
npm install -g vercel
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Rooted RSVP Tracker - Vercel Edition"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git
git push -u origin main
```

### Step 3: Create Vercel Project

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign in or create account (use GitHub login)
3. Click "New Project"
4. Select your `rooted-api-grap` repository
5. Click "Import"
6. Click "Deploy"
7. Done! Your site is live!

**Option B: Using Vercel CLI**

```bash
vercel --prod
```

### Step 4: Set Up Environment Variables

1. Go to your Vercel project settings
2. Click "Environment Variables"
3. Add a new variable:
   - **Name:** `CRON_TOKEN`
   - **Value:** `your-secret-token-here` (any string you want)
   - Click "Save"

### Step 5: Set Up Auto-Updates (GitHub Actions)

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add these secrets:

   **Secret 1: `VERCEL_TOKEN`**
   - Get from: https://vercel.com/account/tokens
   - Click "Create Token"
   - Copy and paste the token

   **Secret 2: `VERCEL_URL`**
   - Get from your Vercel deployment
   - Format: `your-project.vercel.app`
   - Do NOT include `https://`

   **Secret 3: `CRON_TOKEN`**
   - Use the same value you set in Vercel environment variables

5. Click "Add secret" for each one

### Step 6: Enable GitHub Actions

1. Go to "Actions" tab
2. Click "I understand my workflows, go ahead and enable them"

That's it! Now:
- ✅ Your site is live on Vercel
- ✅ Data updates automatically every hour
- ✅ Changes deploy instantly when you push to GitHub
- ✅ Fast global CDN serving your site

## Your URLs

- **Site:** `https://your-project.vercel.app`
- **API (data):** `https://your-project.vercel.app/api/data`
- **API (update):** `https://your-project.vercel.app/api/update`

## How It Works

1. **Every hour:** GitHub Actions calls your Vercel update endpoint
2. **Endpoint fetches:** Current RSVP count from the API
3. **Data saves:** New point added to `data.json`
4. **Auto-commits:** Changes pushed back to GitHub
5. **Auto-deploys:** Vercel redeploys your site
6. **You see:** Updated graphs and predictions!

## Troubleshooting

### Data not updating?

1. Check GitHub Actions (Actions tab) for errors
2. Verify environment variables are set in Vercel
3. Check that `CRON_TOKEN` matches in both places
4. Try manually triggering: Go to Actions → "Update RSVP Data via Vercel Cron" → "Run workflow"

### Site not deploying?

1. Check Vercel deployment logs
2. Make sure `vercel.json` exists
3. Verify GitHub connection in Vercel settings
4. Try pushing a change to main branch

### Getting "Unauthorized" error?

1. Check that `CRON_TOKEN` environment variable is set in Vercel
2. Verify the GitHub secret matches
3. Make sure the workflow is using the correct token name

## Customization

### Change Update Frequency

Edit `.github/workflows/cron-update.yml`:

```yaml
on:
  schedule:
    - cron: '0 * * * *'  # Every hour (current)
    # - cron: '*/30 * * * *'  # Every 30 minutes
    # - cron: '0 0 * * *'  # Once per day
```

### Custom Domain

1. In Vercel project settings
2. Click "Domains"
3. Add your custom domain (e.g., rsvp.yourdomain.com)
4. Follow DNS setup instructions

## Advantages over GitHub Pages

- ⚡ Faster (global CDN)
- 🔄 Easier data updates (native API support)
- 🎯 Built-in serverless functions
- 📊 Better analytics
- 🔒 Environment variables support
- 🚀 Preview deployments for branches

## Next Steps

1. Deploy to Vercel
2. Set up environment variables
3. Configure GitHub Actions
4. Wait 1 hour for first auto-update
5. Or manually trigger the workflow
6. Watch your site update automatically!

---

**Your live URL:** `https://your-project.vercel.app` (replace with actual)

Enjoy your automated RSVP tracker! 🌱
