import { NextRequest, NextResponse } from "next/server";
import { abacate, PRODUCTS } from "@/lib/abacatepay";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(request: NextRequest) {
  if (!abacate || !adminDb) {
    return NextResponse.json(
      { error: "Payment not configured" },
      { status: 500 },
    );
  }

  const { plan, mementoId, returnUrl } = await request.json();

  const productId = PRODUCTS[plan as keyof typeof PRODUCTS];
  if (!productId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const mementoDoc = await adminDb.collection("mementos").doc(mementoId).get();
  if (!mementoDoc.exists) {
    return NextResponse.json({ error: "Memento not found" }, { status: 404 });
  }

  const checkout = await abacate.checkouts.create({
    items: [{ id: productId, quantity: 1 }],
    externalId: mementoId,
    returnUrl: returnUrl || `${request.nextUrl.origin}/plans?mementoId=${mementoId}`,
    completionUrl: `${request.nextUrl.origin}/m/${mementoId}`,
    methods: ["PIX", "CARD"],
  });

  return NextResponse.json({ url: checkout.data.url });
}
