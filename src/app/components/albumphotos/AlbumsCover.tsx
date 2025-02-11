'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from './Loading';

const AlbumsCover = () => {
  const [photos, setPhotos] = useState<
    Record<string, { coverPhoto: string; name: string; sub_name: string }>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/api/photo-albums');

        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching album covers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center">
      {Object.keys(photos).map((album, index: number) => (
        <div
          key={index}
          className="w-80 h-112 flex flex-col items-center justify-center relative"
        >
          <Link href={`/photo-albums/${album}`}>
            <Image
              priority
              className="object-cover w-60 h-80 hover:blur-sm rounded-xl hover:object-scale-down hover:bg-neutral-900"
              src={photos[album].coverPhoto}
              width={500}
              height={500}
              alt={photos[album].name}
            />
          </Link>
          <div className="absolute bottom-3 bg-gradient-to-r from-violet-700 to-sky-700/75 h-20 w-56 py-3 px-3 place-content-center">
            <p className="text-white text-lg font-bold text-center align-middle">
              {photos[album].name}
            </p>
            <p className="text-white text-sm font-bold text-center align-middle">
              {photos[album].sub_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlbumsCover;
