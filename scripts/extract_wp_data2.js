const fs = require('fs');

// Read the database dump
const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');

// Extract trip IDs and titles from posts
const tripData = [];

// Find all posts with post_type='trip'
const lines = dbContent.split('\n');
const tripIds = [];
const tripTitles = {};
const tripSlugs = {};

for (const line of lines) {
  if (line.includes("INSERT INTO `sts_posts` VALUES")) {
    // Check if this is a trip post by looking for 'trip' at the end of the values
    // Format: (ID, author, date, date_gmt, content, title, excerpt, status, comment_status, ping_status, password, post_name, to_ping, pinged, modified, modified_gmt, content_filtered, parent, guid, menu_order, post_type, mime_type)
    const tripMatch = line.match(/\((\d+), \d+, '[^']*', '[^']*', '([^']*)', '([^']*)', '[^']*', 'publish', '[^']*', '[^']*', '[^']*', '([^']*)', '[^']*', '[^']*', '[^']*', '[^']*', '[^']*', \d+, '[^']*', \d+, 'trip'/);
    if (tripMatch) {
      const [, id, content, title, slug] = tripMatch;
      tripIds.push(id);
      tripTitles[id] = title;
      tripSlugs[id] = slug;
    }
  }
}

console.log(`Found ${tripIds.length} published trips`);
console.log('Trip IDs:', tripIds);

// Extract postmeta data for each trip
const tripMeta = {};

for (const tripId of tripIds) {
  tripMeta[tripId] = {
    id: tripId,
    title: tripTitles[tripId] || 'Unknown',
    slug: tripSlugs[tripId] || '',
    price: null,
    duration: null,
    settings: null
  };
}

// Extract prices
for (const line of lines) {
  if (line.includes("INSERT INTO `sts_postmeta` VALUES")) {
    const priceMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'/);
    if (priceMatch && tripIds.includes(priceMatch[1])) {
      tripMeta[priceMatch[1]].price = parseInt(priceMatch[2]);
    }
    
    const durationMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'/);
    if (durationMatch && tripIds.includes(durationMatch[1])) {
      const hours = parseInt(durationMatch[2]);
      const days = Math.round(hours / 24);
      tripMeta[durationMatch[1]].duration = days > 0 ? days : 1;
    }
    
    // Extract serialized settings
    const settingsMatch = line.match(/\(\d+, (\d+), 'wp_travel_engine_setting', '([^']+)'/);
    if (settingsMatch && tripIds.includes(settingsMatch[1])) {
      tripMeta[settingsMatch[1]].settings = settingsMatch[2];
    }
  }
}

// Write output
const output = Object.values(tripMeta);
fs.writeFileSync('/workspaces/sierra-tours/scripts/extracted_trips.json', JSON.stringify(output, null, 2));

console.log('\nTrip Summary:');
output.forEach(trip => {
  console.log(`- ${trip.title} (ID: ${trip.id}): $${trip.price || 'N/A'}, ${trip.duration || 'N/A'} days`);
});

console.log(`\nTotal trips with data: ${output.length}`);
