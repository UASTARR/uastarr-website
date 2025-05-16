'use client';
import React, { useState } from 'react';
import {
  loadStripe,
  StripeElementsOptions,
  StripeError,
} from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export const StripeProvider = ({
  clientSecret,
  children,
}: {
  clientSecret: string;
  children: React.ReactNode;
}) => {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#eab308', // yellow-500
        colorBackground: '#111827', // gray-900
        colorText: '#ffffff',
        colorDanger: '#ef4444', // red-500
        fontFamily: 'Montserrat, sans-serif',
        borderRadius: '6px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};

interface StripePaymentFormProps {
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error | StripeError) => void;
  isSubmitting?: boolean;
}

export const StripePaymentForm = ({
  onSuccess,
  onError,
  isSubmitting = false,
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }
    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(
          error.message || 'An error occurred with your payment.'
        );
        onError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      } else {
        setErrorMessage(
          'Payment status is pending or requires additional steps.'
        );
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      onError(err instanceof Error ? err : new Error('Unknown payment error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const isDisabled = !stripe || !elements || isProcessing || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />

      {errorMessage && (
        <div className="p-3 bg-red-900 text-white rounded-md">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isDisabled}
        className={`w-full p-3 font-semibold rounded-lg ${
          isDisabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-yellow-500 hover:bg-yellow-600 text-black'
        }`}
      >
        {isProcessing || isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing Payment
          </div>
        ) : (
          'Pay Now'
        )}
      </button>
    </form>
  );
};

export const PaymentForm = ({
  clientSecret,
  onSuccess,
  onError,
  onBack,
  isSubmitting = false,
}: {
  clientSecret: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: Error | StripeError) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}) => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-6">
        Payment Information
      </h2>

      {clientSecret ? (
        <StripeProvider clientSecret={clientSecret}>
          <StripePaymentForm
            onSuccess={onSuccess}
            onError={onError}
            isSubmitting={isSubmitting}
          />
        </StripeProvider>
      ) : (
        <div className="flex justify-center p-8">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <button
        onClick={onBack}
        disabled={isSubmitting}
        className={`mt-4 text-gray-400 hover:text-white ${
          isSubmitting ? 'cursor-not-allowed' : ''
        }`}
      >
        ← Back to shipping information
      </button>
    </div>
  );
};
