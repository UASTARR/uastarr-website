import { getPhotos, getUrl } from "@/library/firebase/storage"
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import Countdown from "./Countdown";

function randomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export default async function Project({
    title, playlist, logos, album, albumName, launchDate, children
}: {
    title: string, playlist: string, logos: string, album: string, albumName: string, launchDate: Timestamp, children: React.ReactNode
}) {
    const listId = playlist ? playlist.search('list=PL') : -1
    const thePlaylist = listId > -1 ? playlist.slice(listId + 5) : playlist
    const logoIds = logos ? logos.split(',') : []

    const albumAllImages = album ? await getPhotos(album) : []
    const albumImage = albumAllImages.length ? albumAllImages[randomInt(albumAllImages.length)] : { url: '/assets/placeholder_album.jpeg' }
    const albumTitle = albumName ? albumName : ''

    const now = new Date().getTime();
    const difference = launchDate ? launchDate.toDate().getTime() - now : 0;
    const launch = difference > 0 ? launchDate.toDate() : null;
    return (
        <div className="relative flex flex-col justify-center w-full lg:w-288 px-6 lg:px-16">
            <div className="flex flex-col lg:flex-row justify-center">
                {/* Left side for desktop, top for mobile */}
                <div className="flex items-start flex-col w-full lg:w-144 lg:pr-8">
                    {/* Title */}
                    <div className="flex items-center">
                        <div className="bg-green-800 h-14 w-2 rounded-full"></div>
                        <h1 className="pl-5 text-white text-2xl delay-200 fade_in no_check"> {title} </h1>
                    </div>
                    <div className="h-8"></div>
                    <p className="text-white text-md delay-200 fade_in no_check text-justify lg:leading-loose ">
                        {children}
                    </p>
                    <div className="h-3"></div>
                    {/* Logos */}
                    <div className="flex justify-center flex-row w-full flex-wrap">
                        {logoIds.map(async (logo: string, index: number) => {
                            const url = await getUrl(logo);
                            return (
                                <div className="px-2">
                                    <img key={index} src={url} className="w-32 h-32" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Right side for desktop, bottom for mobile */}
                {/* Albums */}
                <div className="flex items-center flex-col w-full lg:w-144 lg:pl-8">
                    <div className="h-20"></div>
                    {!launch ? (albumAllImages && (
                        <img src={albumImage.url} />
                    )) : (
                        <Countdown launchDate={launch} />
                    )}
                    <div className="h-5"></div>
                    <p className="text-white text-lg font-bold delay-200 no_check fade_in text-center">
                        {albumTitle}
                    </p>
                    <div className="h-5"></div>
                    <Link href={`/photo-albums/${album ? album : ''}`}>
                        <button
                            className="transition-all duration-300 whitespace-nowrap text-sm text-lime-700 bg-gray-50 hover:text-white hover:bg-black hover:drop-shadow-glowPurple rounded-full w-32 py-3">
                            View More
                        </button>
                    </Link>
                </div>
            </div>
            <div className="h-8"></div>
            {/* Bottom playlist */}
            {playlist && (
                <div className="object-contain">
                    <iframe
                        className='px-6 lg:px-16 w-full h-96 lg:h-128'
                        src={`https://www.youtube.com/embed/?listType=playlist&list=${thePlaylist}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen />
                </div>
            )}
        </div>
    )

}