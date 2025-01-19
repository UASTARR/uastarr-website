'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  message: z.string().optional(),
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
    console.log('Submitting form:', data);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        const errorData = await response.json();
        console.error('Error submitting form:', errorData.error);
      }
    } catch (error) {
      console.error('Network error submitting form:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
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
          className="mt-4 px-6 py-3 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
