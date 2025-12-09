#!/bin/bash

# 🌱 Rooted RSVP Tracker - Deployment Helper

echo "🌱 Rooted RSVP Tracker - Deployment Options"
echo "=========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Run these first:"
    echo ""
    echo "  git init"
    echo "  git add ."
    echo "  git commit -m 'Initial commit'"
    echo "  git branch -M main"
    echo "  git remote add origin https://github.com/YOUR-USERNAME/rooted-api-grap.git"
    echo "  git push -u origin main"
    echo ""
fi

echo "📋 Choose your deployment option:"
echo ""
echo "1️⃣  VERCEL (Recommended) ⭐"
echo "   ├─ Fastest (global CDN)"
echo "   ├─ 3-minute setup"
echo "   ├─ Auto-deploys on git push"
echo "   └─ 👉 Read: VERCEL_QUICK_START.md"
echo ""
echo "2️⃣  GITHUB PAGES"
echo "   ├─ All in GitHub"
echo "   ├─ 5-minute setup"
echo "   ├─ No extra services"
echo "   └─ 👉 Read: DEPLOYMENT.md"
echo ""
echo "3️⃣  LOCAL DEVELOPMENT"
echo "   ├─ Instant (no deploy)"
echo "   ├─ 1-minute setup"
echo "   ├─ Development/testing only"
echo "   └─ 👉 Run: ./start.sh"
echo ""
echo "4️⃣  COMPARE ALL OPTIONS"
echo "   └─ 👉 Read: COMPARISON.md"
echo ""

echo "❓ Not sure? → Read VERCEL_ADDED.md"
echo ""
echo "Happy deploying! 🚀"
