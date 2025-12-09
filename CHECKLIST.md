# 📋 Deployment Checklist

Use this checklist when deploying to GitHub Pages:

## Pre-Deployment

- [ ] Test locally at http://localhost:8000
- [ ] Verify data.json has sample data
- [ ] Test ETA calculator with target "200"
- [ ] Check that graphs display correctly
- [ ] Verify auto-refresh works (wait 5 minutes or check console)

## GitHub Setup

- [ ] Create GitHub repository named `rooted-api-grap`
- [ ] Initialize git and push code:
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Rooted RSVP Tracker"
  git branch -M main
  git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git
  git push -u origin main
  ```

## Enable GitHub Pages

- [ ] Go to repository Settings
- [ ] Navigate to Pages (left sidebar)
- [ ] Set Source to: Branch `main`, folder `/ (root)`
- [ ] Click Save
- [ ] Wait 1-2 minutes for initial build
- [ ] Visit: `https://YOUR-USERNAME.github.io/rooted-api-grap/`

## Enable Auto-Updates

- [ ] Go to Actions tab
- [ ] Click "I understand my workflows, go ahead and enable them"
- [ ] Manually trigger first run:
  - Click "Update RSVP Data" workflow
  - Click "Run workflow"
  - Select main branch
  - Click "Run workflow" button
- [ ] Wait for workflow to complete (check green checkmark)
- [ ] Verify data.json was updated in repository

## Verify Deployment

- [ ] Site loads at GitHub Pages URL
- [ ] Current RSVP count displays
- [ ] Graph shows data points
- [ ] Growth rate calculated correctly
- [ ] ETA calculator works with target number
- [ ] No console errors in browser DevTools
- [ ] Mobile view works (test on phone or resize browser)

## Optional Customization

- [ ] Update README with your actual GitHub Pages URL
- [ ] Customize colors in index.html
- [ ] Adjust update frequency in .github/workflows/update-data.yml
- [ ] Add your branding/logo

## Share

- [ ] Share URL with team
- [ ] Add link to Hack Club Slack
- [ ] Post on social media
- [ ] Monitor growth and predictions!

## Troubleshooting

If something doesn't work:

1. **Check Actions tab** for workflow errors
2. **Check Pages settings** - make sure it's enabled
3. **Wait a few minutes** - GitHub Pages can take time to update
4. **Check browser console** for JavaScript errors
5. **Verify data.json exists** in the repository

---

**Your URL format:** `https://YOUR-USERNAME.github.io/rooted-api-grap/`

Replace `YOUR-USERNAME` with your GitHub username!
