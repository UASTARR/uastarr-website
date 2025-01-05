import React from 'react';
import Image from 'next/image';

const PhotoCarousel = ({
  imgrefs = [],
  altText,
}: {
  imgrefs: string[];
  altText: string;
}) => {
  const placeholderImage = '/assets/placeholder_album.jpeg';

  return (
    <div className='max-w-2xl'>
      <Image
        src={imgrefs?.[0] ?? placeholderImage}
        alt={altText}
        width={400}
        height={400}
        className="w-full h-full object-contain rounded-lg"
      />
    </div>
  );
};

export default PhotoCarousel;
