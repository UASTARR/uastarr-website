import React from 'react';
import { getMerchItemById } from '@/library/firebase/firestore';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import FirefliesBackground from '@/app/components/videos/FirefliesBackground';
import PhotoCarousel from '@/app/components/merch/PhotoCarousel';

const MerchDetailPage = async ({
  params: { merchId },
}: {
  params: { merchId: string };
}) => {
  try {
    const merchItem = await getMerchItemById(merchId);

    const images = ['/assets/placeholder_album.jpeg', '/assets/TeamPhoto.jpg'];

    return (
      <main>
        <BaseScripts />
        <FirefliesBackground />

        <div className="h-40"></div>

        <div className="relative z-20 w-full bg-black bg-opacity-70 p-10 flex justify-center">
          <div className="mt-4 lg:mt-12 lg:mr-60 mb-20 shadow-lg flex flex-col lg:flex-row items-start space-y-8 lg:space-x-20">
            {/* Carousel has to be use client - https://github.com/YIZHUANG/react-multi-carousel/issues/379 */}
            <div className="flow_in_left w-128 h-full lg:mr-24">
              <PhotoCarousel imgrefs={images} />
            </div>

            {/* Merch Details */}
            <div className="flex-1 flex flex-col">
              <h1 className="text-4xl font-bold text-white mb-4">
                {merchItem.name}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed mb-10 flex-grow">
                {merchItem.description}
              </p>

              <div className="mt-auto">
                <p className="text-gray-300 mb-1 font-semibold">Price:</p>
                <p className="text-3xl font-semibold text-lime-600">
                  ${merchItem.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-24"></div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-center text-white bg-black bg-opacity-70 p-4 rounded">
          Merch item not found, or an internal error has occurred!
        </p>
      </main>
    );
  }
};

export default MerchDetailPage;
