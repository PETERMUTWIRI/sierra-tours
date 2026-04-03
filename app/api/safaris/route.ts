import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET all safaris
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const destination = searchParams.get('destination');
    const published = searchParams.get('published');
    
    const where: any = {};
    if (destination) where.destinationId = destination;
    if (published !== null) where.published = published === 'true';
    
    const safaris = await prisma.safari.findMany({
      where,
      include: { destination: true },
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(safaris);
  } catch (error) {
    console.error('Error fetching safaris:', error);
    return NextResponse.json({ error: 'Failed to fetch safaris' }, { status: 500 });
  }
}

// CREATE new safari
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Check if slug exists
    const existing = await prisma.safari.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'A safari with this title already exists' }, { status: 400 });
    }
    
    const safari = await prisma.safari.create({
      data: {
        title: data.title,
        slug,
        destinationId: data.destinationId,
        duration: data.duration,
        price: parseFloat(data.price),
        currency: data.currency,
        excerpt: data.excerpt,
        description: data.description,
        image: data.image,
        groupSize: data.groupSize,
        accommodation: data.accommodation,
        activities: data.activities || [],
        includes: data.includes || [],
        excludes: data.excludes || [],
        highlights: data.highlights || [],
        published: data.published || false,
        featured: data.featured || false,
      },
    });
    
    return NextResponse.json(safari, { status: 201 });
  } catch (error) {
    console.error('Error creating safari:', error);
    return NextResponse.json({ error: 'Failed to create safari' }, { status: 500 });
  }
}
