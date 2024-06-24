'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const PhotoDisplay = ({ album }: { album: string }) => {
    const [photos, setPhotos] = useState<{ name: string; url: string; }[]>([]);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const openZoomedImage = (imageUrl: string) => {
        setZoomedImage(imageUrl);
    };
    const closeZoomedImage = () => {
        setZoomedImage(null);
    }
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`${album}/api/`);
                if (!response.ok) throw new Error('Failed to fetch');
                const loadedPhotos = await response.json();
                setPhotos(loadedPhotos);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };
        fetchPhotos();
    }, [album]);
    return (
        <div className="px-12 flex flex-wrap justify-center">
            {photos.map((photo) => (
                <div key={photo.name} className="px-3 w-115 h-85 flex flex-col items-center justify-center relative">
                    <Image onClick={() => openZoomedImage(photo.url)} priority className='cursor-pointer object-cover w-112 h-80' src={photo.url} alt={photo.name} width={500} height={500} />
                </div>
            ))}
            {zoomedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex justify-center items-center z-[1000] cursor-pointer" onClick={closeZoomedImage}>
                        <Image src={zoomedImage} className="max-w-[80vw] max-h-[80vh] object-contain" alt='' width={3000} height={3000}/>
                </div>
            )}
        </div>
    );
}

export default PhotoDisplay;