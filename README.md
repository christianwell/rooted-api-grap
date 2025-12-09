# 🌱 Rooted RSVP Tracker

A beautiful, auto-updating web application that tracks RSVPs for the Rooted Hack Club event, visualizes growth with interactive graphs, and predicts when milestone targets will be reached using statistical analysis.

**🔗 Deploy to:** [GitHub Pages](DEPLOYMENT.md) | [Vercel](VERCEL_QUICK_START.md) | [Local](#run-locally)

![Rooted RSVP Tracker](https://img.shields.io/badge/Status-Live-success)

## ✨ Features

- 📊 **Interactive Graphs** - Beautiful Chart.js visualizations showing RSVP growth over time
- 🎯 **ETA Calculator** - Predict when you'll hit target RSVP counts (e.g., 200, 500) using linear regression
- 📈 **Growth Rate Analysis** - Real-time statistics on RSVP growth rates
- 🔄 **Auto-Update** - Data automatically updates every hour
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **Fast Deployment** - Deploy on GitHub Pages, Vercel, or run locally

## 🚀 Deployment Options

### 🌟 Vercel (Recommended)
Fastest & easiest! Global CDN + serverless functions

👉 **[5-Minute Setup Guide](VERCEL_QUICK_START.md)**

### 📄 GitHub Pages
No extra services needed, free hosting

👉 **[Full Setup Guide](DEPLOYMENT.md)**

### 💻 Run Locally

```bash
git clone https://github.com/[your-username]/rooted-api-grap.git
cd rooted-api-grap

# Option A: Simple HTTP server
python -m http.server 8000
# Visit: http://localhost:8000

# Option B: Use the start script
./start.sh
```

## 📊 How It Works

### Automatic Data Collection
- **GitHub Actions** runs every hour (customizable in `.github/workflows/update-data.yml`)
- Fetches current RSVP count from `https://api.rooted.hackclub.com/count`
- Stores timestamped data points in `data.json`
- Commits and pushes updates automatically

### ETA Calculation
The app uses **linear regression** to predict future RSVP counts:
- Analyzes historical growth patterns
- Calculates the average growth rate (RSVPs per hour/day)
- Projects when you'll reach your target
- Provides confidence scores based on R² values:
  - **High**: R² > 80% (very reliable prediction)
  - **Medium**: R² > 50% (moderate reliability)
  - **Low**: R² < 50% (needs more data)

### Web Interface
- Pure HTML/CSS/JavaScript - no build step needed
- **Chart.js** creates beautiful, interactive graphs
- Fetches data directly from `data.json`
- Auto-refreshes every 5 minutes while page is open

## ⚙️ Customization

### Change Update Frequency

Edit `.github/workflows/update-data.yml`:

```yaml
on:
  schedule:
    - cron: '0 * * * *'  # Every hour
    # - cron: '*/30 * * * *'  # Every 30 minutes
    # - cron: '0 */2 * * *'  # Every 2 hours
```

### Customize Colors

Edit the CSS in `index.html`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Change to your preferred gradient */
```

### Add More Statistics

Modify `app.js` to calculate additional metrics from the data.

## 📁 Project Structure

```
rooted-api-grap/
├── index.html              # Main web page
├── app.js                  # Frontend JavaScript (charts, ETA calculation)
├── data.json              # Historical RSVP data (auto-updated)
├── fetch_data_static.py   # Data fetching script for GitHub Actions
├── .github/
│   └── workflows/
│       └── update-data.yml  # GitHub Actions workflow
└── README.md              # This file
```

## 🎯 Example Usage

**Want to know when you'll hit 200 RSVPs?**

1. Open the website
2. Enter "200" in the target field
3. Click "Calculate ETA"
4. See results like:
   - **ETA**: December 15, 2025 at 3:45 PM
   - **Days Remaining**: 5.8 days
   - **Growth Rate**: 8.5 RSVPs/day
   - **Confidence**: HIGH (95% accuracy)

## 🔧 Troubleshooting

**No data showing?**
- Check if GitHub Actions ran successfully (Actions tab)
- Make sure `data.json` exists and has data
- Check browser console for errors

**ETA says "Growth rate is not positive"?**
- Need more data points over time
- Wait for automatic updates or collect data manually
- Make sure RSVPs are actually growing

**GitHub Actions not running?**
- Check if Actions are enabled in repository settings
- Verify workflow file syntax
- Check repository permissions

## 🤝 Contributing

Feel free to open issues or submit pull requests!

## 📝 License

MIT License - feel free to use for your own events!

## 🙏 Credits

Made for [Hack Club's Rooted event](https://rooted.hackclub.com/)

---

**Enjoy tracking your event! 🌱**

*Questions? Open an issue or check out the [Hack Club Slack](https://hackclub.com/slack/)*
