const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

const prices = [];

for (const line of lines) {
  if (line.includes('wp_travel_engine_setting_trip_actual_price')) {
    const match = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'\)/);
    if (match) {
      prices.push({ postId: match[1], price: match[2] });
    }
  }
}

console.log(`Found ${prices.length} prices`);
console.log(prices.slice(0, 10));

// Check if trip IDs match
const tripIds = ['35', '40', '41', '469', '61', '806', '818', '859'];
const found = prices.filter(p => tripIds.includes(p.postId));
console.log('\nMatching trip prices:', found);
