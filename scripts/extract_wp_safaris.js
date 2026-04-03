const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

function parseValues(line) {
  const inner = line.substring(line.indexOf('(') + 1, line.lastIndexOf(')'));
  const parts = [];
  let current = '';
  let inQuote = false;
  
  for (let i = 0; i < inner.length; i++) {
    const char = inner[i];
    const prevChar = i > 0 ? inner[i-1] : '';
    
    if (char === "'" && prevChar !== '\\') {
      inQuote = !inQuote;
      current += char;
    } else if (char === ',' && !inQuote) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current) parts.push(current.trim());
  return parts;
}

// Extract all published trips
const trips = [];
const tripIds = [];

for (const line of lines) {
  if (line.includes("INSERT INTO `sts_posts` VALUES") && line.includes("'trip'")) {
    const parts = parseValues(line);
    
    // parts[7] = status, parts[20] = post_type
    if (parts[7] === "'publish'" && parts[20] === "'trip'") {
      const id = parts[0];
      const title = parts[5].replace(/^'|'$/g, '').replace(/&amp;/g, '&');
      const slug = parts[11].replace(/^'|'$/g, '');
      
      trips.push({ id: parseInt(id), title, slug });
      tripIds.push(id);
    }
  }
}

console.log(`Found ${trips.length} published trips`);
trips.forEach(t => console.log(`- ID ${t.id}: ${t.title}`));

// Extract meta data
const metaData = {};
for (const tripId of tripIds) {
  metaData[tripId] = { price: null, duration: null, settings: null, featured: false };
}

for (const line of lines) {
  if (line.includes("INSERT INTO `sts_postmeta` VALUES")) {
    const priceMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'\)/);
    if (priceMatch && tripIds.includes(priceMatch[1])) {
      metaData[priceMatch[1]].price = parseInt(priceMatch[2]);
    }
    
    const durationMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'\)/);
    if (durationMatch && tripIds.includes(durationMatch[1])) {
      const hours = parseInt(durationMatch[2]);
      metaData[durationMatch[1]].duration = Math.round(hours / 24) || 1;
    }
    
    const settingsMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting', '([^']+)'\)/);
    if (settingsMatch && tripIds.includes(settingsMatch[1])) {
      metaData[settingsMatch[1]].settings = settingsMatch[2];
    }
    
    const featuredMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_featured_trip', 'yes'\)/);
    if (featuredMatch && tripIds.includes(featuredMatch[1])) {
      metaData[featuredMatch[1]].featured = true;
    }
  }
}

const finalTrips = trips.map(trip => ({ ...trip, ...metaData[trip.id] }));
fs.writeFileSync('/workspaces/sierra-tours/scripts/wp_trips_raw.json', JSON.stringify(finalTrips, null, 2));
console.log(`\nSaved ${finalTrips.length} trips to wp_trips_raw.json`);
