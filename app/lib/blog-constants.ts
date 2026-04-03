// ==========================================
// BLOG CONSTANTS
// ==========================================

// Categories for travel/blog posts
export const POST_CATEGORIES = [
  'Safari Guides',
  'Destination Guides',
  'Travel Tips',
  'Wildlife',
  'Photography',
  'Accommodation Reviews',
  'Adventure Stories',
  'Conservation',
  'Cultural Experiences',
  'Food & Dining',
  'Packing Lists',
  'Seasonal Guides',
  'Family Travel',
  'Luxury Travel',
  'Budget Travel',
  'Press Release',
  'News',
] as const;

// African Countries (for location tagging)
export const AFRICAN_COUNTRIES = [
  'Kenya',
  'Tanzania',
  'Botswana',
  'Zambia',
  'Zimbabwe',
  'South Africa',
  'Namibia',
  'Uganda',
  'Rwanda',
  'Ethiopia',
  'Egypt',
  'Morocco',
  'Madagascar',
  'Mozambique',
  'Malawi',
  'Ghana',
  'Senegal',
  'Eswatini',
  'Lesotho',
] as const;

// Status badges for UI
export const POST_STATUS_BADGES = {
  draft: { color: 'bg-amber-500', label: 'Draft' },
  published: { color: 'bg-green-500', label: 'Published' },
  featured: { color: 'bg-blue-600', label: 'Featured' },
  pressRelease: { color: 'bg-purple-500', label: 'Press' }
} as const;

// Reading time calculation
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Word count calculation
export function calculateWordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

// Slug generator
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 200);
}

// Generate unique slug
export async function generateUniqueSlug(
  title: string,
  checkExists: (slug: string) => Promise<boolean>
): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (await checkExists(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
