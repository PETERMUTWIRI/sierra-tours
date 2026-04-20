// Image Mapping Utility
// Maps safaris and destinations to available images in the public folder
// Each image is carefully matched to represent the actual destination/safari content

// ============================================================================
// DESTINATION HERO IMAGES
// These represent each destination accurately
// ============================================================================
const DESTINATION_HERO_IMAGES: Record<string, string> = {
  // Kenya - Mount Kenya landscape (iconic Kenyan landmark)
  kenya: '/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg',
  
  // Tanzania - Serengeti/Ngorongoro landscape
  tanzania: '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg',
  
  // Rwanda - Gorilla/mountain landscape
  rwanda: '/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg',
  
  // Botswana - Okavango/savanna landscape
  botswana: '/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg',
  
  // Zambia - Victoria Falls/safari landscape
  zambia: '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-01.jpg',
  
  // Egypt - Pyramids of Giza
  egypt: '/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg',
  
  // Malaysia - Tropical/beach landscape
  malaysia: '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-01.jpg',
  
  // Madagascar - Lush natural landscape
  madagascar: '/images/general/sierra-tours-and-safaris-madagascar-safaris-image01.jpg',
  
  // South Africa - Safari landscape
  'south-africa': '/images/general/sierra-tours-and-safaris-south-africa-safaris-image01.jpg',
  
  // Uganda - Similar to Rwanda (gorillas)
  uganda: '/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg',
  
  // Namibia - Desert landscape (fallback to generic)
  namibia: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
  
  // Zimbabwe - Victoria Falls area
  zimbabwe: '/images/safaris/other/sierra-tours-and-safaris-naivasha-safaris-image01.jpg',
  
  // Default fallback
  default: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
};

// ============================================================================
// SAFARI-SPECIFIC IMAGE MAPPING
// Maps safari slugs to their most relevant image
// ============================================================================
const SAFARI_SPECIFIC_IMAGES: Record<string, string> = {
  // Kenya Safaris
  'mount-kenya-climbing-5-days-and-safari-1-nights-2025': '/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image01.jpg',
  '7-day-kenya-safari': '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-01.jpg',
  '10-days-9-nights-kenya-safari': '/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg',
  '15-days-kenya-culture-safari-beach-experience': '/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01.jpg',
  
  // Coastal Kenya
  '5-night-adventure-package-in-the-malindi': '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-01.jpg',
  
  // Tanzania Safaris
  '4-days-the-ultimate-of-northern-tanzania-experiences': '/images/safaris/other/sierra-tours-and-travel-4-DAYS-–-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img01.jpg',
  '7days-06night-tarangire-ngorongoro-serengeti': '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg',
  
  // Rwanda Safaris
  'rwanda-5-days': '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-01.jpg',
  
  // Botswana Safaris
  '7-day-gaborone-adventure-culture-itinerary': '/images/safaris/other/sierra-tours-and-travel-7-Day-Gaborone-Adventure-Culture-Itinerary-image01.jpg',
  
  // Zambia Safaris
  '9-nights-the-secret-of-zambia-safari': '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-02.jpg',
  
  // Egypt Safaris
  '3-nights-sharm-el-sheikh-3-nights-cairo': '/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg',
  '3-nights-north-coast-3-nights-cairo': '/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg',
  
  // South Africa
  '4-nights-5-days-cape-town-south-africa': '/images/general/sierra-tours-and-safaris-south-africa-safaris-image01.jpg',
  
  // Malaysia
  'malaysia-3-nights-4-days': '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-01.jpg',
  
  // Madagascar
  'morondava-through-madagascar-s-natural-wonders': '/images/general/sierra-tours-and-safaris-madagascar-safaris-image01.jpg',
};

// ============================================================================
// REGION-SPECIFIC IMAGE POOLS
// When a specific safari isn't mapped, use these pools based on region/keywords
// ============================================================================
const REGION_IMAGE_POOLS: Record<string, string[]> = {
  kenya: [
    '/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01.jpg',
    '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-01.jpg',
    '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-02.jpg',
    '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-03-1.jpg',
    '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-04.jpg',
  ],
  
  'mount-kenya': [
    '/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image01.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image02.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-Mount-Kenya-Climbing-5-days-and-safari-1-nights-2025-image03.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01.jpg',
  ],
  
  nakuru: [
    '/images/safaris/other/sierra-tours-and-safaris-nakuru-safaris-image01.jpg',
  ],
  
  samburu: [
    '/images/safaris/other/sierra-tours-and-safaris-samburu-safaris-image01.jpg',
  ],
  
  naivasha: [
    '/images/safaris/other/sierra-tours-and-safaris-naivasha-safaris-image01.jpg',
  ],
  
  tanzania: [
    '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image02.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image03.jpg',
    '/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01.jpg',
    '/images/safaris/other/sierra-tours-and-travel-4-DAYS-–-THE-ULTIMATE-OF-NORTHERN-TANZANIA-EXPERIENCES-img01.jpg',
  ],
  
  rwanda: [
    '/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg',
    '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-01.jpg',
    '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-02.jpg',
    '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-03.jpg',
    '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-04.jpg',
  ],
  
  botswana: [
    '/images/safaris/botswana/sierra-tours-and-safaris-botswana-safaris-image01.jpeg',
  ],
  
  egypt: [
    '/images/safaris/egypt/sierra-tours-and-safaris-egypt-safaris-image01.jpg',
  ],
  
  'coast-beach': [
    '/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01.jpg',
    '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-01.jpg',
    '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-02.jpg',
    '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-03.jpg',
    '/images/general/sierra-tours-and-safaris-diani-ukunda-safaris-image01.jpeg',
  ],
  
  malaysia: [
    '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-01.jpg',
    '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-02.jpg',
    '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-03.jpg',
    '/images/safaris/other/sierra-tours-and-travel-3-nights-4-days-Malaysia-image-04.jpg',
  ],
  
  madagascar: [
    '/images/general/sierra-tours-and-safaris-madagascar-safaris-image01.jpg',
  ],
  
  'south-africa': [
    '/images/general/sierra-tours-and-safaris-south-africa-safaris-image01.jpg',
  ],
  
  generic: [
    '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
  ],
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the best matching image for a safari based on its slug and destination
 */
export function getSafariImage(safari: { 
  id: string; 
  slug: string; 
  title: string; 
  destination?: { slug: string; name: string } | null;
  image?: string | null;
}): string {
  // If safari already has an external image URL (imgbb), use it
  if (safari.image?.startsWith('http')) {
    return safari.image;
  }
  
  // 1. Check for specific safari slug mapping
  if (SAFARI_SPECIFIC_IMAGES[safari.slug]) {
    return SAFARI_SPECIFIC_IMAGES[safari.slug];
  }
  
  const title = safari.title.toLowerCase();
  const destSlug = safari.destination?.slug?.toLowerCase() || '';
  
  // 2. Check for Mount Kenya specific safaris
  if (title.includes('mount kenya') || safari.slug.includes('mount-kenya')) {
    return REGION_IMAGE_POOLS['mount-kenya'][0];
  }
  
  // 3. Check for Nakuru specific safaris
  if (title.includes('nakuru')) {
    return REGION_IMAGE_POOLS.nakuru[0];
  }
  
  // 4. Check for Samburu specific safaris
  if (title.includes('samburu')) {
    return REGION_IMAGE_POOLS.samburu[0];
  }
  
  // 5. Check for Naivasha specific safaris
  if (title.includes('naivasha')) {
    return REGION_IMAGE_POOLS.naivasha[0];
  }
  
  // 6. Check for coastal/beach safaris
  if (title.includes('beach') || title.includes('coast') || title.includes('mombasa') || 
      title.includes('malindi') || title.includes('diani') || title.includes('watamu')) {
    const pool = REGION_IMAGE_POOLS['coast-beach'];
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  // 7. Check destination-based pools
  if (REGION_IMAGE_POOLS[destSlug] && REGION_IMAGE_POOLS[destSlug].length > 0) {
    const pool = REGION_IMAGE_POOLS[destSlug];
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  // 8. Check for generic keywords
  if (title.includes('kenya')) {
    const pool = REGION_IMAGE_POOLS.kenya;
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  if (title.includes('tanzania') || title.includes('serengeti') || title.includes('ngorongoro')) {
    const pool = REGION_IMAGE_POOLS.tanzania;
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  if (title.includes('rwanda')) {
    const pool = REGION_IMAGE_POOLS.rwanda;
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  if (title.includes('botswana')) {
    return REGION_IMAGE_POOLS.botswana[0];
  }
  
  if (title.includes('egypt')) {
    return REGION_IMAGE_POOLS.egypt[0];
  }
  
  if (title.includes('malaysia')) {
    const pool = REGION_IMAGE_POOLS.malaysia;
    return pool[Math.abs(safari.id.charCodeAt(0)) % pool.length];
  }
  
  if (title.includes('madagascar')) {
    return REGION_IMAGE_POOLS.madagascar[0];
  }
  
  if (title.includes('south africa')) {
    return REGION_IMAGE_POOLS['south-africa'][0];
  }
  
  // 9. Default to generic safari image
  return REGION_IMAGE_POOLS.generic[0];
}

/**
 * Get an appropriate hero image for a destination
 */
export function getDestinationHeroImage(destination: {
  slug: string;
  name: string;
  heroImage?: string | null;
  image?: string | null;
}): string {
  // If destination already has an external image URL, use it
  if (destination.heroImage?.startsWith('http')) {
    return destination.heroImage;
  }
  if (destination.image?.startsWith('http')) {
    return destination.image;
  }
  
  // Return specific hero or default
  return DESTINATION_HERO_IMAGES[destination.slug] || DESTINATION_HERO_IMAGES.default;
}

/**
 * Get an appropriate card image for a destination
 */
export function getDestinationCardImage(destination: {
  slug: string;
  name: string;
  image?: string | null;
}): string {
  // If destination already has an external image URL, use it
  if (destination.image?.startsWith('http')) {
    return destination.image;
  }
  
  // Use hero images for destination cards
  return getDestinationHeroImage(destination);
}

// ============================================================================
// PACKAGE TYPE IMAGES
// Maps package type slugs to local hero/cover images
// ============================================================================
const PACKAGE_TYPE_IMAGES: Record<string, string> = {
  honeymoon: '/images/honeymoon.jpg',
  valentine: '/images/valentines.jpg',
  luxury: '/images/laxery.jpg',
  christmas: '/images/christmas.jpeg',
  cultural: '/images/cultural.jpg',
  'cycling-safaris': '/images/cycling-safaris.jpg',
  'beach-packages': '/images/beach-packages .webp',
  'bush-packages': '/images/bush packages.jpg',
  'mountain-climbing': '/images/mountain climbing.jpg',
  'walkin-safaris': '/images/walkin-safaris.jpg',
  'weekend-getaways': '/images/weekend-gate-aways.jpg',
  'wildlife-safaris': '/images/wildlife-safaris.jpg',
};

/**
 * Get the best cover/hero image for a package type
 */
export function getPackageTypeImage(packageType: {
  slug: string;
  name: string;
  image?: string | null;
}): string {
  // If package type already has an external image URL (imgbb), use it
  if (packageType.image?.startsWith('http')) {
    return packageType.image;
  }
  
  // If package type has a local image path, use it
  if (packageType.image?.startsWith('/')) {
    return packageType.image;
  }
  
  // Check direct slug mapping
  if (PACKAGE_TYPE_IMAGES[packageType.slug]) {
    return PACKAGE_TYPE_IMAGES[packageType.slug];
  }
  
  // Try fuzzy matching based on slug
  const slug = packageType.slug.toLowerCase();
  if (slug.includes('honeymoon')) return PACKAGE_TYPE_IMAGES.honeymoon;
  if (slug.includes('valentine')) return PACKAGE_TYPE_IMAGES.valentine;
  if (slug.includes('luxury')) return PACKAGE_TYPE_IMAGES.luxury;
  if (slug.includes('christmas')) return PACKAGE_TYPE_IMAGES.christmas;
  if (slug.includes('cultural')) return PACKAGE_TYPE_IMAGES.cultural;
  if (slug.includes('cycling')) return PACKAGE_TYPE_IMAGES['cycling-safaris'];
  if (slug.includes('beach')) return PACKAGE_TYPE_IMAGES['beach-packages'];
  if (slug.includes('bush')) return PACKAGE_TYPE_IMAGES['bush-packages'];
  if (slug.includes('mountain')) return PACKAGE_TYPE_IMAGES['mountain-climbing'];
  if (slug.includes('walk')) return PACKAGE_TYPE_IMAGES['walkin-safaris'];
  if (slug.includes('weekend')) return PACKAGE_TYPE_IMAGES['weekend-getaways'];
  if (slug.includes('wildlife')) return PACKAGE_TYPE_IMAGES['wildlife-safaris'];
  
  // Default fallback
  return '/images/destinations/default.jpg';
}

/**
 * Check if an image path is valid
 */
export function hasValidImage(imagePath?: string | null): boolean {
  if (!imagePath) return false;
  if (imagePath.startsWith('http')) return true;
  if (imagePath.startsWith('/')) return true;
  return false;
}
