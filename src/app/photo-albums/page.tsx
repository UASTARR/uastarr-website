import React from 'react';
import BaseScripts from '@/app/components/scripts/BaseScripts';
import AlbumsCover from '../components/albumphotos/AlbumsCover';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import VectorBackground from '../components/videos/VectorBackground';

export const metadata: Metadata = {
  title: 'Photo Albums',
};

const PhotoAlbumsPage = async () => {
  // TODO: Convert from firebase to google drive api and remove redirect
  // TODO - Jake: Please do not use google drive api! Let's use firebase cloud storage.
  redirect('/down-for-maintenance');

  return (
    <main>
      <BaseScripts />
      <VectorBackground />

      <div className="h-24"></div>

      <div className="flex justify-center relative flex-none z-20">
        <div className="flex grow">
          <div className="shrink-0 grow flex items-center flex-col">
            <div className="h-8"></div>
            <h1 className="text-white text-2xl lg:text-6xl">
              A Blast Into the Past 🚀
            </h1>
            <div className="h-2"></div>
            <p className="text-white text-xl">The STARR Photo Archive</p>
          </div>
        </div>
      </div>

      <div className="h-20"></div>

      <div className="flex justify-center relative z-20">
        <div className="w-32 grow-0 overflow-hidden"></div>
        <div className="bg-black bg-opacity-70 grow-0">
          <div className="h-16"></div>
          <AlbumsCover />
          <div className="h-16"></div>
        </div>
        <div className="w-32 grow-0 overflow-hidden"></div>
      </div>

      <div className="h-20"></div>
    </main>
  );
};

export default PhotoAlbumsPage;
