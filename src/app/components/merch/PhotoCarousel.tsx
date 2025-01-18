'use client';
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CustomArrow = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
}) => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 transform -translate-y-1/2 z-10 ${
        direction === 'left' ? 'left-4' : 'right-4'
      } bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}
    >
      {direction === 'left' ? '<' : '>'}
    </button>
  );
};

const PhotoCarousel = ({ imgrefs = [] }: { imgrefs: string[] }) => {
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleInteraction = () => {
    setIsAutoPlay(false);
  };

  return (
    <div className="relative group w-full h-full">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay={isAutoPlay}
        autoPlaySpeed={5000}
        beforeChange={handleInteraction}
        afterChange={handleInteraction}
        showDots
        dotListClass="[&>*]:mb-2"
        draggable
        keyBoardControl
        customTransition="transform 0.5s ease-in-out"
        transitionDuration={600}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px self-center"
        className="w-full h-full"
        customLeftArrow={<CustomArrow direction="left" onClick={() => null} />}
        customRightArrow={
          <CustomArrow direction="right" onClick={() => null} />
        }
      >
        {(!imgrefs || imgrefs.length === 0) && (
          <div className='flex items-center justify-center w-full h-[400px]'>
            <p className="text-white">No images found.</p>
          </div>
        )}
        {imgrefs.map((src, index) => (
          <div
            key={index}
            className="w-full h-[400px] relative flex items-center justify-center overflow-hidden"
          >
            <Image
              src={src}
              alt={`Merch image ${index + 1}`}
              priority
              width={1000}
              height={1000}
              className="object-cover h-full w-auto"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PhotoCarousel;
