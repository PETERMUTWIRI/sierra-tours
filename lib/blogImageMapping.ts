// Blog Image Mapping Utility
// Maps blog posts to relevant images based on content/keywords

const BLOG_IMAGES = {
  // Kenya-related
  kenya: '/images/blog/franck-v-512278-unsplash.jpg',
  
  // Tanzania/Serengeti/Migration
  tanzania: '/images/blog/jason-blackeye-262295-unsplash.jpg',
  migration: '/images/blog/jason-blackeye-262295-unsplash.jpg',
  
  // Botswana/Luxury
  botswana: '/images/blog/lee-miller-47629-unsplash.jpg',
  luxury: '/images/blog/michael-frattaroli-234665-unsplash.jpg',
  lodges: '/images/blog/lee-miller-47629-unsplash.jpg',
  
  // Generic/Adventure
  adventure: '/images/blog/pexels-photo-253758.jpeg',
  wildlife: '/images/blog/pexels-photo-556068.jpeg',
  
  // People/Guides
  guides: '/images/blog/rawpixel-557123-unsplash.jpg',
  planning: '/images/blog/rawpixel-799380-unsplash.jpg',
  
  // Nature/Landscapes
  landscape: '/images/blog/william-krause-622690-unsplash.jpg',
  
  // Default fallback
  default: '/images/blog/franck-v-512278-unsplash.jpg',
};

const POST_SPECIFIC_IMAGES: Record<string, string> = {
  'top-10-safari-destinations-in-kenya': '/images/blog/franck-v-512278-unsplash.jpg',
  'the-great-migration-a-complete-guide': '/images/blog/jason-blackeye-262295-unsplash.jpg',
  'luxury-safari-lodges-in-botswana': '/images/blog/lee-miller-47629-unsplash.jpg',
};

/**
 * Get appropriate image for a blog post
 */
export function getBlogImage(post: {
  id: string | number;
  slug?: string;
  title: string;
  category?: string | null;
  country?: string | null;
  cover?: string | null;
}): string {
  // If post has external cover image (imgbb), use it
  if (post.cover?.startsWith('http')) {
    return post.cover;
  }

  // Check for specific post mapping
  if (post.slug && POST_SPECIFIC_IMAGES[post.slug]) {
    return POST_SPECIFIC_IMAGES[post.slug];
  }

  const title = post.title.toLowerCase();
  const category = post.category?.toLowerCase() || '';
  const country = post.country?.toLowerCase() || '';

  // Country-based matching
  if (country.includes('kenya') || title.includes('kenya')) {
    return BLOG_IMAGES.kenya;
  }
  if (country.includes('tanzania') || title.includes('tanzania') || title.includes('migration') || title.includes('serengeti')) {
    return BLOG_IMAGES.tanzania;
  }
  if (country.includes('botswana') || title.includes('botswana')) {
    return BLOG_IMAGES.botswana;
  }

  // Content-based matching
  if (title.includes('migration') || title.includes('wildebeest')) {
    return BLOG_IMAGES.migration;
  }
  if (title.includes('luxury') || title.includes('lodge') || title.includes('accommodation')) {
    return BLOG_IMAGES.luxury;
  }
  if (title.includes('guide') || title.includes('tip') || title.includes('advice')) {
    return BLOG_IMAGES.guides;
  }
  if (title.includes('plan') || title.includes('prepare') || title.includes('pack')) {
    return BLOG_IMAGES.planning;
  }
  if (title.includes('wildlife') || title.includes('animal')) {
    return BLOG_IMAGES.wildlife;
  }
  if (title.includes('adventure') || title.includes('experience')) {
    return BLOG_IMAGES.adventure;
  }

  // Category-based matching
  if (category.includes('accommodation') || category.includes('lodge')) {
    return BLOG_IMAGES.luxury;
  }
  if (category.includes('guide')) {
    return BLOG_IMAGES.guides;
  }
  if (category.includes('destination')) {
    return BLOG_IMAGES.landscape;
  }

  // Default
  return BLOG_IMAGES.default;
}

/**
 * Get hero background for blog page
 */
export function getBlogHeroImage(): string {
  return '/images/blog/william-krause-622690-unsplash.jpg';
}
