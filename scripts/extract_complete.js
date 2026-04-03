const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

// Step 1: Extract all trip posts
const trips = [];
const tripIdMap = {};

for (const line of lines) {
  if (line.includes("'trip', '', 0)") && line.includes("'publish'")) {
    const idMatch = line.match(/^ \((\d+)/);
    const titleMatch = line.match(/'', '([^']+)', '', 'publish'/);
    const slugMatch = line.match(/'', '([a-z0-9-]+)', '', '', '\d{4}-\d{2}-\d{2}/);
    
    if (idMatch && titleMatch) {
      const id = parseInt(idMatch[1]);
      const trip = {
        id: id,
        title: titleMatch[1].replace(/&amp;/g, '&'),
        slug: slugMatch ? slugMatch[1] : '',
        price: null,
        duration: null,
        settings: null,
        featured: false
      };
      trips.push(trip);
      tripIdMap[id] = trip;
    }
  }
}

console.log(`Found ${trips.length} trips`);

// Step 2: Extract meta data
for (const line of lines) {
  if (line.includes('INSERT INTO `sts_postmeta`')) {
    // Price
    const priceMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'\)/);
    if (priceMatch) {
      const postId = parseInt(priceMatch[1]);
      if (tripIdMap[postId]) {
        tripIdMap[postId].price = parseInt(priceMatch[2]);
      }
    }
    
    // Duration
    const durationMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'\)/);
    if (durationMatch) {
      const postId = parseInt(durationMatch[1]);
      if (tripIdMap[postId]) {
        const hours = parseInt(durationMatch[2]);
        tripIdMap[postId].duration = Math.round(hours / 24) || 1;
      }
    }
    
    // Settings
    const settingsMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting', '(.+)'\)$/);
    if (settingsMatch) {
      const postId = parseInt(settingsMatch[1]);
      if (tripIdMap[postId]) {
        tripIdMap[postId].settings = settingsMatch[2];
      }
    }
    
    // Featured
    const featuredMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_featured_trip', 'yes'\)/);
    if (featuredMatch) {
      const postId = parseInt(featuredMatch[1]);
      if (tripIdMap[postId]) {
        tripIdMap[postId].featured = true;
      }
    }
  }
}

// Step 3: Parse settings for detailed data
for (const trip of trips) {
  if (trip.settings) {
    const s = trip.settings;
    
    // Extract trip duration days from settings
    const tripDurMatch = s.match(/s:13:"trip_duration";i:(\d+)/);
    if (tripDurMatch) {
      trip.tripDurationDays = parseInt(tripDurMatch[1]);
    }
    
    // Extract trip duration nights from settings
    const tripNightsMatch = s.match(/s:20:"trip_duration_nights";i:(\d+)/);
    if (tripNightsMatch) {
      trip.tripDurationNights = parseInt(tripNightsMatch[1]);
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
    
    // Extract itinerary titles
    const itineraryMatch = s.match(/s:15:"itinerary_title";a:(\d+):\{/);
    if (itineraryMatch) {
      const numItems = parseInt(itineraryMatch[1]);
      const startIdx = s.indexOf('s:15:"itinerary_title";a:' + numItems + ':{') + ('s:15:"itinerary_title";a:' + numItems + ':{').length;
      const endIdx = s.indexOf('}', startIdx);
      const arrayContent = s.substring(startIdx, endIdx);
      
      const titles = [];
      const regex = /i:\d+;s:(\d+):"([^"]*)"/g;
      let m;
      while ((m = regex.exec(arrayContent)) !== null) {
        if (m[2]) titles.push(m[2]);
      }
      trip.itineraryTitles = titles;
    }
    
    // Extract itinerary days labels
    const daysLabelMatch = s.match(/s:20:"itinerary_days_label";a:(\d+):\{/);
    if (daysLabelMatch) {
      const numItems = parseInt(daysLabelMatch[1]);
      const startIdx = s.indexOf('s:20:"itinerary_days_label";a:' + numItems + ':{') + ('s:20:"itinerary_days_label";a:' + numItems + ':{').length;
      const endIdx = s.indexOf('}', startIdx);
      const arrayContent = s.substring(startIdx, endIdx);
      
      const labels = [];
      const regex = /i:\d+;s:(\d+):"([^"]*)"/g;
      let m;
      while ((m = regex.exec(arrayContent)) !== null) {
        if (m[2]) labels.push(m[2]);
      }
      trip.itineraryDaysLabels = labels;
    }
    
    // Extract overview content
    const overviewMatch = s.match(/s:10:"1_wpeditor";s:(\d+):"([^"]*)"/);
    if (overviewMatch) {
      trip.overview = overviewMatch[2].replace(/<!-- wp:paragraph -->|<\/?p>/g, '').trim();
    }
  }
}

// Print summary
console.log('\n=== SAFARI SUMMARY ===');
trips.forEach(t => {
  const dur = t.tripDurationDays || t.duration || 'N/A';
  console.log(`\nID ${t.id}: ${t.title}`);
  console.log(`  Slug: ${t.slug}`);
  console.log(`  Price: $${t.price || 'N/A'} | Duration: ${dur} days | Featured: ${t.featured}`);
  console.log(`  Itinerary Days: ${t.itineraryTitles?.length || 0}`);
  console.log(`  Includes: ${t.includes?.length || 0} items`);
});

fs.writeFileSync('/workspaces/sierra-tours/scripts/wp_safaris_complete.json', JSON.stringify(trips, null, 2));
console.log(`\n\n✓ Saved ${trips.length} complete safaris to wp_safaris_complete.json`);
