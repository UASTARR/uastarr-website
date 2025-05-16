'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/app/contexts/CartContext';

interface Order {
  orderId: string;
  shippingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    size: string;
    price: number;
    imageUrl?: string;
  }>;
  pricing: {
    subtotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  status: string;
  createdAt: string;
}

export default function OrderConfirmation({
  params,
}: {
  params: { orderId: string };
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${params.orderId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch order');
        }

        const orderData = await response.json();
        setOrder(orderData);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }

    if (params.orderId) {
      fetchOrder();
    }
  }, [params.orderId]);

  if (isLoading) {
    return (
      <main className="min-h-screen pt-40">
        <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen pt-40">
        <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70">
          <h1 className="text-3xl font-bold text-white mb-6">Order Error</h1>
          <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Order Error
            </h2>
            <p className="text-white mb-6">
              {error || 'Unable to find your order'}
            </p>
            <Link
              href="/merch"
              className="inline-block bg-yellow-500 hover:bg-white hover:text-black transition-all text-black py-3 px-6 rounded-full font-semibold"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70">
        <h1 className="text-3xl font-bold text-white mb-6">
          Order Confirmation
        </h1>

        <div className="bg-black bg-opacity-50 p-8 rounded-lg">
          <div className="flex justify-center mb-8">
            <div className="bg-green-900 text-green-300 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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

          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Thank You For Your Order!
          </h2>
          <p className="text-gray-400 text-center mb-8">
            A confirmation has been sent to {order.shippingDetails.email}
          </p>

          <div className="border border-gray-700 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Order Information
                </h3>
                <p className="text-gray-400">
                  Order #{order.orderId.substring(0, 8).toUpperCase()}
                </p>
                <p className="text-gray-400">Placed on {formattedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">Order Status:</p>
                <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <h3 className="text-lg font-semibold text-white mb-3">Items</h3>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.size}-${index}`}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-14 h-14 object-cover"
                        />
                      ) : (
                        <div className="text-gray-500 text-xs text-center">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.name}</p>
                      <p className="text-gray-400">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-lime-600">
                      ${formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Shipping Address
              </h3>
              <p className="text-gray-300">
                {order.shippingDetails.firstName}{' '}
                {order.shippingDetails.lastName}
              </p>
              <p className="text-gray-300">{order.shippingDetails.address}</p>
              <p className="text-gray-300">
                {order.shippingDetails.city}, {order.shippingDetails.province}{' '}
                {order.shippingDetails.postalCode}
              </p>
              <p className="text-gray-300">{order.shippingDetails.country}</p>
            </div>

            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">
                Order Summary
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">
                    ${formatPrice(order.pricing.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-white">
                    {order.pricing.shipping === 0
                      ? 'Free'
                      : `$${formatPrice(order.pricing.shipping)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">GST (5%)</span>
                  <span className="text-white">
                    ${formatPrice(order.pricing.tax)}
                  </span>
                </div>
                <div className="border-t border-gray-700 mt-2 pt-2 flex justify-between">
                  <span className="text-lg font-semibold text-white">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-lime-500">
                    ${formatPrice(order.pricing.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Link
              href="/merch"
              className="bg-yellow-500 hover:bg-white hover:text-black transition-all text-black py-3 px-6 rounded-full font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
