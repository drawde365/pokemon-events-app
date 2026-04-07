import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Buffer } from "node:buffer";
import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";
import { normalizeStringArray } from "@/lib/event-arrays";

function getRequiredString(formData: FormData, key: string): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    throw new Error(`Field "${key}" is required`);
  }

  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`Field "${key}" cannot be empty`);
  }

  return trimmed;
}

function parseStringArray(formData: FormData, key: string): string[] {
  const values = formData.getAll(key).flatMap((value) => normalizeStringArray(value));

  if (values.length === 0) {
    throw new Error(`Field "${key}" must contain at least one value`);
  }

  return values;
}

function normalizeEventArrays<T extends { agenda?: unknown; tags?: unknown }>(
  event: T,
): T & { agenda: string[]; tags: string[] } {
  return {
    ...event,
    agenda: normalizeStringArray(event.agenda),
    tags: normalizeStringArray(event.tags),
  };
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    let event;
    try {
      event = {
        title: getRequiredString(formData, "title"),
        description: getRequiredString(formData, "description"),
        overview: getRequiredString(formData, "overview"),
        venue: getRequiredString(formData, "venue"),
        location: getRequiredString(formData, "location"),
        date: getRequiredString(formData, "date"),
        time: getRequiredString(formData, "time"),
        mode: getRequiredString(formData, "mode"),
        audience: getRequiredString(formData, "audience"),
        organizer: getRequiredString(formData, "organizer"),
        agenda: parseStringArray(formData, "agenda"),
        tags: parseStringArray(formData, "tags"),
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid form data";
      return NextResponse.json({ message }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let uploadResult;
    try {
      uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "PokemonEvent" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          )
          .end(buffer);
      });
      console.log(uploadResult);
    } catch {
      return NextResponse.json(
        { message: "Unable to upload image" },
        { status: 500 },
      );
    }
    // typescript molestando
    event.image = (uploadResult as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event created successfully", id: createdEvent._id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create event", error);

    const message =
      error instanceof Error ? error.message : "Event creation failed";

    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = (await Event.find()
      .sort({ createdAt: -1 })
      .lean()).map((event) => normalizeEventArrays(event));
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch events", error);
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 },
    );
  }
}
