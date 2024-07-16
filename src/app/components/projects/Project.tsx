import { getUrl } from "@/library/firebase/storage"
import { Timestamp } from "firebase/firestore";
import Link from "next/link";
import Countdown from "./Countdown";
import Image from "next/image";

export default async function Project({
    title, playlist, logos, album, albumName, launchDate, children, albumUrl
}: {
    title: string, playlist: string, logos: string, album: string | undefined, albumName: string, launchDate: Timestamp, children: string, albumUrl: string | undefined
}) {
    const listId = playlist ? playlist.search('list=PL') : -1
    const thePlaylist = listId > -1 ? playlist.slice(listId + 5) : playlist
    const logoIds = logos ? logos.split(',') : []

    const albumImage = albumUrl ? ({ url: albumUrl}) : ({ url: '/assets/placeholder_album.jpeg' })
    const albumTitle = albumName ? albumName : ''
    // const albumIsVideo = albumAllImages.length ? (albumImage as { name: string; url: string; type: string | void | undefined; }).type?.includes("video") : false

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

                    {/* Description */}
                    <div className="whitespace-pre-line text-white text-md delay-200 fade_in no_check text-justify leading-relaxed lg:leading-loose">
                        {children.split('\\n').map((line, index) => <p key={index}>{line}<br /></p>)}
                    </div>
                    <div className="h-3"></div>

                    {/* Logos */}
                    <div className="flex justify-center flex-row w-full flex-wrap">
                        {logoIds && logoIds.map(async (logo: string, index: number) => {
                            const url = (await getUrl(logo)).string;
                            return (
                                <div className="px-2">
                                    <img key={index} src={url} className="h-32 object-contain" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Right side for desktop, bottom for mobile */}
                {/* Albums */}
                <div className="flex items-center flex-col w-full lg:w-144 lg:pl-8">
                    <div className="h-20"></div>
                    {launch ? (
                        <Countdown launchDate={launch} />
                    ) : (
                        <Image className="rounded-lg lg:max-h-128 object-contain" priority src={albumImage.url} alt="" width={1000} height={1000}/>
                    )}
                    <div className="h-5"></div>
                    <p className="text-white text-lg font-bold delay-200 no_check fade_in text-center">
                        {albumTitle}
                    </p>
                    <div className="h-5"></div>
                    {!launch && (
                        <Link href={`/photo-albums/${album ? album : ''}`}>
                            <button
                                className="transition-all duration-300 whitespace-nowrap text-sm text-lime-700 bg-gray-50 hover:text-white hover:bg-black hover:drop-shadow-glowPurple rounded-full w-32 py-3">
                                View More
                            </button>
                        </Link>
                    )}
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