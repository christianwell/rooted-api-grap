# 🔄 How Data Updates Work

Your Rooted RSVP Tracker has **two ways** data gets updated:

## 1️⃣ When You're ON The Site

**Every 1 minute** (while you're viewing the page):
- Browser checks for new data in `data.json`
- Updates the graph and stats in real-time
- This is JavaScript running locally in your browser
- Shows "Last updated: [time]" at the bottom

**What happens:**
- You see live updates while browsing
- Refresh stops when you close the page
- No requests sent to API when offline

## 2️⃣ When You're OFF The Site (Automatic)

**Every 30 minutes** (24/7, even when you're sleeping 😴):
- GitHub Actions runs automatically
- Fetches current RSVP count from `https://api.rooted.hackclub.com/count`
- Saves to `data.json`
- Commits and pushes automatically
- Your site gets updated data

**What happens:**
- Data collects automatically
- Works even if you're not online
- Happens at :00 and :30 of each hour
- Completely hands-off

## 📊 Timeline Example

```
12:00 PM → GitHub Actions fetches data ✓
12:01 PM → You open site, refresh every 1 min ✓
12:30 PM → GitHub Actions fetches data ✓
12:31 PM → You're still on site, refresh every 1 min ✓
 1:00 PM → GitHub Actions fetches data ✓
 1:01 PM → You closed site, no more updates
           (but data still collecting in background)
 1:30 PM → GitHub Actions fetches data ✓
```

## 🎯 How ETA Calculator Uses This

- Needs **at least 2 data points** to calculate growth
- More data = better predictions
- Over time, you'll get:
  - Accurate growth rates
  - Reliable ETA dates
  - High confidence scores

## ⚙️ Update Frequency

| When | Where | Interval | Active |
|------|-------|----------|--------|
| On Site | Browser | 1 minute | While page open |
| Off Site | GitHub Actions | 30 minutes | Always running |

## 🔧 Can I Change This?

**To change browser refresh (1 min):**
- Edit `app.js` line 4
- Change: `const REFRESH_INTERVAL = 1 * 60 * 1000;`

**To change GitHub Actions (30 min):**
- Edit `.github/workflows/update-data.yml` line 5
- Change: `- cron: '*/30 * * * *'`
- Cron options:
  - `'*/15 * * * *'` = Every 15 minutes
  - `'*/30 * * * *'` = Every 30 minutes (current)
  - `'0 * * * *'` = Every hour

## 💡 Pro Tips

1. **For fastest data**: Deploy on Vercel
   - Vercel can update faster with serverless
   - More reliable than GitHub Actions

2. **For learning**: Leave it as is
   - 1 min browser refresh is good for testing
   - 30 min GitHub Actions is good for real data

3. **For production**: Use Vercel
   - Can update every 5-10 minutes
   - More reliable infrastructure

## ✅ Current Setup

- ✅ Browser refresh: **1 minute** (on site)
- ✅ GitHub Actions: **30 minutes** (automatic)
- ✅ Data accumulates automatically
- ✅ Ready for Vercel upgrade

---

**Summary:** Your data updates every 1 minute when you're watching, and every 30 minutes automatically even when you're not! 🌱
