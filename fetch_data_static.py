"""
Script to fetch RSVP data from Rooted API and store for GitHub Pages
This version uses data.json for the static site
"""
import requests
import json
from datetime import datetime
import os

DATA_FILE = 'data.json'
API_URL = 'https://api.rooted.hackclub.com/count'

def fetch_current_count():
    """Fetch current RSVP count from API"""
    try:
        response = requests.get(API_URL, timeout=10)
        response.raise_for_status()
        return response.json()['count']
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def load_historical_data():
    """Load historical data from JSON file"""
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except:
            return []
    return []

def save_data_point(count):
    """Save a new data point to historical data"""
    data = load_historical_data()
    
    # Check if we should add this data point (avoid duplicates with same count in short time)
    if data:
        last_entry = data[-1]
        # Only add if count changed or it's been more than 30 minutes
        last_time = datetime.fromisoformat(last_entry['timestamp'])
        now = datetime.now()
        time_diff = (now - last_time).total_seconds() / 60  # minutes
        
        if last_entry['count'] == count and time_diff < 30:
            print(f"Skipping duplicate entry: {count} RSVPs (last recorded {time_diff:.1f} min ago)")
            return False
    
    # Add new data point
    data_point = {
        'timestamp': datetime.now().isoformat(),
        'count': count,
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    data.append(data_point)
    
    # Save to file
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Saved data point: {count} RSVPs at {data_point['date']}")
    return True

def main():
    """Main function to fetch and save data"""
    count = fetch_current_count()
    if count is not None:
        save_data_point(count)
        print(f"Current RSVP count: {count}")
    else:
        print("Failed to fetch data")

if __name__ == '__main__':
    main()
