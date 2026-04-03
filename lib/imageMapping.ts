// Image Mapping Utility
// Maps safaris and destinations to available images in the public folder
// Falls back to appropriate defaults based on destination/title keywords

// Available images in public folder organized by category
const AVAILABLE_IMAGES = {
  // Hero images for destinations
  hero: {
    default: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    kenya: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    tanzania: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    rwanda: '/images/hero/sierra-tours-and-travel-valentine-safaris.jpg',
    botswana: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    zambia: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    egypt: '/images/hero/mafunditv-homepage-about-us.jpg',
    malaysia: '/images/hero/mafunditv-homepage-about-us.jpg',
    madagascar: '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
    'south-africa': '/images/hero/sierra-tours-and-travel-luxury-safaris.jpg',
  },
  
  // Safari images organized by destination
  safaris: {
    rwanda: [
      '/images/safaris/rwanda/sierra-tours-and-safaris-rwanda-safaris-image01.jpg',
      '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-01.jpg',
      '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-02.jpg',
      '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-03.jpg',
      '/images/safaris/rwanda/sierra-tours-and-travel-Rwanda-5-Nights-image-04.jpg',
    ],
    other: [
      '/images/safaris/other/sierra-tours-and-safaris-7DAYS06NIGHT-TARANGIRE-NGORONGORO-SERENGETI-Group-tour-image01-1024x630.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-kenya-safaris-image01-1024x683.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-tanzania-safaris-image01-150x150.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-nakuru-safaris-image01-1024x683.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-mount-kenya-safaris-image01-raf9sp372ga7w3n6uyoht3210vsmfvou4capo4ekyo.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-samburu-safaris-image01-410x250.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-naivasha-safaris-image01-300x146.jpg',
      '/images/safaris/other/Sierra-tours-and-safaris-7-DAY-KENYA-SAFARI-image-03-1-410x250.jpg',
      '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-02-990x490.jpg',
      '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-03-1024x685.jpg',
      '/images/safaris/other/sierra-tours-and-travel-5-night-adventure-package-in-the-Malindi–Turtle-Bay-area-image-04-600x768.jpg',
      '/images/safaris/other/sierra-tours-and-travel-7-Day-Gaborone-Adventure-Culture-Itinerary-image02-600x480.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01-2048x1366.jpg',
      '/images/safaris/other/sierra-tours-and-safaris-mombasa-north-coast-safaris-image01-410x250.jpg',
    ],
  },
};

// Hash function to consistently map a string to an index
function hashString(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % max;
}

/**
 * Get an appropriate image for a safari based on its destination and title
 */
export function getSafariImage(safari: { 
  id: string; 
  title: string; 
  destination?: { slug: string; name: string } | null;
  image?: string | null;
}): string {
  // If safari already has an external image URL (imgbb), use it
  if (safari.image && (safari.image.startsWith('http') || safari.image.startsWith('https'))) {
    return safari.image;
  }
  
  const destSlug = safari.destination?.slug || '';
  const title = safari.title.toLowerCase();
  
  // Check if we have specific images for this destination
  if (destSlug === 'rwanda' && AVAILABLE_IMAGES.safaris.rwanda.length > 0) {
    // Use hash of safari id to pick consistently
    const index = hashString(safari.id, AVAILABLE_IMAGES.safaris.rwanda.length);
    return AVAILABLE_IMAGES.safaris.rwanda[index];
  }
  
  // Try to match by title keywords
  if (title.includes('rwanda')) {
    return AVAILABLE_IMAGES.safaris.rwanda[0] || AVAILABLE_IMAGES.safaris.other[0];
  }
  if (title.includes('kenya') || title.includes('masai') || title.includes('mara')) {
    const kenyaImages = AVAILABLE_IMAGES.safaris.other.filter(img => 
      img.includes('kenya') || img.includes('nakuru') || img.includes('7-DAY')
    );
    if (kenyaImages.length > 0) {
      return kenyaImages[hashString(safari.id, kenyaImages.length)];
    }
  }
  if (title.includes('tanzania') || title.includes('serengeti') || title.includes('ngorongoro')) {
    const tanzaniaImages = AVAILABLE_IMAGES.safaris.other.filter(img => 
      img.includes('tanzania') || img.includes('TARANGIRE')
    );
    if (tanzaniaImages.length > 0) {
      return tanzaniaImages[hashString(safari.id, tanzaniaImages.length)];
    }
  }
  if (title.includes('mount kenya')) {
    const mountKenyaImages = AVAILABLE_IMAGES.safaris.other.filter(img => 
      img.includes('mount-kenya')
    );
    if (mountKenyaImages.length > 0) return mountKenyaImages[0];
  }
  if (title.includes('malindi') || title.includes('coast') || title.includes('mombasa')) {
    const coastImages = AVAILABLE_IMAGES.safaris.other.filter(img => 
      img.includes('mombasa') || img.includes('Malindi')
    );
    if (coastImages.length > 0) {
      return coastImages[hashString(safari.id, coastImages.length)];
    }
  }
  if (title.includes('gaborone') || title.includes('botswana')) {
    const botswanaImages = AVAILABLE_IMAGES.safaris.other.filter(img => 
      img.includes('Gaborone')
    );
    if (botswanaImages.length > 0) return botswanaImages[0];
  }
  
  // Default to other images
  const index = hashString(safari.id, AVAILABLE_IMAGES.safaris.other.length);
  return AVAILABLE_IMAGES.safaris.other[index];
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
  if (destination.heroImage && (destination.heroImage.startsWith('http') || destination.heroImage.startsWith('https'))) {
    return destination.heroImage;
  }
  if (destination.image && (destination.image.startsWith('http') || destination.image.startsWith('https'))) {
    return destination.image;
  }
  
  // Check for specific destination hero
  const specificHero = AVAILABLE_IMAGES.hero[destination.slug as keyof typeof AVAILABLE_IMAGES.hero];
  if (specificHero) return specificHero;
  
  // Default hero
  return AVAILABLE_IMAGES.hero.default;
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
  if (destination.image && (destination.image.startsWith('http') || destination.image.startsWith('https'))) {
    return destination.image;
  }
  
  // Use hero images for destination cards
  return getDestinationHeroImage(destination);
}

/**
 * Check if an image path is valid (not empty and looks like a path)
 */
export function hasValidImage(imagePath?: string | null): boolean {
  if (!imagePath) return false;
  if (imagePath.startsWith('http')) return true;
  if (imagePath.startsWith('/')) return true;
  return false;
}
