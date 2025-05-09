'use client';
import { useState, useEffect } from 'react';
import { useCart, CartItem } from '@/app/contexts/CartContext';

interface ProductControlsProps {
  id: string;
  name: string;
  price: number;
  availableSizesLetters: string[];
}

const formatPrice = (price: number): string => {
  // Round up to the nearest cent
  const roundedPrice = Math.ceil(price * 100) / 100;

  if (roundedPrice % 1 === 0) {
    return roundedPrice.toString();
  } else {
    return roundedPrice.toFixed(2);
  }
};

const ProductControls = ({
  id,
  name,
  price,
  availableSizesLetters = ['U'],
}: ProductControlsProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    availableSizesLetters[0] || 'U'
  );
  const [addedToCart, setAddedToCart] = useState(false);

  availableSizesLetters =
    availableSizesLetters.length > 0 ? availableSizesLetters : ['U'];

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: id,
      name: name,
      price: price,
      quantity: quantity,
      size: selectedSize,
    };

    addToCart(cartItem);
    setAddedToCart(true);
    setQuantity(1);
  };

  const totalPrice = formatPrice(price * quantity);

  return (
    <div className="flex-1 flex-col space-y-10 justify-around items-start">
      {/* Price */}
      <div className="mt-0 space-y-2 self-start">
        <p className="text-gray-300 mb-1 font-semibold">
          Price{quantity > 1 ? ` (${quantity} items)` : ''}:
        </p>
        <p className="text-3xl font-semibold text-lime-600">{`$${totalPrice}`}</p>
      </div>

      {/* Size Selector */}
      <div>
        <label className="text-gray-300 font-semibold">Size:</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {availableSizesLetters.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 rounded-md border ${
                selectedSize === size
                  ? 'bg-yellow-500 text-black border-yellow-500'
                  : 'bg-transparent text-white border-gray-500 hover:border-white'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-row items-start lg:items-center">
        {/* Quantity Selector */}
        <div className="relative">
          <label className="absolute bottom-10 text-gray-300 font-semibold">
            Quantity:
          </label>
          <div className="flex items-center mt-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 bg-gray-700 text-white rounded-l-md hover:bg-gray-600"
            >
              -
            </button>
            <span className="w-10 text-center py-1 bg-gray-800 text-white">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded-r-md hover:bg-gray-600"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="relative flex flex-col">
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`whitespace-nowrap ${
              addedToCart
                ? 'bg-gray-300 hover:bg-gray-300'
                : 'bg-yellow-500 hover:bg-white'
            } hover:text-black transition-all rounded-full w-40 h-12 flex items-center justify-center font-semibold`}
          >
            Add to Cart
          </button>
          {addedToCart && (
            <span className="absolute top-14 text-green-500 mt-2 text-sm">
              Added to cart!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductControls;
