import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MerchItem {
  id: string;
  imgrefs: string[];
  name: string;
  price: number;
}

const MerchItemsLayout = ({
  isLoading = false,
  items = [],
  itemCount = 4,
}: {
  isLoading?: boolean;
  items?: MerchItem[];
  itemCount?: number;
}) => {
  const placeholderImage = '/assets/backgrounds/astronautBkg.jpeg';

  const skeletonItems: Partial<MerchItem>[] = Array.from({
    length: itemCount,
  }).map((_, index) => ({
    id: `skeleton-${index}`,
    imgrefs: [],
    name: '',
    price: 0,
  }));

  return (
    <div className="mt-11 flex flex-wrap justify-center gap-14">
      {(isLoading ? skeletonItems : items).map((item, index) => (
        <div
          key={item.id}
          className={'flex-1 min-w-full sm:min-w-80 max-w-96 flex flex-col relative'}
          suppressHydrationWarning
        >
          <div className="w-full text-gray-200 hover:text-white transition-colors">
            {/* Image */}
            <div className="w-full h-96 relative overflow-hidden rounded-sm">
              {isLoading ? (
                <div className="w-full h-full bg-gray-800 animate-pulse rounded-sm"></div>
              ) : (
                <Link href={`/merch/${item.id}`}>
                  <Image
                    priority
                    fill
                    className="object-cover aspect-square"
                    sizes="w-96"
                    src={item.imgrefs?.[0] ?? placeholderImage}
                    alt={item.name || 'Loading...'}
                  />
                </Link>
              )}
            </div>

            {/* Text */}
            <div className="mt-4 flex flex-col">
              {isLoading ? (
                <>
                  <div className="w-1/4 h-6 bg-gray-700 animate-pulse rounded"></div>
                  <div className="w-1/3 h-8 bg-gray-700 animate-pulse rounded"></div>
                </>
              ) : (
                <>
                  <Link className="text-lg" href={`/merch/${item.id}`}>
                    {item.name}
                  </Link>
                  <Link className="text-2xl" href={`/merch/${item.id}`}>
                    ${item.price} CAD
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MerchItemsLayout;
