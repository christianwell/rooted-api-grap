# 🚀 Deploying to GitHub Pages

Follow these steps to deploy your Rooted RSVP Tracker to GitHub Pages:

## Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Rooted RSVP Tracker"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under "Source":
   - Select branch: **main**
   - Select folder: **/ (root)**
   - Click **Save**

Your site will be available at: `https://YOUR-USERNAME.github.io/rooted-api-grap/`

## Step 3: Enable GitHub Actions

1. Go to the **Actions** tab in your repository
2. You'll see a message: "Workflows aren't being run on this forked repository"
3. Click **"I understand my workflows, go ahead and enable them"**

## Step 4: Configure the Workflow (Optional)

The workflow is set to run every hour. To change this:

1. Edit `.github/workflows/update-data.yml`
2. Modify the cron schedule:

```yaml
on:
  schedule:
    - cron: '0 * * * *'  # Every hour (current)
    # - cron: '*/30 * * * *'  # Every 30 minutes
    # - cron: '0 */3 * * *'  # Every 3 hours
    # - cron: '0 0 * * *'  # Once per day at midnight
```

## Step 5: Manual Trigger (Optional)

To immediately collect data:

1. Go to **Actions** tab
2. Click **"Update RSVP Data"** workflow
3. Click **"Run workflow"** button
4. Select **main** branch
5. Click **"Run workflow"**

## Step 6: Wait for Build

- GitHub Pages typically takes 1-2 minutes to build
- Check the **Actions** tab for progress
- Once complete, visit your site URL

## Troubleshooting

### GitHub Actions Not Running?

- Make sure Actions are enabled (see Step 3)
- Check the workflow file syntax is correct
- Verify your repository is public (or you have GitHub Pro for private repos)

### Site Not Updating?

- Check if the workflow ran successfully in Actions tab
- Look at the workflow logs for errors
- Make sure `data.json` exists in your repository

### Data Not Showing?

- The initial `data.json` has only one point
- Wait for the workflow to run (every hour)
- Or manually trigger it (see Step 5)
- Or use the sample data generator: `python generate_sample_data.py`

## Using Sample Data (for Testing)

To populate with sample data immediately:

```bash
python generate_sample_data.py
git add data.json
git commit -m "Add sample data"
git push
```

This creates 7 days of realistic growth data so you can test the ETA calculator right away!

## Next Steps

Once deployed:

1. Try the ETA Calculator with target "200"
2. Share your site URL with your team
3. Watch the data automatically update every hour
4. Customize the colors/styling in `index.html`

---

**Your site URL will be:** `https://YOUR-USERNAME.github.io/rooted-api-grap/`

Replace `YOUR-USERNAME` with your actual GitHub username!
