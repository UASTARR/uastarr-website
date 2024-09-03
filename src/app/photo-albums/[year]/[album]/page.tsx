import React from 'react'
import BaseScripts from '@/app/components/scripts/BaseScripts'
import PhotoDisplay from '@/app/components/albumphotos/PhotosDisplay';
import { notFound, redirect } from 'next/navigation';

import { Metadata } from 'next';
import { getAlbumNameFromPath } from '@/library/firebase/firestore';

export const metadata: Metadata = {
    title: "Album",
};

export default async function AlbumPage(
    { params }: { params: { year: string, album: string } }
) {
    // TODO: Convert from firebase to google drive api and remove redirect
    redirect('/down-for-maintenance')
    const album = [params.year, params.album].join('/');
    const albumInfo = (await getAlbumNameFromPath(album))[0];
    if (!albumInfo) {
        console.error('Album not found:', album);
        return notFound();
    }
    const albumName = albumInfo.name;
    const albumSubName = albumInfo.sub_name;
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/VectorBkg.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="h-32"></div>

            {/* <!--Header--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex grow">
                    <div className="shrink-0 grow flex items-center flex-col">
                        <div className="h-8"></div>
                        <h1 className="text-white text-2xl lg:text-6xl">
                            {albumName}
                        </h1>
                        <div className="h-2"></div>
                        <p className="text-white text-xl">
                            {albumSubName}
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-6"></div>

            {/* <!--Photos--> */}
            <div className="flex justify-center relative z-20">
                <div className="w-32 grow-0 overflow-hidden"></div>
                <div className="bg-black bg-opacity-70 grow-0">
                    <div className="h-16"></div>
                        <PhotoDisplay album={album} />
                    <div className="h-16"></div>
                </div>
                <div className="w-32 grow-0 overflow-hidden"></div>
            </div>

            <div className="h-20"></div>
        </main>
    )
}