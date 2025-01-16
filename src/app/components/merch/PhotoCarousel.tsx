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

const PhotoCarousel = ({ imgrefs = [] }: { imgrefs: string[] }) => {
  {
    /* https://www.npmjs.com/package/react-multi-carousel */
  }
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleInteraction = () => {
    setIsAutoPlay(false);
  };

  return (
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
      transitionDuration={500}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px self-center"
      className="w-full h-full"
    >
      {imgrefs.map((src, index) => (
        <Image
          src={src}
          key={index}
          alt={`Merch image ${index + 1}`}
          priority
          width={1000}
          height={1000}
          className="object-cover"
        />
      ))}
    </Carousel>
  );
};

export default PhotoCarousel;
