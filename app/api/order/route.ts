import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { OrderPayload } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: OrderPayload = await request.json();

    if (!body.customer || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    const { customer, items } = body;

    if (
      !customer.fullName ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.parish
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields" },
        { status: 400 }
      );
    }

    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order: OrderPayload & { createdAt?: any } = {
      customer,
      items,
      total: calculatedTotal,
      createdAt: serverTimestamp(),
    };

    // Save to Firestore
    const ordersCollection = collection(db, "orders");
    const docRef = await addDoc(ordersCollection, order);

    return NextResponse.json({ 
      success: true,
      orderId: docRef.id,
      message: "Order received! We'll be in touch soon."
    });
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process order request",
      },
      { status: 500 }
    );
  }
}
