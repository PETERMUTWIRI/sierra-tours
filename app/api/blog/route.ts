import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { calculateReadingTime, calculateWordCount, slugify } from '@/app/lib/blog-constants';
import { revalidatePath } from 'next/cache';

// Zod Validation Schema
const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  subtitle: z.string().optional().nullable(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  excerpt: z.string().min(10).max(500),
  category: z.enum([
    'Safari Guides', 'Destination Guides', 'Travel Tips', 'Wildlife',
    'Photography', 'Accommodation Reviews', 'Adventure Stories',
    'Conservation', 'Cultural Experiences', 'Food & Dining',
    'Packing Lists', 'Seasonal Guides', 'Family Travel',
    'Luxury Travel', 'Budget Travel', 'Press Release', 'News'
  ]),
  cover: z.string().url().optional().nullable(),
  coverCaption: z.string().optional().nullable(),
  coverPhotographer: z.string().optional().nullable(),
  author: z.string().optional().nullable(),
  authorTitle: z.string().optional().nullable(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  isPressRelease: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  location: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  metaTitle: z.string().max(100).optional().nullable(),
  metaDesc: z.string().max(160).optional().nullable(),
  ogImage: z.string().url().optional().nullable(),
  featuredQuote: z.string().optional().nullable(),
});

// GET - Fetch posts (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const country = searchParams.get('country');
    const tag = searchParams.get('tag');
    const admin = searchParams.get('admin');

    // Build where clause
    const where: any = {
      deletedAt: null,
    };

    // Only show published posts to public
    if (!admin) {
      where.published = true;
    }

    if (slug) where.slug = slug;
    if (category && category !== 'All') where.category = category;
    if (featured === 'true') where.featured = true;
    if (country) where.country = country;
    if (tag) where.tags = { has: tag };

    const posts = await prisma.post.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = postSchema.parse(body);

    // Calculate metadata
    const wordCount = calculateWordCount(validated.content);
    const readingTime = calculateReadingTime(validated.content);

    // Generate unique slug
    const baseSlug = slugify(validated.title);
    let slug = baseSlug;
    let counter = 1;

    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.post.create({
      data: {
        ...validated,
        slug,
        wordCount,
        readingTime,
        publishedAt: validated.published ? new Date() : null,
      },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

// PUT - Update post
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID required' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const validated = postSchema.parse(body);

    // Calculate metadata
    const wordCount = calculateWordCount(validated.content);
    const readingTime = calculateReadingTime(validated.content);

    // Get existing post to check slug
    const existing = await prisma.post.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Generate new slug if title changed
    let slug = existing.slug;
    if (validated.title !== existing.title) {
      const baseSlug = slugify(validated.title);
      slug = baseSlug;
      let counter = 1;

      while (await prisma.post.findFirst({
        where: { slug, id: { not: parseInt(id) } }
      })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...validated,
        slug,
        wordCount,
        readingTime,
        publishedAt: validated.published && !existing.published 
          ? new Date() 
          : existing.publishedAt,
        updatedAt: new Date(),
      },
    });

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: (error as z.ZodError).issues },
        { status: 400 }
      );
    }
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE - Soft delete
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Post ID required' },
        { status: 400 }
      );
    }

    await prisma.post.update({
      where: { id: parseInt(id) },
      data: { deletedAt: new Date() }
    });

    revalidatePath('/blog');
    
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
