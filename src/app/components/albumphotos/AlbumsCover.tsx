import { getAllPhotos } from '@/library/firebase/storage';
import Image from 'next/image';
import Link from 'next/link';

const AlbumsCover = async () => {
    const photos = await getAllPhotos();
    return (
        <div className="flex flex-wrap justify-center">
            {Object.keys(photos).map((album, index: number) => {
                if (photos[album].length === 0) {
                    return <></>;
                }
                return (
                    <div key={index} className="w-80 h-112 flex flex-col items-center justify-center relative">
                        <Link href={`/photo-albums/${album}`}>
                            <Image className="object-cover w-60 h-80 hover:blur-sm rounded-xl hover:object-scale-down hover:bg-neutral-900" src={photos[album][0].url} width={500} height={500} alt={photos[album][0].name} />
                        </Link>
                        <div className="absolute bottom-3 bg-gradient-to-r from-violet-700 to-sky-700/75 h-20 w-56 py-3 px-3 place-content-center ">
                            <p className="text-white text-lg font-bold text-center align-middle">{album}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default AlbumsCover;