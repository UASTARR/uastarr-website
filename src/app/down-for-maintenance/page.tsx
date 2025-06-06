import React from 'react'

import { Metadata } from 'next';
import Link from 'next/link';
import RipplingBackground from '../components/videos/RipplingBackground';

export const metadata: Metadata = {
    title: "Landing Page",
};

const DownPage = () => {
    return (
        <main>
            {/* <!--Background Video--> */}
            <RipplingBackground />

            <div className="relative z-20 flex flex-col justify-center items-center">
                <div className="h-48"></div>
                {/* Center box */}
                <div className="flex flex-row justify-center items-center bg-black/90 rounded-xl px-32 py-32">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="text-white text-5xl text-center">We're working on it 🛠</h1>
                        <div className="h-24"></div>
                        <h1 className="text-white text-xl text-center">
                            We're still working on this page, but it will be done soon. <br />
                            If you have any questions, please contact us through this temporary form.
                        </h1>
                        <div className="h-24"></div>
                        <Link target="_blank" href="https://forms.gle/uvnbhURHeeLWkaVT6" rel="noopener noreferrer">
                            <button className="text-white whitespace-nowrap bg-green-700 hover:transition-all duration-200 hover:bg-white hover:text-black rounded-full px-6 py-3">
                                Temporary Contact Form
                            </button>
                        </Link>
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