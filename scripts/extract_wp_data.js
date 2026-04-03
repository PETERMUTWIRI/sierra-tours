const fs = require('fs');

// Read the database dump
const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');

// Extract all trip posts
const tripPosts = [];
const tripRegex = /INSERT INTO `sts_posts` VALUES \((\d+), \d+, '[^']*', '[^']*', '([^']*)', '([^']*)', '[^']*', 'publish', [^,]*, [^,]*, '[^']*', '([^']*)'/g;

let match;
while ((match = tripRegex.exec(dbContent)) !== null) {
  const [, id, content, title, slug] = match;
  tripPosts.push({ id: parseInt(id), title, slug, content });
}

// Get unique trips by ID
const uniqueTrips = [];
const seenIds = new Set();
for (const trip of tripPosts) {
  if (!seenIds.has(trip.id)) {
    seenIds.add(trip.id);
    uniqueTrips.push(trip);
  }
}

console.log(`Found ${uniqueTrips.length} unique trips`);

// Extract prices for each trip
const prices = {};
const priceRegex = /\(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '([^']+)'\)/g;
while ((match = priceRegex.exec(dbContent)) !== null) {
  const [, tripId, price] = match;
  prices[tripId] = parseFloat(price);
}

// Extract durations
const durations = {};
const durationRegex = /\(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'\)/g;
while ((match = durationRegex.exec(dbContent)) !== null) {
  const [, tripId, hours] = match;
  // Convert hours to days
  const days = Math.round(parseInt(hours) / 24);
  durations[tripId] = days > 0 ? days : 1;
}

// Extract trip settings (itineraries, includes/excludes)
const settings = {};
const settingRegex = /\(\d+, (\d+), 'wp_travel_engine_setting', '([^']+)'\)/g;
while ((match = settingRegex.exec(dbContent)) !== null) {
  const [, tripId, serializedData] = match;
  try {
    // Parse the serialized PHP data (basic parsing)
    const data = serializedData;
    settings[tripId] = {
      raw: data,
      // Extract itinerary titles
      itineraryTitles: extractItineraryTitles(data),
      itineraryDays: extractItineraryDays(data),
      itineraryContent: extractItineraryContent(data),
      includes: extractIncludes(data),
      excludes: extractExcludes(data),
      tripDuration: extractTripDuration(data),
      tripDurationNights: extractTripDurationNights(data),
    };
  } catch (e) {
    // Skip invalid data
  }
}

function extractItineraryTitles(data) {
  const titles = [];
  const regex = /s:15:"itinerary_title";a:\d+:\{([^}]+)\}/;
  const match = data.match(regex);
  if (match) {
    const content = match[1];
    const titleRegex = /s:(\d+):"([^"]*)"/g;
    let m;
    while ((m = titleRegex.exec(content)) !== null) {
      if (m[2] && m[2].length > 2) {
        titles.push(m[2]);
      }
    }
  }
  return titles;
}

function extractItineraryDays(data) {
  const days = [];
  const regex = /s:20:"itinerary_days_label";a:\d+:\{([^}]+)\}/;
  const match = data.match(regex);
  if (match) {
    const content = match[1];
    const dayRegex = /s:(\d+):"([^"]*)"/g;
    let m;
    while ((m = dayRegex.exec(content)) !== null) {
      if (m[2] && m[2].includes('Day')) {
        days.push(m[2]);
      }
    }
  }
  return days;
}

function extractItineraryContent(data) {
  const contents = [];
  const regex = /s:17:"itinerary_content";a:\d+:\{([^]*)\}s:20:"trip_itinerary_title"/;
  const match = data.match(regex);
  if (match) {
    const contentSection = match[1];
    // Extract content between paragraph tags
    const paraRegex = /<!-- wp:paragraph -->\s*<p>([^<]+)<\/p>/g;
    let m;
    while ((m = paraRegex.exec(contentSection)) !== null) {
      contents.push(m[1].trim());
    }
  }
  return contents;
}

function extractIncludes(data) {
  const regex = /s:13:"cost_includes";s:\d+:"([^"]*)"/;
  const match = data.match(regex);
  return match ? match[1] : '';
}

function extractExcludes(data) {
  const regex = /s:13:"cost_excludes";s:\d+:"([^"]*)"/;
  const match = data.match(regex);
  return match ? match[1] : '';
}

function extractTripDuration(data) {
  const regex = /s:13:"trip_duration";i:(\d+)/;
  const match = data.match(regex);
  return match ? parseInt(match[1]) : null;
}

function extractTripDurationNights(data) {
  const regex = /s:20:"trip_duration_nights";i:(\d+)/;
  const match = data.match(regex);
  return match ? parseInt(match[1]) : null;
}

// Map trip IDs to destination IDs (from postmeta where destinations are stored)
const tripDestinations = {};
// Common destinations based on trip names
const destinationMapping = {
  'kenya': 'kenya',
  'tanzania': 'tanzania',
  'rwanda': 'rwanda',
  'malaysia': 'malaysia',
  'south africa': 'south-africa',
  'cape town': 'south-africa',
  'madagascar': 'madagascar',
  'egypt': 'egypt',
  'cairo': 'egypt',
  'sharm': 'egypt',
  'botswana': 'botswana',
  'gaborone': 'botswana',
  'zambia': 'zambia',
};

// Build final trip data
const finalTrips = uniqueTrips.map(trip => {
  const tripId = trip.id.toString();
  const setting = settings[tripId] || {};
  
  // Determine destination based on title
  let destinationId = 'kenya'; // default
  const titleLower = trip.title.toLowerCase();
  for (const [keyword, destId] of Object.entries(destinationMapping)) {
    if (titleLower.includes(keyword)) {
      destinationId = destId;
      break;
    }
  }
  
  // Calculate duration
  let duration = '7 days';
  const tripDays = setting.tripDuration || durations[tripId] || 7;
  const tripNights = setting.tripDurationNights || (tripDays - 1);
  duration = `${tripDays} Days / ${tripNights} Nights`;
  
  // Build itinerary
  const itinerary = [];
  const titles = setting.itineraryTitles || [];
  const days = setting.itineraryDays || [];
  const contents = setting.itineraryContent || [];
  
  for (let i = 0; i < Math.max(titles.length, days.length); i++) {
    itinerary.push({
      day: i + 1,
      title: titles[i] || `Day ${i + 1}`,
      description: contents[i] || 'Detailed activities for this day.',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Comfortable lodge or camp'
    });
  }
  
  // Parse includes/excludes
  const includesList = setting.includes ? setting.includes.split(/\n|•/).filter(s => s.trim()) : [];
  const excludesList = setting.excludes ? setting.excludes.split(/\n|•/).filter(s => s.trim()) : [];
  
  return {
    id: trip.id,
    title: trip.title,
    slug: trip.slug,
    excerpt: `${trip.title} - Experience the adventure of a lifetime.`,
    description: trip.content || `${trip.title} offers an incredible safari experience with amazing wildlife sightings and breathtaking landscapes.`,
    image: `/safaris/${trip.slug}.jpg`,
    gallery: [],
    destinationId: destinationId,
    duration: duration,
    price: prices[tripId] || 1500,
    currency: 'USD',
    published: true,
    featured: true,
    groupSize: '2-12 people',
    accommodation: 'Comfortable lodges and camps',
    activities: ['Game Drives', 'Wildlife Viewing', 'Cultural Visits'],
    highlights: ['Big Five Viewing', 'Scenic Landscapes', 'Cultural Encounters'],
    includes: includesList.length > 0 ? includesList : ['Accommodation', 'Meals', 'Transport', 'Park Fees', 'Guide Services'],
    excludes: excludesList.length > 0 ? excludesList : ['International Flights', 'Personal Expenses', 'Tips', 'Visas'],
    itinerary: itinerary.length > 0 ? itinerary : generateDefaultItinerary(tripDays || 7),
  };
});

function generateDefaultItinerary(days) {
  const itinerary = [];
  for (let i = 1; i <= days; i++) {
    itinerary.push({
      day: i,
      title: `Day ${i} - Safari Adventure`,
      description: 'Experience incredible wildlife and landscapes on this day of your safari adventure.',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Comfortable lodge or camp'
    });
  }
  return itinerary;
}

// Write to file
fs.writeFileSync('/workspaces/sierra-tours/scripts/extracted_safaris.json', JSON.stringify(finalTrips, null, 2));

console.log('Extraction complete!');
console.log(`Total trips: ${finalTrips.length}`);
console.log(`Trips with prices: ${Object.keys(prices).length}`);
console.log(`Trips with settings: ${Object.keys(settings).length}`);
