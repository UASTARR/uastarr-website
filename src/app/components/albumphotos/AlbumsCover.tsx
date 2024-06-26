import { getAlbumCover, getAllPhotos } from '@/library/firebase/storage';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const AlbumsCover = async () => {
    const photos = await getAlbumCover();
    return (
        <div className="flex flex-wrap justify-center">
            {Object.keys(photos).map((album, index: number) => {
                return (
                    <div key={index} className="w-80 h-112 flex flex-col items-center justify-center relative">
                        <Link href={`/photo-albums/${album}`}>
                            <Image priority className="object-cover w-60 h-80 hover:blur-sm rounded-xl hover:object-scale-down hover:bg-neutral-900" src={photos[album].coverPhoto} width={500} height={500} alt="" />
                        </Link>
                        <div className="absolute bottom-3 bg-gradient-to-r from-violet-700 to-sky-700/75 h-20 w-56 py-3 px-3 place-content-center ">
                            <p className="text-white text-lg font-bold text-center align-middle">{photos[album].name}</p>
                            <p className="text-white text-sm font-bold text-center align-middle">{photos[album].sub_name}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AlbumsCover;