'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const PhotoDisplay = ({ album }: { album: string }) => {
    const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
    const [photos, setPhotos] = useState<{ name: string; url: string; type: string}[]>([]);
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
                const response = await fetch(`${album.split('/')[1]}/api/`);
                // if (!response.ok) throw new Error('Failed to fetch');
                if (!response.ok) {
                    setLoadState('error');
                    return;
                }
                const loadedPhotos = await response.json();
                setLoadState('loaded');
                setPhotos(loadedPhotos);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
            }
        };
        fetchPhotos();
    }, []);
    return (
        <div className="px-12 flex flex-wrap justify-center">
            {loadState === 'loading' && (
                <div className="px-3 py-3 w-full h-full flex flex-col items-center justify-center relative">
                    <Loading className='w-screen h-[50vh]'/>
                </div>
            )}
            {loadState === 'error' && (
                <div className="px-3 py-3 w-115 h-85 flex flex-col items-center justify-center relative">
                    <p className="text-white text-center text-xl">Error loading photos.<br/>Please retry or refresh</p>
                </div>
            )}
            {photos.map((photo) => (
                photo.type.includes('video') ? (
                    <div key={photo.name} className="px-3 py-3 w-115 h-85 flex flex-col items-center justify-center relative">
                        <video className='cursor-pointer object-contain w-112 h-80' src={photo.url} controls />
                    </div>
                ) : (
                    <div key={photo.name} className="px-3 py-3 w-115 h-85 flex flex-col items-center justify-center relative">
                        <Image onClick={() => openZoomedImage(photo.url)} priority className='cursor-pointer object-contain hover:object-cover hover:object-top w-112 h-80' src={photo.url} alt={photo.name} width={500} height={500} />
                    </div>
                )
            ))}
            {zoomedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/90 flex justify-center items-center z-[1000] cursor-pointer" onClick={closeZoomedImage}>
                    <Image src={zoomedImage} className="max-w-[80vw] max-h-[80vh] object-contain" alt='' width={3000} height={3000} />
                </div>
            )}
        </div>
    );
}

export default PhotoDisplay;