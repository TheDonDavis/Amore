"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";

interface OrderItem {
  name: string;
  size: string;
  concentration: string;
  price: number;
  quantity: number;
}

interface Customer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  parish: string;
  notes?: string;
}

interface Order {
  id: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  createdAt: any;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ordersCollection = collection(db, "orders");
    const q = query(ordersCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersList: Order[] = [];
        snapshot.forEach((doc) => {
          ordersList.push({
            id: doc.id,
            ...doc.data(),
          } as Order);
        });
        setOrders(ordersList);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-light mb-8">Loading orders...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light">Orders</h1>
          <Link
            href="/"
            className="px-6 py-2 border border-amber-900 text-amber-900 hover:bg-amber-50 transition"
          >
            Back to Store
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {order.customer.fullName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Order ID: {order.id.slice(0, 8)}...
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-900">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.createdAt
                          ? new Date(
                              order.createdAt.toDate?.() || order.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {order.customer.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {order.customer.phone}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {order.customer.address}
                      </p>
                      <p>
                        <span className="font-medium">Parish:</span>{" "}
                        {order.customer.parish}
                      </p>
                      {order.customer.notes && (
                        <p>
                          <span className="font-medium">Notes:</span>{" "}
                          {order.customer.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Items Ordered
                    </h3>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span>
                            {item.name} ({item.size} · {item.concentration}) ×{" "}
                            {item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
