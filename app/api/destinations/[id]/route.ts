import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET single destination
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const destination = await prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      return NextResponse.json({ error: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 });
  }
}

// UPDATE destination
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    // Check for slug conflict if slug is being changed
    if (data.slug) {
      const existing = await prisma.destination.findUnique({
        where: { slug: data.slug },
      });
      if (existing && existing.id !== id) {
        return NextResponse.json(
          { error: 'A destination with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const destination = await prisma.destination.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        tagline: data.tagline,
        description: data.description,
        image: data.image,
        heroImage: data.heroImage,
        highlights: data.highlights || [],
        bestTimeToVisit: data.bestTimeToVisit,
        languages: data.languages || [],
        currency: data.currency,
        published: data.published,
      },
    });

    return NextResponse.json(destination);
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

// DELETE destination
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.destination.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}
