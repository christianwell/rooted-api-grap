/**
 * API endpoint to fetch RSVP data and return it
 * Runs on every request - Vercel caches the response
 */

const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  try {
    // Read data.json from the repository
    const dataPath = path.join(process.cwd(), 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=60'); // Cache for 1 minute
    res.status(200).json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Failed to load data' });
  }
}
