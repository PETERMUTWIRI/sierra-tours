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

// GET /api/package-types/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const packageType = await prisma.packageType.findUnique({
      where: { id },
      include: {
        _count: {
          select: { safaris: true },
        },
      },
    });

    if (!packageType) {
      return NextResponse.json(
        { error: "Package type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(packageType);
  } catch (error) {
    console.error("Error fetching package type:", error);
    return NextResponse.json(
      { error: "Failed to fetch package type" },
      { status: 500 }
    );
  }
}

// PUT /api/package-types/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = packageTypeSchema.parse(body);

    const packageType = await prisma.packageType.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(packageType);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating package type:", error);
    return NextResponse.json(
      { error: "Failed to update package type" },
      { status: 500 }
    );
  }
}

// DELETE /api/package-types/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.packageType.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting package type:", error);
    return NextResponse.json(
      { error: "Failed to delete package type" },
      { status: 500 }
    );
  }
}
