const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

// Extract all trip posts
const trips = [];
const tripIds = [];

for (const line of lines) {
  // Look for lines with 'trip' post type
  if (line.includes("INSERT INTO `sts_posts` VALUES") && line.includes("'trip',")) {
    // Simple extraction using split
    const valuesMatch = line.match(/VALUES \((.+)\),?$/);
    if (valuesMatch) {
      const values = valuesMatch[1];
      const parts = values.split(',').map(p => p.trim());
      
      // Check if this is a published trip
      // Format: ID, author, date, date_gmt, content, title, excerpt, status, ...
      // parts[7] = status, parts[19] = post_type
      if (parts[7] === "'publish'" && parts[19] === "'trip'") {
        const id = parts[0];
        // Title is between parts[5] (might have HTML entities)
        const titleMatch = values.match(/'((?:[^'\\]|\\.)*7-DAY[^']*|(?:[^'\\]|\\.)*Days[^']*|(?:[^'\\]|\\.)*Nights[^']*|(?:[^'\\]|\\.)*Safari[^']*|(?:[^'\\]|\\.)*Kenya[^']*|(?:[^'\\]|\\.)*Tour[^']*)'/i);
        // Extract title more carefully
        const fullTitleMatch = values.match(/, '((?:[^'\\]|\\.)*?)', '', 'publish'/);
        const title = fullTitleMatch ? fullTitleMatch[1].replace(/&amp;/g, '&') : '';
        
        // Extract slug
        const slugMatch = values.match(/'([a-z0-9-]+)', '', '', '/);
        const slug = slugMatch ? slugMatch[1] : '';
        
        if (title) {
          trips.push({ id: parseInt(id), title, slug });
          tripIds.push(id);
        }
      }
    }
  }
}

console.log(`Found ${trips.length} trips`);

// If still not working, use direct extraction
if (trips.length === 0) {
  console.log('Using alternative extraction...');
  const tripLines = lines.filter(l => l.includes("INSERT INTO `sts_posts` VALUES") && l.includes("'trip',") && l.includes("'publish'"));
  
  for (const line of tripLines) {
    // Extract ID
    const idMatch = line.match(/\((\d+),/);
    // Extract title - it's the 6th field (0-indexed: 5)
    const titleMatch = line.match(/'\d{4}-\d{2}-\d{2}[^']*', '\d{4}-\d{2}-\d{2}[^']*', '[^']*', '([^']+)', ''/);
    
    if (idMatch && titleMatch) {
      const id = idMatch[1];
      const title = titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      
      // Extract slug
      const slugMatch = line.match(/'([a-z0-9-]+)', '', '', '\d{4}-\d{2}-\d{2}/);
      const slug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      trips.push({ id: parseInt(id), title, slug });
      tripIds.push(id);
    }
  }
}

trips.forEach(t => console.log(`- ID ${t.id}: ${t.title}`));
console.log(`Total: ${trips.length} trips`);

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
console.log('\nSaved to wp_trips_raw.json');
