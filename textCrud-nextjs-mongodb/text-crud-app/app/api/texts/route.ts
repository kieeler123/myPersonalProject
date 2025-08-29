// app/api/texts/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("textdb");
  const texts = await db
    .collection("texts")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(texts);
}

export async function POST(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db("textdb");
  const { content } = await req.json();
  const inserted = await db
    .collection("texts")
    .insertOne({ content, createdAt: new Date() });

  return NextResponse.json({
    _id: inserted.insertedId.toString(),
    content,
  });
}
