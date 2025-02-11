import React, { Suspense } from 'react';
import { getMerchItemById } from '@/library/firebase/firestore';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import FirefliesBackground from '@/app/components/videos/FirefliesBackground';
import MerchDetailLayout from '@/app/components/merch/MerchDetailLayout';

const MerchDetailPage = async ({
  params: { merchId },
}: {
  params: { merchId: string };
}) => {
  const merchItemPromise = getMerchItemById(merchId);

  return (
    <>
      <BaseScripts />
      <FirefliesBackground />
      <Suspense fallback={<MerchDetailLayout isLoading />}>
        <MerchDetailContent promise={merchItemPromise} />
      </Suspense>
    </>
  );
};

const MerchDetailContent = async ({ promise }: { promise: Promise<any> }) => {
  try {
    const merchItem = await promise;

    return (
      <MerchDetailLayout
        imgrefs={merchItem.imgrefs}
        name={merchItem.name}
        description={merchItem.description}
        price={merchItem.price}
      />
    );
  } catch (e) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <p className="text-center text-lg text-white p-4 rounded z-50">
          Merch item not found.
        </p>
      </main>
    );
  }
};

export default MerchDetailPage;
