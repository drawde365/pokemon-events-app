import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { normalizeStringArray } from "@/lib/event-arrays";

function normalizeEventArrays<T extends { agenda?: unknown; tags?: unknown }>(
  event: T,
): T & { agenda: string[]; tags: string[] } {
  return {
    ...event,
    agenda: normalizeStringArray(event.agenda),
    tags: normalizeStringArray(event.tags),
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  await connectDB();
  const { slug } = await params;
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return NextResponse.json(
      { message: "Invalid or missing slug parameter" },
      { status: 400 },
    );
  }
  const sanitizedSlug = slug.trim().toLowerCase();
  try {
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();
    return NextResponse.json(
      { event: event ? normalizeEventArrays(event) : null },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the event" },
      { status: 500 },
    );
  }
}
