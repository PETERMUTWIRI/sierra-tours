import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all destinations
export async function GET(req: NextRequest) {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' },
    });
    
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

// CREATE new destination
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if slug exists
    const existing = await prisma.destination.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A destination with this name already exists' }, { status: 400 });
    }
    
    const destination = await prisma.destination.create({
      data: {
        name: data.name,
        slug,
        tagline: data.tagline,
        description: data.description,
        image: data.image,
        heroImage: data.heroImage,
        highlights: data.highlights || [],
        bestTimeToVisit: data.bestTimeToVisit,
        languages: data.languages || [],
        currency: data.currency,
        published: data.published ?? true,
      },
    });
    
    return NextResponse.json(destination, { status: 201 });
  } catch (error) {
    console.error('Error creating destination:', error);
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}
