import React from 'react'
import BaseScripts from '@/app/components/scripts/BaseScripts'
import PhotoDisplay from '@/app/components/albumphotos/PhotosDisplay';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Album",
};

export default async function AlbumPage(
    { params }: { params: { album: string } }
) {
    const album = params.album.split('%20').join(' ');
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