import React from 'react';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import Link from 'next/link';
import Image from 'next/image';
import { getMerchItems } from '@/library/firebase/firestore';
import { Metadata } from 'next';
import FirefliesBackground from '../components/videos/FirefliesBackground';

export const metadata: Metadata = {
  title: 'Merchandise',
};

const MerchPage = async () => {
  const merchItems = await getMerchItems();
  const placeholderImage = '/assets/placeholder_album.jpeg';

  return (
    <main className="text-white bg-gray-900">
      <BaseScripts />
      <FirefliesBackground />

      <div className="relative z-10 px-10 pt-20">
        <h1 className="text-5xl font-bold mt-16 flow_in_left">Merch</h1>
        <h2 className="mt-4 text-lg flow_in_left delay-100">
          Celebrate our mission with high-quality merch made just for you.
        </h2>
        <p className="mt-2 flow_in_left delay-200">Limited edition.</p>
      </div>

      {/* Content Section */}
      <div className="flex justify-center relative z-20 mt-14">
        <div className="bg-black bg-opacity-70 grow p-6 pb-32">
          <div className="mt-11 flex flex-wrap justify-center gap-14">
            {merchItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col relative fade_in no_check delay-${
                  index * 3 * 100
                }`}
              >
                <div className="text-gray-200 hover:text-white transition-colors">
                  <div className="w-96 h-96 relative overflow-hidden rounded-sm">
                    <Link href={`/merch/${item.id}`}>
                      <Image
                        priority
                        fill
                        className="object-cover aspect-square"
                        sizes="w-96"
                        src={item.imgref ?? placeholderImage}
                        alt={item.name}
                      />
                    </Link>
                  </div>

                  <div className="mt-4 flex flex-col">
                    <Link className="text-lg" href={`/merch/${item.id}`}>
                      {item.name}
                    </Link>
                    <Link className="text-2xl" href={`/merch/${item.id}`}>
                      ${item.price} CAD
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="h-16"></div>
    </main>
  );
};

export default MerchPage;
