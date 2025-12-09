#!/bin/bash

# Quick start script for Rooted RSVP Tracker

echo "🌱 Rooted RSVP Tracker - Quick Start"
echo "===================================="
echo ""

# Check if data.json exists and has enough data
if [ ! -f "data.json" ]; then
    echo "📊 No data found. Generating sample data..."
    python3 generate_sample_data.py
    echo "✅ Sample data created!"
    echo ""
fi

# Check if server is already running
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Server already running on port 8000"
    echo "🌐 Open: http://localhost:8000"
else
    echo "🚀 Starting local server..."
    echo "🌐 Open: http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
fi
