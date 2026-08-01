"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface OrderConfirmation {
  orderId: string;
  message: string;
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null
  );

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    const message = searchParams.get("message");

    if (orderId && message) {
      setConfirmation({
        orderId: decodeURIComponent(orderId),
        message: decodeURIComponent(message),
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-light mb-2 text-gray-900">
          Thank You for Your Order!
        </h1>
        <p className="text-gray-600 mb-6">
          {confirmation?.message || "Your order has been received."}
        </p>

        {/* Order ID */}
        {confirmation?.orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-600 mb-1">Order ID</p>
            <p className="font-mono text-sm text-gray-900 break-all">
              {confirmation.orderId}
            </p>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">What's next?</span>
            <br />
            We've received your order and will review your request. You'll hear
            from us soon at the email or phone number you provided.
          </p>
        </div>

        {/* Return Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-amber-900 text-white hover:bg-amber-800 transition font-medium rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}