'use client';
import React from 'react';
import Link from 'next/link';

export default function PaymentFailed() {
  return (
    <main className="min-h-screen pt-40">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-black bg-opacity-70">
        <h1 className="text-3xl font-bold text-white mb-6">Payment Failed</h1>

        <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-red-900 text-red-300 p-3 rounded-full">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <p className="text-gray-300 mb-6">
            We're sorry, but your payment could not be processed. This could be
            due to:
          </p>

          <ul className="text-left text-gray-300 mb-8 space-y-2 max-w-md mx-auto">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Insufficient funds in your account</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Incorrect card information</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Your card issuer declined the transaction</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>A temporary technical issue</span>
            </li>
          </ul>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/checkout"
              className="bg-yellow-500 hover:bg-white hover:text-black transition-all text-black py-3 px-6 rounded-full font-semibold"
            >
              Try Again
            </Link>
            <Link
              href="/merch"
              className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-full font-semibold transition-colors"
            >
              Return to Store
            </Link>
          </div>

          <p className="mt-8 text-gray-400 text-sm">
            If you continue to experience issues, please contact our support
            team for assistance.
          </p>
        </div>
      </div>
    </main>
  );
}
