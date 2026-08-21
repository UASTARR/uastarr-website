'use client';

import Countdown from './Countdown';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectLaunchMedia({
    launchDateMs,
    albumImageUrl,
    albumTitle,
    albumYear,
    albumName,
}: {
    launchDateMs: number | null;
    albumImageUrl: string;
    albumTitle: string;
    albumYear: string | undefined;
    albumName: string;
}) {
    const launch =
        launchDateMs !== null && launchDateMs > Date.now()
            ? new Date(launchDateMs)
            : null;

    return (
        <>
            {launch ? (
                <Countdown launchDate={launch} />
            ) : (
                <Image
                    className="rounded-lg lg:max-h-128 object-contain"
                    priority
                    src={albumImageUrl}
                    alt=""
                    width={1000}
                    height={1000}
                />
            )}
            <div className="h-5"></div>
            <p className="text-white text-lg font-bold delay-200 no_check fade_in text-center">
                {albumTitle}
            </p>
            <div className="h-5"></div>
            {!launch && (
                <Link
                    href={`/photo-albums/${albumYear && albumName ? `${albumYear}/${albumName}` : ''}`}
                >
                    <button className="transition-all duration-300 whitespace-nowrap text-sm text-lime-700 bg-gray-50 hover:text-white hover:bg-black hover:drop-shadow-glowPurple rounded-full w-32 py-3">
                        View More
                    </button>
                </Link>
            )}
        </>
    );
}
