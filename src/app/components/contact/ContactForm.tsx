'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Popup from './Popup';

const schema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.enum(
    [
      'member_inquiry',
      'sponsorship_inquiry',
      'donation_inquiry',
      'event_inquiry',
      'other',
    ],
    { errorMap: () => ({ message: 'Please select a subject' }) }
  ),
  know: z.string().optional(),
  subscribe: z.boolean().optional(),
  message: z.string().min(1, 'Please leave a message'),
});

export type FormSchema = z.infer<typeof schema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (!recaptchaToken) {
      setRecaptchaError(true);
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        const result = await response.json();
        setPopupMessage(result.message || 'Form submitted successfully!');
      } else {
        const errorData = await response.json();

        setPopupMessage(
          errorData.error || 'An error occurred while submitting.'
        );
      }
    } catch (error) {
      console.error('Network error submitting form:', error);
      setPopupMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
      {popupMessage && (
        <Popup
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
          duration={5000}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label htmlFor="firstname" className="block font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              {...register('firstname')}
              className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
            />
            {errors.firstname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="lastname" className="block font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              {...register('lastname')}
              className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block font-medium pb-3">
            Subject
          </label>
          <select
            id="subject"
            {...register('subject')}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
          >
            <option value="" disabled hidden>
              Choose an option
            </option>
            <option value="member_inquiry">
              Membership Application Inquiry
            </option>
            <option value="sponsorship_inquiry">Sponsorship Inquiry</option>
            <option value="donation_inquiry">Donation Inquiry</option>
            <option value="event_inquiry">Event Inquiry</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="know" className="block font-medium">
            How did you hear about us? (optional)
          </label>
          <input
            type="text"
            id="know"
            {...register('know')}
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium">
            Leave a Message
          </label>
          <textarea
            id="message"
            {...register('message')}
            rows={5}
            className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('subscribe')}
              className="mr-2"
            />
            Subscribe to the STARR newsletter
          </label>
        </div>

        {/* reCAPTCHA */}
        {isClient && (
          <div className="mt-4">
            <div
              className="g-recaptcha"
              data-sitekey="6Lfo_HAqAAAAAJcPuy-kssLrQTa5K6BhRfqDAVZT"
              data-callback="onRecaptchaSuccess"
            ></div>
            {recaptchaError && (
              <p className="text-red-500 text-sm mt-1">
                Please complete the reCAPTCHA.
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className={`mt-4 px-6 py-3 bg-yellow-500 text-white font-medium rounded flex items-center justify-center ${
            isSubmitting
              ? 'opacity-75 cursor-not-allowed'
              : 'hover:bg-yellow-600'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div
                className="w-5 h-5 border-2 mr-4
                        border-t-transparent rounded-full 
                        animate-spin"
              ></div>
              Processing...
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
