import { Metadata } from 'next';
import React, { Suspense } from 'react';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import FirefliesBackground from '@/app/components/videos/FirefliesBackground';
import MerchItemsLayout from '@/app/components/merch/MerchItemsLayout';
import { getMerchItems } from '@/library/firebase/firestore';

export const metadata: Metadata = {
  title: 'Merchandise',
};

const MerchPage = () => {
  const merchItemsPromise = getMerchItems();

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

      {/* Content */}
      {/* Possible improvement: fetch itemCount from server every couple of hours, cache it */}
      <div className="flex justify-center relative z-20 mt-14">
        <div className="bg-black bg-opacity-70 grow p-6 pb-32">
          <Suspense fallback={<MerchItemsLayout isLoading itemCount={3} />}>
            <MerchPageContent promise={merchItemsPromise} />
          </Suspense>
        </div>
      </div>

      <div className="h-16"></div>
    </main>
  );
};

const MerchPageContent = async ({ promise }: { promise: Promise<any> }) => {
  const merchItems = await promise;
  return <MerchItemsLayout items={merchItems} />;
};

export default MerchPage;
