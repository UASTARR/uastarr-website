import { getPhotos } from '@/library/firebase/storage';
import Image from 'next/image';

const PhotoDisplay = async ({album} : {album: string}) => {
    const photos = await getPhotos(album);
    return (
        <div className="px-12 flex flex-wrap justify-center">
            {photos.map((photo) => (
                <div key={photo.name} className="px-3 w-115 h-85 flex flex-col items-center justify-center relative">
                    <Image className='object-cover hover:object-contain w-112 h-80' src={photo.url} alt={photo.name} width={500} height={500}/>
                </div>
            ))}
        </div>
    );
}

export default PhotoDisplay;