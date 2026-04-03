import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// GET itinerary for a safari
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const itinerary = await prisma.itineraryDay.findMany({
      where: { safariId: id },
      orderBy: { day: 'asc' },
    });
    
    return NextResponse.json(itinerary);
  } catch (error) {
    console.error('Error fetching itinerary:', error);
    return NextResponse.json({ error: 'Failed to fetch itinerary' }, { status: 500 });
  }
}

// ADD itinerary day
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    
    const day = await prisma.itineraryDay.create({
      data: {
        safariId: id,
        day: data.day,
        title: data.title,
        description: data.description,
      },
    });
    
    return NextResponse.json(day, { status: 201 });
  } catch (error) {
    console.error('Error creating itinerary day:', error);
    return NextResponse.json({ error: 'Failed to create itinerary day' }, { status: 500 });
  }
}

// UPDATE all itinerary days
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const days = await req.json();
    
    // Delete existing itinerary
    await prisma.itineraryDay.deleteMany({ where: { safariId: id } });
    
    // Create new itinerary
    const created = await prisma.itineraryDay.createMany({
      data: days.map((day: any, index: number) => ({
        safariId: id,
        day: index + 1,
        title: day.title,
        description: day.description,
      })),
    });
    
    return NextResponse.json(created);
  } catch (error) {
    console.error('Error updating itinerary:', error);
    return NextResponse.json({ error: 'Failed to update itinerary' }, { status: 500 });
  }
}
