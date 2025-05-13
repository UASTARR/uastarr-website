'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCart, formatPrice } from '@/app/contexts/CartContext';
import Popup from '@/app/components/contact/Popup';

const checkoutSchema = z.object({
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),

  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(5, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(5, 'Valid postal code is required'),
  country: z.string().min(1, 'Country is required'),

  notes: z.string().optional(),

  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const dataSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  // Setup recaptcha
  useEffect(() => {
    setIsClient(true);

    const handleRecaptchaCallback = (token: string) => {
      setRecaptchaToken(token);
      setRecaptchaError(false);
    };

    (window as any).onRecaptchaSuccess = handleRecaptchaCallback;

    return () => {
      (window as any).onRecaptchaSuccess = null;
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      country: 'Canada',
    },
  });
  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.05; // 5% GST for Alberta
  const total = subtotal + shipping + tax;

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    setIsSubmitting(true);
    setPaymentProcessing(true);

    try {
      // 1. Create payment intent with Stripe
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'cad',
        }),
      });
      if (!paymentResponse.ok) {
        throw new Error('Payment setup failed');
      }

      const { clientSecret } = await paymentResponse.json();

      // 2. Submit the order with shipping details
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingDetails: data,
          cart: cart,
          paymentDetails: {
            clientSecret,
            amount: total,
          },
          recaptchaToken,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderResult = await orderResponse.json();

      // 3. Success handling
      setPopupMessage(
        'Order placed successfully! Redirecting to confirmation...'
      );
      clearCart();

      setTimeout(() => {
        router.push(`/order-confirmation/${orderResult.orderId}`);
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      setPopupMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred during checkout'
      );
    } finally {
      setIsSubmitting(false);
      setPaymentProcessing(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
          duration={5000}
        />
      )}

      {/* Form Section */}
      <div className="flex-1 z-50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="p-6 bg-gray-900 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="p-6 bg-gray-900 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Shipping Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register('address')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register('city')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="province" className="block text-gray-300 mb-1">
                  Province
                </label>
                <select
                  id="province"
                  {...register('province')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                >
                  <option value="">Select Province</option>
                  <option value="AB">Alberta</option>
                  <option value="BC">British Columbia</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="ON">Ontario</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="QC">Quebec</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="YT">Yukon</option>
                </select>
                {errors.province && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-gray-300 mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  {...register('postalCode')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-gray-300 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  {...register('country')}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  readOnly
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Notes */}
          <div className="p-6 bg-gray-900 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Additional Information
            </h2>

            <div>
              <label htmlFor="notes" className="block text-gray-300 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                rows={3}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                placeholder="Special instructions for your order"
              ></textarea>
            </div>
          </div>

          {/* Terms and reCAPTCHA */}
          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeToTerms"
                {...register('agreeToTerms')}
                className="mt-1 mr-2"
              />
              <label htmlFor="agreeToTerms" className="text-gray-300">
                I agree to the{' '}
                <span className="text-yellow-500">Terms and Conditions</span>{' '}
                and <span className="text-yellow-500">Privacy Policy</span>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms.message}
              </p>
            )}

            {/* reCAPTCHA */}
            {isClient && (
              <div className="mt-4">
                <div
                  className="g-recaptcha"
                  data-sitekey={dataSiteKey}
                  data-callback="onRecaptchaSuccess"
                ></div>
                {recaptchaError && (
                  <p className="text-red-500 text-sm mt-1">
                    Please complete the reCAPTCHA verification.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 font-semibold rounded-lg ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600 text-black'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                {paymentProcessing
                  ? 'Processing Payment...'
                  : 'Placing Order...'}
              </div>
            ) : (
              'Place Order'
            )}
          </button>
        </form>
      </div>

      {/* Order Summary Section */}
      <div className="lg:w-1/3">
        <div className="sticky top-24 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between"
              >
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
      </div>
    </div>
  );
};

export default CheckoutForm;
