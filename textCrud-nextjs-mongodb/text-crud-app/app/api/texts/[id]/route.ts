// app/api/texts/[id]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db("textdb");
  await db.collection("texts").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const db = client.db("textdb");
  const { content } = await req.json();
  await db
    .collection("texts")
    .updateOne({ _id: new ObjectId(params.id) }, { $set: { content } });
  return NextResponse.json({ ok: true });
}
