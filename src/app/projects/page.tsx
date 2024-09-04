import React from 'react'
import BaseScripts from '@/app/components/scripts/BaseScripts'
import rocketsImage from '@/public/assets/projects/DSC_4722_JPG.jpeg'
import payloadImage from '@/public/assets/projects/IMG_0626_edited.jpeg'
import groundStationImage from '@/public/assets/projects/20230721_175306_edited.jpeg'
import Link from 'next/link'
import Image from 'next/image'

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects",
};

const ProjectsPage = async () => {
    const images = [rocketsImage, payloadImage, groundStationImage];
    const names = ['Rockets', 'Payloads', 'Ground Station']
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen z-0">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            
            <div className="h-24"></div>
            <div className="z-20 relative h-32 content-center max-lg:flex max-lg:justify-center max-lg:items-center">
                <p className="text-white text-4xl text-left lg:pl-28 flow_in_left delay-200">Our Projects</p>
            </div>
                
            {/* <!--Content--> */}
            <div className="flex justify-center relative z-20">
                <div className="w-32 grow-0 overflow-hidden"></div>
                <div className="bg-black bg-opacity-70 grow-0">
                    <div className="h-5"></div>
                    <div className="flex flex-wrap justify-center">
                        {images.map((image, index) => {
                            if (images.length === 0) {
                                return <></>;
                            }
                            return (
                                <div key={index} className={`w-80 lg:w-96 h-112 flex flex-col items-center justify-center relative fade_in no_check delay-${(index*3)*100}`}>
                                    <div className="h-20 w-56 py-3 px-3 place-content-center">
                                        <p className="text-white text-2xl text-center align-middle">{names[index]}</p>
                                    </div>
                                    <Link href={`/projects/${names[index].toLowerCase().split(' ').join('-')}`}>
                                        <Image priority className="object-cover w-64 h-96 rounded-3xl" src={image} alt={names[index]} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="h-10"></div>
                </div>
                <div className="w-32 grow-0 overflow-hidden"></div>
            </div>

            <div className="h-20"></div>
        </main>
    )
}

export default ProjectsPage