// Configuration
const API_URL = 'https://api.rooted.hackclub.com/count';
const DATA_FILE = 'data.json';
const REFRESH_INTERVAL = 1 * 60 * 1000; // 1 minute
const GITHUB_PAGES_DATA_URL = 'data.json'; // For GitHub Pages deployment

let chart;
let historicalData = [];

// Load data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    // Auto-refresh every 1 minute
    setInterval(loadData, REFRESH_INTERVAL);
    
    // Allow Enter key to calculate ETA
    document.getElementById('targetInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateETA();
        }
    });
});

async function loadData() {
    try {
        // Load historical data from JSON file
        const histResponse = await fetch(GITHUB_PAGES_DATA_URL + '?t=' + Date.now());
        historicalData = await histResponse.json();
        
        // Fetch current count from API
        const apiResponse = await fetch(API_URL);
        const apiData = await apiResponse.json();
        const currentCount = apiData.count;
        
        // Add current data if it's new
        if (historicalData.length === 0 || 
            historicalData[historicalData.length - 1].count !== currentCount) {
            const newPoint = {
                timestamp: new Date().toISOString(),
                count: currentCount,
                date: new Date().toLocaleString()
            };
            historicalData.push(newPoint);
            // Note: On GitHub Pages, this won't persist. You need GitHub Actions for that.
        }
        
        // Update stats
        document.getElementById('currentCount').textContent = currentCount;
        document.getElementById('dataPoints').textContent = historicalData.length;
        
        // Calculate and display growth rate
        if (historicalData.length >= 2) {
            const firstPoint = historicalData[0];
            const lastPoint = historicalData[historicalData.length - 1];
            
            const firstTime = new Date(firstPoint.timestamp);
            const lastTime = new Date(lastPoint.timestamp);
            const hoursDiff = (lastTime - firstTime) / (1000 * 60 * 60);
            
            if (hoursDiff > 0) {
                const countDiff = lastPoint.count - firstPoint.count;
                const ratePerDay = (countDiff / hoursDiff) * 24;
                document.getElementById('growthRate').textContent = 
                    ratePerDay > 0 ? `${ratePerDay.toFixed(1)} per day` : 'N/A';
            } else {
                document.getElementById('growthRate').textContent = 'N/A';
            }
        } else {
            document.getElementById('growthRate').textContent = 'Need more data';
        }
        
        // Update chart
        updateChart();
        
        // Update last update time
        document.getElementById('lastUpdate').textContent = 
            'Last updated: ' + new Date().toLocaleTimeString() + ' (Auto-refresh every 1 min)';
        
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('currentCount').textContent = 'Error';
        
        // Try to at least show the local data
        try {
            const histResponse = await fetch(GITHUB_PAGES_DATA_URL);
            historicalData = await histResponse.json();
            if (historicalData.length > 0) {
                document.getElementById('currentCount').textContent = 
                    historicalData[historicalData.length - 1].count;
                updateChart();
            }
        } catch (e) {
            console.error('Could not load fallback data:', e);
        }
    }
}

function updateChart() {
    const ctx = document.getElementById('rsvpChart').getContext('2d');
    
    // Prepare data
    const labels = historicalData.map(d => {
        const date = new Date(d.timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    });
    const counts = historicalData.map(d => d.count);
    
    // Destroy old chart if exists
    if (chart) {
        chart.destroy();
    }
    
    // Create new chart
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'RSVP Count',
                data: counts,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    },
                    title: {
                        display: true,
                        text: 'Number of RSVPs'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

function linearRegression(x, y) {
    const n = x.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    for (let i = 0; i < n; i++) {
        sumX += x[i];
        sumY += y[i];
        sumXY += x[i] * y[i];
        sumXX += x[i] * x[i];
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Calculate R-squared
    const yMean = sumY / n;
    let ssTotal = 0, ssResidual = 0;
    
    for (let i = 0; i < n; i++) {
        const yPred = slope * x[i] + intercept;
        ssTotal += (y[i] - yMean) ** 2;
        ssResidual += (y[i] - yPred) ** 2;
    }
    
    const rSquared = 1 - (ssResidual / ssTotal);
    
    return { slope, intercept, rSquared };
}

function calculateETA() {
    const target = parseInt(document.getElementById('targetInput').value);
    
    if (!target || target <= 0) {
        showETAResult('<p style="color: #ef4444;">Please enter a valid target number</p>');
        return;
    }
    
    if (historicalData.length < 2) {
        showETAResult('<p style="color: #ef4444;">Not enough data yet. Need at least 2 data points. Check back later!</p>');
        return;
    }
    
    const currentCount = historicalData[historicalData.length - 1].count;
    
    if (currentCount >= target) {
        showETAResult(`<h3>Target: ${target} RSVPs</h3><p style="font-size: 1.5em; color: #10b981; font-weight: bold;">🎉 Already reached!</p>`);
        return;
    }
    
    // Convert timestamps to hours since first data point
    const firstTime = new Date(historicalData[0].timestamp);
    const times = historicalData.map(d => {
        const dt = new Date(d.timestamp);
        return (dt - firstTime) / (1000 * 60 * 60); // hours
    });
    const counts = historicalData.map(d => d.count);
    
    // Perform linear regression
    const { slope, intercept, rSquared } = linearRegression(times, counts);
    
    if (slope <= 0) {
        showETAResult(`
            <h3>Target: ${target} RSVPs</h3>
            <p style="color: #ef4444;">Unable to calculate ETA - growth rate is not positive or data is flat.</p>
            <p style="margin-top: 10px; color: #666;">Current rate: ${slope.toFixed(3)} RSVPs/hour</p>
            <p style="color: #666;">Try collecting more data points over time for better predictions.</p>
        `);
        return;
    }
    
    // Calculate ETA
    const hoursNeeded = (target - intercept) / slope;
    const currentHours = times[times.length - 1];
    const hoursRemaining = Math.max(0, hoursNeeded - currentHours);
    
    const etaDate = new Date(Date.now() + hoursRemaining * 60 * 60 * 1000);
    
    // Determine confidence
    let confidence = 'low';
    if (rSquared > 0.8) confidence = 'high';
    else if (rSquared > 0.5) confidence = 'medium';
    
    const daysRemaining = hoursRemaining / 24;
    const ratePerDay = slope * 24;
    
    let resultHTML = `<h3>Target: ${target} RSVPs</h3>`;
    resultHTML += `
        <div style="font-size: 1.5em; font-weight: bold; color: #667eea; margin: 15px 0;">
            📅 ${etaDate.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
        </div>
        <div class="eta-info">
            <div class="eta-info-item">
                <strong>Hours Remaining</strong>
                ${hoursRemaining.toFixed(1)} hours
            </div>
            <div class="eta-info-item">
                <strong>Days Remaining</strong>
                ${daysRemaining.toFixed(1)} days
            </div>
            <div class="eta-info-item">
                <strong>Growth Rate</strong>
                ${ratePerDay.toFixed(2)} RSVPs/day
            </div>
            <div class="eta-info-item">
                <strong>Accuracy (R²)</strong>
                ${(rSquared * 100).toFixed(1)}%
            </div>
        </div>
        <span class="confidence-badge confidence-${confidence}">
            ${confidence.toUpperCase()} CONFIDENCE
        </span>
        <p style="margin-top: 15px; color: #666; font-size: 0.9em;">
            <em>Based on linear regression of ${historicalData.length} data points</em>
        </p>
    `;
    
    showETAResult(resultHTML);
}

function showETAResult(html) {
    const resultDiv = document.getElementById('etaResult');
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}
