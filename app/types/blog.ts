// ==========================================
// POST / BLOG INTERFACES
// ==========================================

// Inline Image (embedded in content)
export interface InlineImage {
  id: string;
  url: string;
  caption: string;
  photographer: string;
  align: 'left' | 'center' | 'right' | 'full';
  width?: number;
}

// Used in Admin List View (lightweight)
export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover: string | null;
  published: boolean;
  publishedAt: string | null;
  featured: boolean;
  isPressRelease: boolean;
  author: string | null;
  country: string | null;
  readingTime: number | null;
  wordCount: number | null;
  createdAt: string;
}

// Full Post Interface (matches Prisma)
export interface Post {
  id: number;
  title: string;
  slug: string;
  subtitle: string | null;
  content: string;
  excerpt: string | null;
  category: string;
  cover: string | null;
  coverCaption: string | null;
  coverPhotographer: string | null;
  published: boolean;
  publishedAt: Date | null;
  featured: boolean;
  featuredQuote: string | null;
  isPressRelease: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: string | null;
  authorTitle: string | null;
  deletedAt: Date | null;

  // SEO
  metaTitle: string | null;
  metaDesc: string | null;
  ogImage: string | null;

  // Metadata
  readingTime: number | null;
  wordCount: number | null;
  tags: string[];

  // Location
  location: string | null;
  country: string | null;

  // Media
  inlineImages: InlineImage[] | null;
}

// Form Data (for create/edit)
export interface PostFormData {
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  category: string;
  cover: string;
  coverCaption: string;
  coverPhotographer: string;
  author: string;
  authorTitle: string;
  published: boolean;
  featured: boolean;
  isPressRelease: boolean;
  tags: string[];
  location: string;
  country: string;
  metaTitle: string;
  metaDesc: string;
  ogImage: string;
  featuredQuote: string;
}

// API Response Types
export interface BlogApiResponse {
  posts: Post[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  } | null;
}
