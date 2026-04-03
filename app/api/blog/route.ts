import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all blog posts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    
    const where: any = {};
    if (published !== null) where.published = published === 'true';
    if (category) where.category = category;
    
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// CREATE new blog post
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if slug exists
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 });
    }
    
    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug,
        publishedAt: data.published ? new Date() : null,
      },
    });
    
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
