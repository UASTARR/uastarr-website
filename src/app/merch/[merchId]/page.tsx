import React from 'react';
import { getMerchItemById } from '@/library/firebase/firestore';
import MerchItem from '@/app/components/merch/MerchItem';
import BaseScripts from '@/app/components/scripts/BaseScripts';

interface MerchDetailPageProps {
  params: {
    merchId: string;
  };
}

const MerchDetailPage = async ({ params }: MerchDetailPageProps) => {
  const { merchId } = params;

  try {
    const merchItem = await getMerchItemById(merchId);

    return (
      <main>
        <BaseScripts />

        {/* Background Video */}
        <div className="fixed top-0 justify-center w-screen h-screen z-0">
          <video muted loop className="object-cover min-w-full min-h-full playsInline">
            <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="h-40"></div>

        {/* Content Section */}
        <div className="flex justify-center relative z-20 fade_in no_check">
          <div className="w-full max-w-screen-lg bg-black bg-opacity-70 p-10 rounded-lg">
            <MerchItem
              name={merchItem.name}
              description={merchItem.description}
              price={merchItem.price}
              imgref={merchItem.imgref}
            />
          </div>
        </div>

        <div className="h-20"></div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-center text-white bg-black bg-opacity-70 p-4 rounded">Merch item not found</p>
      </main>
    );
  }
};

export default MerchDetailPage;
