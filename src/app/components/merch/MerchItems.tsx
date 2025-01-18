import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMerchItems } from '@/library/firebase/firestore';

const MerchItems = async () => {
  const merchItems = await getMerchItems();
  const placeholderImage = '/assets/placeholder_album.jpeg';

  return (
    <div className="mt-11 flex flex-wrap justify-center gap-14">
      {merchItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex-1 min-w-full sm:min-w-80 max-w-96 flex flex-col relative fade_in no_check delay-${
            index * 3 * 100
          }`}
          suppressHydrationWarning
        >
          <div className="w-full text-gray-200 hover:text-white transition-colors">
            <div className="w-full h-96 relative overflow-hidden rounded-sm">
              <Link href={`/merch/${item.id}`}>
                <Image
                  priority
                  fill
                  className="object-cover aspect-square"
                  sizes="w-96"
                  src={item.imgrefs?.[0] ?? placeholderImage}
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
  );
};

export default MerchItems;
