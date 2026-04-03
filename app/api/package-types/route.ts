import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const packageTypeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  description: z.string().optional(),
  category: z.enum(["THEMED", "LOCAL"]),
  icon: z.string().optional(),
  image: z.string().optional(),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

// GET /api/package-types
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    const where: any = {};
    if (category) where.category = category;
    if (published !== null) where.published = published === "true";

    const packageTypes = await prisma.packageType.findMany({
      where,
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: {
        _count: {
          select: { safaris: true },
        },
      },
    });

    return NextResponse.json(packageTypes);
  } catch (error) {
    console.error("Error fetching package types:", error);
    return NextResponse.json(
      { error: "Failed to fetch package types" },
      { status: 500 }
    );
  }
}

// POST /api/package-types
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = packageTypeSchema.parse(body);

    const packageType = await prisma.packageType.create({
      data: validatedData,
    });

    return NextResponse.json(packageType, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating package type:", error);
    return NextResponse.json(
      { error: "Failed to create package type" },
      { status: 500 }
    );
  }
}
