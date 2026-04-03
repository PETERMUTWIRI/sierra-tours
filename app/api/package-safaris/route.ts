import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const itineraryDaySchema = z.object({
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

// GET /api/package-safaris
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageTypeId = searchParams.get("packageTypeId");
    const published = searchParams.get("published");
    const featured = searchParams.get("featured");

    const where: any = {};
    if (packageTypeId) where.packageTypeId = packageTypeId;
    if (published !== null) where.published = published === "true";
    if (featured !== null) where.featured = featured === "true";

    const safaris = await prisma.packageSafari.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: {
        packageType: {
          select: {
            name: true,
            slug: true,
            category: true,
          },
        },
        _count: {
          select: { itinerary: true, gallery: true },
        },
      },
    });

    return NextResponse.json(safaris);
  } catch (error) {
    console.error("Error fetching package safaris:", error);
    return NextResponse.json(
      { error: "Failed to fetch package safaris" },
      { status: 500 }
    );
  }
}

// POST /api/package-safaris
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = packageSafariSchema.parse(body);

    const { itinerary, ...safariData } = validatedData;

    const safari = await prisma.packageSafari.create({
      data: {
        ...safariData,
        itinerary: {
          create: itinerary,
        },
      },
      include: {
        itinerary: true,
      },
    });

    return NextResponse.json(safari, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating package safari:", error);
    return NextResponse.json(
      { error: "Failed to create package safari" },
      { status: 500 }
    );
  }
}
