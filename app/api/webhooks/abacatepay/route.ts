import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { adminDb } from "@/lib/firebase-admin";


const ABACATEPAY_PUBLIC_KEY =
  "t9dXRhHHo3yDEj5pVDYz0frf7q6bMKyMRmxxCPIPp3RCplBfXRxqlC6ZpiWmOqj4L63qEaeUOtrCI8P0VMUgo6iIga2ri9ogaHFs0WIIywSMg0q7RmBfybe1E5XJcfC4IW3alNqym0tXoAKkzvfEjZxV6bE0oG2zJrNNYmUCKZyV0KZ3JS8Votf9EAWWYdiDkMkpbMdPggfh1EqHlVkMiTady6jOR3hyzGEHrIz2Ret0xHKMbiqkr9HS1JhNHDX9";

function verifySignature(rawBody: string, signatureFromHeader: string) {
  const bodyBuffer = Buffer.from(rawBody, "utf8");
  const expectedSig = crypto
    .createHmac("sha256", ABACATEPAY_PUBLIC_KEY)
    .update(bodyBuffer)
    .digest("base64");

  const A = Buffer.from(expectedSig);
  const B = Buffer.from(signatureFromHeader);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
}

const PLAN_DURATION: Record<string, number> = {
  weekly: 7 * 24 * 60 * 60 * 1000,
  yearly: 365 * 24 * 60 * 60 * 1000,
};

export async function POST(request: NextRequest) {
  const webhookSecret = request.nextUrl.searchParams.get("webhookSecret");
  if (webhookSecret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const signature = request.headers.get("X-Webhook-Signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const rawBody = await request.text();
  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = JSON.parse(rawBody);
  const { event, data } = body;

  if (event !== "checkout.completed" || !data?.externalId) {
    return NextResponse.json({ success: true });
  }

  const mementoId = data.externalId;
  const productId = data.items?.[0]?.id;

  const plan = productId === process.env.NEXT_PUBLIC_ABACATEPAY_PRODUCT_WEEKLY_ID
    ? "weekly" as const
    : productId === process.env.NEXT_PUBLIC_ABACATEPAY_PRODUCT_YEARLY_ID
      ? "yearly" as const
      : null;

  if (!plan || !adminDb) {
    return NextResponse.json({ success: true });
  }

  const expiresAt = Date.now() + PLAN_DURATION[plan];

  await adminDb.collection("mementos").doc(mementoId).update({
    plan,
    expiresAt,
    paymentStatus: "paid",
  });

  return NextResponse.json({ success: true });
}
