import React from 'react';
import { Metadata } from 'next';
import FirefliesBackground from '@/app/components/videos/FirefliesBackground';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import ReCaptchaApi from '@/app/components/scripts/ReCaptchaApi';
import CheckoutForm from '@/app/components/checkout/CheckoutForm';

export const metadata: Metadata = {
  title: 'Checkout | UASTARR',
};

const CheckoutPage = () => {
  return (
    <main className="min-h-screen pt-40 pb-20">
      <BaseScripts />
      <FirefliesBackground />
      <ReCaptchaApi />

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-black bg-opacity-70 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Checkout</h1>
          <div className="text-gray-300 mb-8">
            <p>Please enter your shipping details to complete your order.</p>
          </div>

          <CheckoutForm />
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
