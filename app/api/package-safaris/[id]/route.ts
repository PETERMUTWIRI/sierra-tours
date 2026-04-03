import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const itineraryDaySchema = z.object({
  id: z.string().optional(),
  day: z.number(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  accommodation: z.string().default(""),
  meals: z.array(z.string()).default([]),
  activities: z.array(z.string()).default([]),
});

const packageSafariSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  packageTypeId: z.string().min(1, "Package type is required"),
  destinationId: z.string().optional(),
  duration: z.string().min(1, "Duration is required"),
  price: z.number().min(0, "Price must be positive"),
  priceFrom: z.boolean().default(true),
  currency: z.string().default("USD"),
  excerpt: z.string().min(1, "Excerpt is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  image: z.string().min(1, "Image is required"),
  groupSize: z.string().optional(),
  accommodation: z.string().optional(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  highlights: z.array(z.string()).default([]),
  includes: z.array(z.string()).default([]),
  excludes: z.array(z.string()).default([]),
  itinerary: z.array(itineraryDaySchema).default([]),
});

// GET /api/package-safaris/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const safari = await prisma.packageSafari.findUnique({
      where: { id },
      include: {
        packageType: true,
        destination: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        itinerary: {
          orderBy: { day: "asc" },
        },
        gallery: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!safari) {
      return NextResponse.json(
        { error: "Package safari not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(safari);
  } catch (error) {
    console.error("Error fetching package safari:", error);
    return NextResponse.json(
      { error: "Failed to fetch package safari" },
      { status: 500 }
    );
  }
}

// PUT /api/package-safaris/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = packageSafariSchema.parse(body);

    const { itinerary, ...safariData } = validatedData;

    // Update safari and replace itinerary
    const safari = await prisma.packageSafari.update({
      where: { id },
      data: {
        ...safariData,
        itinerary: {
          deleteMany: {},
          create: itinerary.map((day: any) => ({
            day: day.day,
            title: day.title,
            description: day.description,
            accommodation: day.accommodation,
            meals: day.meals,
            activities: day.activities,
          })),
        },
      },
      include: {
        itinerary: true,
      },
    });

    return NextResponse.json(safari);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating package safari:", error);
    return NextResponse.json(
      { error: "Failed to update package safari" },
      { status: 500 }
    );
  }
}

// DELETE /api/package-safaris/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.packageSafari.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting package safari:", error);
    return NextResponse.json(
      { error: "Failed to delete package safari" },
      { status: 500 }
    );
  }
}
