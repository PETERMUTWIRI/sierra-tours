import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET single blog post
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
  }
}

// UPDATE blog post
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    // Generate new slug if title changed
    let slug = data.slug;
    if (data.title) {
      slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Check if slug exists and belongs to different post
      const existing = await prisma.post.findUnique({ where: { slug } });
      if (existing && existing.id !== parseInt(id)) {
        return NextResponse.json({ error: 'A post with this title already exists' }, { status: 400 });
      }
    }
    
    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        slug,
        publishedAt: data.published && !data.publishedAt ? new Date() : data.publishedAt,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// DELETE blog post
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.post.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
