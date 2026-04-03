const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

// Extract all trip posts
const trips = [];
const tripIds = [];

for (const line of lines) {
  if (line.includes("'trip', '', 0)") && line.includes("'publish'")) {
    const idMatch = line.match(/^ \((\d+)/);
    const titleMatch = line.match(/'', '([^']+)', '', 'publish'/);
    const slugMatch = line.match(/'', '([a-z0-9-]+)', '', '', '\d{4}-\d{2}-\d{2}/);
    
    if (idMatch && titleMatch) {
      const id = idMatch[1];
      trips.push({
        id: parseInt(id),
        title: titleMatch[1].replace(/&amp;/g, '&'),
        slug: slugMatch ? slugMatch[1] : '',
        price: null,
        duration: null,
        settings: null,
        featured: false
      });
      tripIds.push(id);
    }
  }
}

console.log(`Found ${trips.length} trips`);

// Extract meta data - handle leading spaces
for (const line of lines) {
  if (line.includes("INSERT INTO `sts_postmeta` VALUES")) {
    // Price - with optional leading space
    const priceMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'\)/);
    if (priceMatch) {
      const trip = trips.find(t => t.id === parseInt(priceMatch[1]));
      if (trip) trip.price = parseInt(priceMatch[2]);
    }
    
    // Duration - with optional leading space
    const durationMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'\)/);
    if (durationMatch) {
      const trip = trips.find(t => t.id === parseInt(durationMatch[1]));
      if (trip) {
        const hours = parseInt(durationMatch[2]);
        trip.duration = Math.round(hours / 24) || 1;
      }
    }
    
    // Settings - the serialized data can be very long
    const settingsMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting', '(.+)'\)$/);
    if (settingsMatch) {
      const trip = trips.find(t => t.id === parseInt(settingsMatch[1]));
      if (trip) trip.settings = settingsMatch[2];
    }
    
    // Featured
    const featuredMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_featured_trip', 'yes'\)/);
    if (featuredMatch) {
      const trip = trips.find(t => t.id === parseInt(featuredMatch[1]));
      if (trip) trip.featured = true;
    }
  }
}

// Print summary
trips.forEach(t => {
  console.log(`ID ${t.id}: ${t.title}`);
  console.log(`  Price: $${t.price || 'N/A'}, Duration: ${t.duration || 'N/A'} days`);
});

// Parse settings for detailed data
for (const trip of trips) {
  if (trip.settings) {
    const s = trip.settings;
    
    // Extract itinerary titles
    const titleMatch = s.match(/s:15:"itinerary_title";a:(\d+):\{/);
    if (titleMatch) {
      const numItems = parseInt(titleMatch[1]);
      // Find the array content
      const startIdx = s.indexOf('s:15:"itinerary_title";a:' + numItems + ':{') + ('s:15:"itinerary_title";a:' + numItems + ':{').length;
      const endIdx = s.indexOf('}', startIdx);
      const arrayContent = s.substring(startIdx, endIdx);
      
      const titles = [];
      const regex = /i:\d+;s:(\d+):"([^"]*)"/g;
      let m;
      while ((m = regex.exec(arrayContent)) !== null) {
        titles.push(m[2]);
      }
      trip.itineraryTitles = titles;
    }
    
    // Extract includes
    const includesMatch = s.match(/s:13:"cost_includes";s:(\d+):"([^"]*)"/);
    if (includesMatch) {
      trip.includesText = includesMatch[2];
      trip.includes = includesMatch[2].split(/[•\n]/).map(i => i.trim()).filter(i => i);
    }
    
    // Extract excludes
    const excludesMatch = s.match(/s:13:"cost_excludes";s:(\d+):"([^"]*)"/);
    if (excludesMatch) {
      trip.excludesText = excludesMatch[2];
      trip.excludes = excludesMatch[2].split(/[•\n]/).map(i => i.trim()).filter(i => i);
    }
  }
}

fs.writeFileSync('/workspaces/sierra-tours/scripts/wp_safaris_complete.json', JSON.stringify(trips, null, 2));
console.log(`\nSaved ${trips.length} complete safaris to wp_safaris_complete.json`);
