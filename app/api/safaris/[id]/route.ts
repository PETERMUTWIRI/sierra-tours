import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET single safari with itinerary
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const safari = await prisma.safari.findUnique({
      where: { id },
      include: {
        destination: true,
        itinerary: {
          orderBy: { day: 'asc' },
        },
        gallery: true,
      },
    });
    
    if (!safari) {
      return NextResponse.json({ error: 'Safari not found' }, { status: 404 });
    }
    
    return NextResponse.json(safari);
  } catch (error) {
    console.error('Error fetching safari:', error);
    return NextResponse.json({ error: 'Failed to fetch safari' }, { status: 500 });
  }
}

// UPDATE safari
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
      
      // Check if slug exists and belongs to different safari
      const existing = await prisma.safari.findUnique({ where: { slug } });
      if (existing && existing.id !== id) {
        return NextResponse.json({ error: 'A safari with this title already exists' }, { status: 400 });
      }
    }
    
    const safari = await prisma.safari.update({
      where: { id },
      data: {
        title: data.title,
        slug,
        destinationId: data.destinationId,
        duration: data.duration,
        price: data.price ? parseFloat(data.price) : undefined,
        currency: data.currency,
        excerpt: data.excerpt,
        description: data.description,
        image: data.image,
        groupSize: data.groupSize,
        accommodation: data.accommodation,
        activities: data.activities,
        includes: data.includes,
        excludes: data.excludes,
        highlights: data.highlights,
        published: data.published,
        featured: data.featured,
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(safari);
  } catch (error) {
    console.error('Error updating safari:', error);
    return NextResponse.json({ error: 'Failed to update safari' }, { status: 500 });
  }
}

// DELETE safari
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.safari.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting safari:', error);
    return NextResponse.json({ error: 'Failed to delete safari' }, { status: 500 });
  }
}
