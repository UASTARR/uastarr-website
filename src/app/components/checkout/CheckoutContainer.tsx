'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/contexts/CartContext';
import ShippingForm from './ShippingForm';
import { PaymentForm } from './StripeComponents';
import OrderSummary from './OrderSummary';
import Popup from '@/app/components/contact/Popup';
import { CheckoutFormData, CartItemBase } from '@/app/types/checkout';
import { StripeError } from '@stripe/stripe-js';

const CheckoutContainer = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [shippingData, setShippingData] = useState<CheckoutFormData | null>(
    null
  );
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  const handleShippingSubmit = async (
    data: CheckoutFormData,
    recaptchaToken: string | null
  ) => {
    if (!recaptchaToken) {
      setPopupMessage('Please complete the reCAPTCHA verification.');
      return;
    }
    setIsSubmitting(true);

    try {
      setShippingData(data);

      const cartItems: CartItemBase[] = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size,
      }));
      const paymentResponse = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recaptchaToken: recaptchaToken,
          items: cartItems,
          currency: 'cad',
        }),
      });
      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || 'Payment setup failed');
      }

      const { clientSecret } = await paymentResponse.json();
      setClientSecret(clientSecret);
      setStep('payment');
    } catch (error) {
      console.error('Error setting up payment:', error);
      setPopupMessage(
        error instanceof Error ? error.message : 'An error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    if (!shippingData || !clientSecret) return;
    setIsSubmitting(true);

    try {
      const cartItems: CartItemBase[] = cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size,
      }));
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingDetails: shippingData,
          items: cartItems,
          paymentDetails: {
            paymentIntentId: paymentIntent.id,
          },
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      const orderResult = await orderResponse.json();

      setPopupMessage(
        'Order placed successfully! Redirecting to confirmation...'
      );
      clearCart();

      setTimeout(() => {
        router.push(`/order-confirmation/${orderResult.orderId}`);
      }, 2000);
    } catch (error) {
      console.error('Order creation error:', error);
      setPopupMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred during checkout'
      );

      setTimeout(() => {
        router.push('/payment-failed');
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentError = (error: Error | StripeError) => {
    console.error('Payment error:', error);
    setPopupMessage(`Payment failed: ${error.message}`);

    setTimeout(() => {
      router.push('/payment-failed');
    }, 2500);
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
      <div className="flex-1 z-40">
        {step === 'shipping' ? (
          <ShippingForm
            onSubmit={handleShippingSubmit}
            isSubmitting={isSubmitting}
          />
        ) : (
          <PaymentForm
            clientSecret={clientSecret!}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onBack={() => setStep('shipping')}
            isSubmitting={isSubmitting}
          />
        )}
      </div>

      {/* Order Summary Section */}
      <div className="lg:w-1/3">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutContainer;
