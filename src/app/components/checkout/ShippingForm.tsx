'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormData } from '@/app/types/checkout';

interface ShippingFormProps {
  onSubmit: (data: CheckoutFormData, recaptchaToken: string | null) => void;
  isSubmitting: boolean;
}

const ShippingForm = ({ onSubmit, isSubmitting }: ShippingFormProps) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const dataSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;

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

  const handleFormSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    onSubmit(data, recaptchaToken);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
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
            <label htmlFor="postalCode" className="block text-gray-300 mb-1">
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
            <span className="text-yellow-500">Terms and Conditions</span> and{' '}
            <span className="text-yellow-500">Privacy Policy</span>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm">{errors.agreeToTerms.message}</p>
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

      {/* Continue to Payment Button */}
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
            Setting Up Payment...
          </div>
        ) : (
          'Continue to Payment'
        )}
      </button>
    </form>
  );
};

export default ShippingForm;
