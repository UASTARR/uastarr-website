'use client';
import { useCart } from '@/app/contexts/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CartIcon = () => {
  const { getItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const count = getItemCount();

    if (count > itemCount) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    setItemCount(count);
  }, [getItemCount, itemCount]);

  if (itemCount === 0) {
    return null;
  }

  return (
    <Link href="/cart">
      <div className="relative group">
        <div
          className={`p-2 rounded-full transition-all ${
            isAnimating ? 'scale-110' : ''
          }`}
        >
          {/* Shopping cart icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-yellow-400 group-hover:text-white transition-colors"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>

          {/* Item count badge */}
          <div className="absolute -top-1 -right-1 bg-yellow-500 text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
            {itemCount}
          </div>
        </div>

        {/* Tooltip */}
        <div className="absolute right-0 -bottom-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          View Cart
        </div>
      </div>
    </Link>
  );
};

export default CartIcon;
