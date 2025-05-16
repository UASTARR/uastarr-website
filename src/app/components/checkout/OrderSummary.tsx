'use client';
import React from 'react';
import { useCart, formatPrice } from '@/app/contexts/CartContext';

const OrderSummary = () => {
  const { cart, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.05; // 5% GST for Alberta
  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-24 p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={`${item.id}-${item.size}`} className="flex justify-between">
            <div>
              <p className="text-white">
                {item.name}{' '}
                <span className="text-gray-400">
                  ({item.size}) x {item.quantity}
                </span>
              </p>
            </div>
            <p className="text-white">
              ${formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-300">Subtotal</span>
          <span className="text-white">${formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Shipping</span>
          <span className="text-white">
            {shipping === 0 ? 'Free' : `$${formatPrice(shipping)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">GST (5%)</span>
          <span className="text-white">${formatPrice(tax)}</span>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold text-white">Total</span>
          <span className="text-lg font-semibold text-lime-500">
            ${formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
