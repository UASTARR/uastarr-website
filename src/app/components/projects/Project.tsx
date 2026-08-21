import ProjectLaunchMedia from "./ProjectLaunchMedia";

function getLaunchDateMs(launchDate: unknown): number | null {
    if (!launchDate) return null;
    if (typeof launchDate === 'string' || typeof launchDate === 'number') {
        const ms = new Date(launchDate).getTime();
        return Number.isNaN(ms) ? null : ms;
    }
    if (
        typeof launchDate === 'object' &&
        launchDate !== null &&
        'toDate' in launchDate &&
        typeof (launchDate as { toDate: () => Date }).toDate === 'function'
    ) {
        return (launchDate as { toDate: () => Date }).toDate().getTime();
    }
    return null;
}

export default async function Project({
    title, playlist, albumYear, albumName, launchDate, children, albumUrl
}: {
    title: string, playlist: string, albumYear: string | undefined, albumName: string, launchDate: unknown, children: string, albumUrl: string | undefined
}) {
    const listId = playlist ? playlist.search('list=PL') : -1
    const thePlaylist = listId > -1 ? playlist.slice(listId + 5) : playlist

    const albumImageUrl = albumUrl ? albumUrl : '/assets/logos/logo.png'
    const albumTitle = albumName ? albumName : ''
    const launchDateMs = getLaunchDateMs(launchDate);
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
                        {/* {logoIds && logoIds.map(async (logo: string, index: number) => {
                            const url = (await getUrl(logo)).string;
                            if (!url) {
                                console.log(`Project: Failed to get URL for logo: ${logo}`);
                                return null;
                            }
                            return (
                                <div className="px-2">
                                    <img key={index} src={url} className="h-32 object-contain" />
                                </div>
                            )
                        })} */}
                    </div>
                </div>
                {/* Right side for desktop, bottom for mobile */}
                {/* Albums */}
                <div className="flex items-center flex-col w-full lg:w-144 lg:pl-8">
                    <div className="h-20"></div>
                    <ProjectLaunchMedia
                        launchDateMs={launchDateMs}
                        albumImageUrl={albumImageUrl}
                        albumTitle={albumTitle}
                        albumYear={albumYear}
                        albumName={albumName}
                    />
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