import React from 'react'

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Landing Page",
};

const DownPage = () => {
    return (
        <main>
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="relative z-20 flex flex-col justify-center items-center">
                <div className="h-24"></div>
                {/* Center box */}
                <div className="flex flex-row justify-center items-center bg-black/90 rounded-xl px-32 py-32">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-white text-5xl text-center">We're Working on it 🛠</h1>
                        <div className="h-24"></div>
                        <h1 className="text-white text-xl text-center">
                            We're still working on this page, but will be done soon.
                        </h1>

                    </div>
                    <div className="w-12"></div>
                    <img src="/assets/STARRVectorIconSquare.png" className="w-64 h-64" />
                </div>
                <div className="h-24"></div>
            </div>
        </main>
    )
}

export default DownPage;