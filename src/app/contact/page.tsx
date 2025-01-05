import React from 'react';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import ReCaptchaApi from '@/app/components/scripts/ReCaptchaApi';
import { addResponse } from '@/library/google/api.js';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

const ContactPage = () => {
  async function submitForm(formData: FormData) {
    'use server';

    const data = {
      firstName: formData.get('firstname'),
      lastName: formData.get('lastname'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      know: formData.get('know'),
      subscribe: formData.get('subscribe'),
      message: formData.get('message'),
    };

    const dataArray = Object.values(data);

    if (await addResponse(dataArray)) {
      console.log('Message sent successfully!');
    } else {
      console.log('An error occurred. Please try again later.');
    }
    console.log(data);
  }

  return (
    <main className="relative bg-gray-900 text-white">
      <BaseScripts />
      <ReCaptchaApi />

      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video autoPlay muted loop className="w-full h-full object-cover">
          <source
            src="/assets/backgrounds/fireflies_background.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Header Section */}
      <div className="relative z-10 px-10 py-16">
        <h1 className="text-5xl font-bold mt-16">Contact Us</h1>
        <h2 className="mt-4 text-lg">
          Want to join us? Want to become a sponsor? Any other questions?
        </h2>
        <p className="mt-2">Let us know! We'd love to hear what you think.</p>
      </div>

      {/* Contact Form */}
      <div className="relative z-10 px-4">
        <div className="max-w-2xl mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
          <form action={submitForm} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label htmlFor="fname" className="block font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="fname"
                  name="firstname"
                  required
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lname" className="block font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lastname"
                  required
                  className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium pb-3">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                required
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
            </div>

            <div>
              <label htmlFor="know" className="block font-medium">
                How did you hear about us?
              </label>
              <input
                type="text"
                id="know"
                name="know"
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium">
                Leave a Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full py-2 border-b border-gray-300 focus:outline-none focus:border-yellow-500"
              ></textarea>
            </div>

            <div className="text-center">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  value="newsletter"
                  className="mr-2"
                />
                Subscribe to the STARR newsletter
              </label>
              <div
                className="g-recaptcha mt-4 flex justify-center"
                data-sitekey="6Leo32UpAAAAAJmvvWFtlNfapVA2bn_qxHIbO77J"
              ></div>
              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Banner */}
      <div className="relative z-10 bg-green-700 text-white py-6 px-10 text-2xl mt-24">
        Looking for us? We got you.
      </div>

      {/* Map */}
      <div className="relative z-10 w-full">
        <iframe
          width="100%"
          height="400"
          className="border-2 border-gray-300"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAcBwWVLuUFQMaRS-eFzHm8UxtKW6wJM9Q&q=Donadeo+Innovation+Centre+for+Engineering,+9211+116+St+NW,+Edmonton,+AB+T6G+1H9&maptype=satellite&zoom=15"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
};

export default ContactPage;
