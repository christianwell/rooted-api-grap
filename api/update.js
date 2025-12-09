/**
 * API endpoint to update RSVP data
 * Vercel Cron Jobs will call this endpoint
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://api.rooted.hackclub.com/count';
const DATA_FILE = path.join(process.cwd(), 'data.json');

function fetchCurrentCount() {
  return new Promise((resolve, reject) => {
    https.get(API_URL, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.count);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function loadHistoricalData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export default async function handler(req, res) {
  // Verify the request is from Vercel Cron
  if (req.query.token !== process.env.CRON_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const count = await fetchCurrentCount();
    const data = loadHistoricalData();
    
    // Check if we should add this data point
    if (data.length > 0) {
      const lastEntry = data[data.length - 1];
      const lastTime = new Date(lastEntry.timestamp);
      const now = new Date();
      const timeDiff = (now - lastTime) / (1000 * 60); // minutes
      
      // Skip if same count and less than 30 minutes
      if (lastEntry.count === count && timeDiff < 30) {
        return res.status(200).json({ 
          message: 'Skipped - duplicate entry',
          count,
          points: data.length 
        });
      }
    }
    
    // Add new data point
    const newPoint = {
      timestamp: new Date().toISOString(),
      count: count,
      date: new Date().toLocaleString()
    };
    
    data.push(newPoint);
    saveData(data);
    
    return res.status(200).json({ 
      message: 'Data updated',
      count,
      points: data.length 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
