import React from 'react'
import BaseScripts from '../components/scripts/BaseScripts'

const PhotoAlbumsPage = () => {
    return (
        <main>
            <BaseScripts />
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/VectorBkg.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="h-24"></div>

            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex items-center flex-col overflow-hidden" >
                        <div className="h-8"></div>
                        <h1 className="text-white text-6xl overflow-hidden">
                            A Blast Into the Past 🚀
                        </h1>
                        <div className="h-2"></div>
                        <p className="text-white text-xl overflow-hidden">
                            The STARR Photo Archive
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-20"></div>
        </main>
    )
}

export default PhotoAlbumsPage