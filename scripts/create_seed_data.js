const fs = require('fs');

const dbContent = fs.readFileSync('/workspaces/sierra-tours/wordpress/database.sql', 'utf8');
const lines = dbContent.split('\n');

// Helper to parse PHP serialized string
function parsePhpSerialized(str) {
  const result = {};
  // Simple parsing for the fields we need
  
  // Extract itinerary titles
  const titleMatch = str.match(/s:15:"itinerary_title";a:(\d+):\{([^}]+)\}/);
  if (titleMatch) {
    const titles = [];
    const regex = /i:\d+;s:(\d+):"([^"]*)"/g;
    let m;
    while ((m = regex.exec(titleMatch[2])) !== null) {
      if (m[2]) titles.push(m[2]);
    }
    result.itineraryTitles = titles;
  }
  
  // Extract itinerary days labels
  const daysMatch = str.match(/s:20:"itinerary_days_label";a:(\d+):\{([^}]+)\}/);
  if (daysMatch) {
    const days = [];
    const regex = /i:\d+;s:(\d+):"([^"]*)"/g;
    let m;
    while ((m = regex.exec(daysMatch[2])) !== null) {
      if (m[2]) days.push(m[2]);
    }
    result.itineraryDays = days;
  }
  
  // Extract includes
  const includesMatch = str.match(/s:13:"cost_includes";s:(\d+):"([^"]*)"/);
  if (includesMatch) {
    result.includes = includesMatch[2].split(/[•\n➢]/).map(i => i.trim()).filter(i => i);
  }
  
  // Extract excludes
  const excludesMatch = str.match(/s:13:"cost_excludes";s:(\d+):"([^"]*)"/);
  if (excludesMatch) {
    result.excludes = excludesMatch[2].split(/[•\n➢]/).map(i => i.trim()).filter(i => i);
  }
  
  // Extract trip duration
  const durMatch = str.match(/s:13:"trip_duration";i:(\d+)/);
  if (durMatch) result.duration = parseInt(durMatch[1]);
  
  // Extract trip nights
  const nightsMatch = str.match(/s:20:"trip_duration_nights";i:(\d+)/);
  if (nightsMatch) result.nights = parseInt(nightsMatch[1]);
  
  return result;
}

// Step 1: Extract trip posts
const trips = [];
const tripMap = {};

for (const line of lines) {
  if (line.includes("'trip', '', 0)") && line.includes("'publish'")) {
    const idMatch = line.match(/^ \((\d+)/);
    const titleMatch = line.match(/'', '([^']+)', '', 'publish'/);
    const slugMatch = line.match(/'', '([a-z0-9-]+)', '', '', '\d{4}-\d{2}-\d{2}/);
    
    if (idMatch && titleMatch) {
      const id = parseInt(idMatch[1]);
      const trip = {
        id,
        title: titleMatch[1].replace(/&amp;/g, '&').replace(/&#8217;/g, "'"),
        slug: slugMatch ? slugMatch[1] : '',
        price: 0,
        duration: 7,
        durationNights: 6,
        featured: false,
        settings: null,
        parsed: null
      };
      trips.push(trip);
      tripMap[id] = trip;
    }
  }
}

console.log(`Found ${trips.length} trips`);

// Step 2: Extract meta data
for (const line of lines) {
  const priceMatch = line.match(/ \(\d+, (\d+), 'wp_travel_engine_setting_trip_actual_price', '(\d+)'\)/);
  if (priceMatch && tripMap[parseInt(priceMatch[1])]) {
    tripMap[parseInt(priceMatch[1])].price = parseInt(priceMatch[2]);
  }
  
  const durationMatch = line.match(/ \(\d+, (\d+), 'wp_travel_engine_setting_trip_duration', '(\d+)'\)/);
  if (durationMatch && tripMap[parseInt(durationMatch[1])]) {
    const hours = parseInt(durationMatch[2]);
    tripMap[parseInt(durationMatch[1])].duration = Math.round(hours / 24) || 1;
  }
  
  const settingsMatch = line.match(/ \(\d+, (\d+), 'wp_travel_engine_setting', '(.+)'\)$/);
  if (settingsMatch && tripMap[parseInt(settingsMatch[1])]) {
    tripMap[parseInt(settingsMatch[1])].settings = settingsMatch[2];
    tripMap[parseInt(settingsMatch[1])].parsed = parsePhpSerialized(settingsMatch[2]);
  }
  
  const featuredMatch = line.match(/ \(\d+, (\d+), 'wp_travel_engine_featured_trip', 'yes'\)/);
  if (featuredMatch && tripMap[parseInt(featuredMatch[1])]) {
    tripMap[parseInt(featuredMatch[1])].featured = true;
  }
}

// Step 3: Build seed data
const seedData = trips.map(trip => {
  const p = trip.parsed || {};
  
  // Determine destination
  let destinationId = 'kenya';
  const titleLower = trip.title.toLowerCase();
  if (titleLower.includes('tanzania')) destinationId = 'tanzania';
  else if (titleLower.includes('rwanda')) destinationId = 'rwanda';
  else if (titleLower.includes('malaysia')) destinationId = 'malaysia';
  else if (titleLower.includes('cape town') || titleLower.includes('south africa')) destinationId = 'south-africa';
  else if (titleLower.includes('madagascar')) destinationId = 'madagascar';
  else if (titleLower.includes('egypt') || titleLower.includes('cairo') || titleLower.includes('sharm')) destinationId = 'egypt';
  else if (titleLower.includes('gaborone') || titleLower.includes('botswana')) destinationId = 'botswana';
  else if (titleLower.includes('zambia')) destinationId = 'zambia';
  
  // Duration string
  const days = p.duration || trip.duration || 7;
  const nights = p.nights || (days - 1);
  const durationStr = `${days} Days / ${nights} Nights`;
  
  // Build itinerary
  const itinerary = [];
  const titles = p.itineraryTitles || [];
  const dayLabels = p.itineraryDays || [];
  
  for (let i = 0; i < Math.max(titles.length, 1); i++) {
    itinerary.push({
      day: i + 1,
      title: titles[i] || `Day ${i + 1} - Safari Adventure`,
      description: 'Experience incredible wildlife and landscapes on this day of your safari adventure.',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      accommodation: 'Comfortable lodge or camp'
    });
  }
  
  if (itinerary.length === 0) {
    // Generate default itinerary
    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        title: `Day ${i} - Safari Adventure`,
        description: 'Experience incredible wildlife and landscapes on this day of your safari adventure.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Comfortable lodge or camp'
      });
    }
  }
  
  // Default includes/excludes
  const includes = p.includes?.length > 0 ? p.includes : [
    'All accommodation as per itinerary',
    'All meals during the safari',
    'Professional English-speaking guide',
    'Transport in 4x4 safari vehicle',
    'Park entrance fees',
    'Airport transfers'
  ];
  
  const excludes = p.excludes?.length > 0 ? p.excludes : [
    'International flights',
    'Travel insurance',
    'Personal expenses',
    'Tips and gratuities',
    'Visa fees'
  ];
  
  return {
    title: trip.title,
    slug: trip.slug,
    excerpt: `${trip.title} - An unforgettable safari experience with amazing wildlife sightings and breathtaking landscapes.`,
    description: `Experience the adventure of a lifetime with our ${trip.title}. This safari takes you through stunning landscapes where you'll encounter incredible wildlife and immerse yourself in local culture.`,
    image: `/safaris/${trip.slug}.jpg`,
    gallery: [],
    destinationId,
    duration: durationStr,
    price: trip.price || 1500,
    currency: 'USD',
    published: true,
    featured: trip.featured,
    groupSize: '2-12 people',
    accommodation: 'Comfortable lodges and camps',
    activities: ['Game Drives', 'Wildlife Viewing', 'Cultural Visits', 'Photography'],
    highlights: ['Big Five Viewing', 'Scenic Landscapes', 'Professional Guides', 'All-Inclusive Experience'],
    includes,
    excludes,
    itinerary
  };
});

// Filter out trips with price 0 or missing data
const validTrips = seedData.filter(t => t.price > 0);

console.log(`\n=== EXTRACTED SAFARIS (${validTrips.length} with prices) ===`);
validTrips.forEach(t => {
  console.log(`- ${t.title}: $${t.price} | ${t.duration} | ${t.destinationId}`);
});

// Write seed file
const seedContent = `// Auto-generated from WordPress backup
// Generated: ${new Date().toISOString()}

export const wpSafaris = ${JSON.stringify(validTrips, null, 2)};
`;

fs.writeFileSync('/workspaces/sierra-tours/scripts/wp_safaris_seed.ts', seedContent);
console.log(`\n✓ Saved ${validTrips.length} safaris to wp_safaris_seed.ts`);

// Also save complete JSON
fs.writeFileSync('/workspaces/sierra-tours/scripts/wp_safaris_seed.json', JSON.stringify(validTrips, null, 2));
console.log(`✓ Saved JSON to wp_safaris_seed.json`);
