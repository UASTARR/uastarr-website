'use client';
import { useCart, formatPrice } from '@/app/contexts/CartContext';
import Link from 'next/link';
import { useState } from 'react';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-40">
        <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70">
          <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 text-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-xl">Your cart is empty</p>
              <p className="mt-2">
                Add some items to your cart to see them here.
              </p>
            </div>
            <Link href="/merch">
              <button className="bg-yellow-500 hover:bg-white hover:text-black transition-all text-black font-semibold py-2 px-6 rounded-full">
                Browse Merch
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70">
        <h1 className="text-3xl font-bold text-white mb-6">Your Cart</h1>

        {/* Cart Items */}
        <div className="divide-y divide-gray-700">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="py-6 flex flex-col sm:flex-row items-start sm:items-center"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  {item.name}
                </h3>
                <p className="text-gray-400 mt-1">Size: {item.size}</p>
                <p className="text-lime-600 mt-1">${formatPrice(item.price)}</p>
              </div>

              <div className="flex items-center mt-4 sm:mt-0">
                {/* Quantity Controls */}
                <div className="flex items-center mr-4">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.size,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-l hover:bg-gray-600"
                  >
                    -
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center bg-gray-800 text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.size, item.quantity + 1)
                    }
                    className="w-8 h-8 flex items-center justify-center bg-gray-700 text-white rounded-r hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-400"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-white text-lg font-semibold">Total:</span>
            <span className="text-lime-600 text-2xl font-bold">
              ${formatPrice(getCartTotal())}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => clearCart()}
              className="hidden lg:block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              Clear Cart
            </button>

            <button
              className="px-6 py-3 bg-yellow-500 hover:bg-white hover:text-black text-black font-semibold rounded-full transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
