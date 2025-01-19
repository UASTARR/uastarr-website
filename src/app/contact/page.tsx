import React from 'react';
import { Metadata } from 'next';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import ReCaptchaApi from '@/app/components/scripts/ReCaptchaApi';
import ContactForm from '../components/contact/ContactForm';
import FirefliesBackground from '../components/videos/FirefliesBackground';

export const metadata: Metadata = {
  title: 'Contact Us',
};

const ContactPage: React.FC = () => {
  return (
    <main className="relative bg-gray-900 text-white">
      <BaseScripts />
      <FirefliesBackground />
      <ReCaptchaApi />

      {/* Header Section */}
      <div className="relative z-10 px-10 py-16">
        <h1 className="text-5xl font-bold mt-16">Contact Us</h1>
        <h2 className="mt-4 text-lg">
          Want to join us? Want to become a sponsor? Any other questions?
        </h2>
        <p className="mt-2">Let us know! We'd love to hear what you think.</p>
      </div>

      {/* Contact Form - Client component */}
      <div className="relative z-10 px-4">
        <ContactForm />
      </div>

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
