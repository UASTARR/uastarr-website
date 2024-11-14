import React from "react";
import BaseScripts from "@/app/components/scripts/BaseScripts";
import Link from "next/link";
import Image from "next/image";
import { getMerchItems } from "@/library/firebase/firestore";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Merchandise",
};

const MerchPage = async () => {
    const merchItems = await getMerchItems();
    const placeholderImage = '/assets/placeholder_album.jpeg'

    return (
        <main>
            <BaseScripts />
            
            {/* Background Video */}
            <div className="fixed top-0 justify-center w-screen h-screen z-0">
                <video muted loop className="object-cover min-w-full min-h-full playsInline">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            
            <div className="h-24"></div>

            {/* Title Section */}
            <div className="z-20 relative h-32 content-center max-lg:flex max-lg:justify-center max-lg:items-center">
                <p className="text-white text-4xl text-left lg:pl-28 flow_in_left delay-200">Merchandise</p>
            </div>
            
            {/* Content Section */}
            <div className="flex justify-center relative z-20">
                <div className="w-32 grow-0 overflow-hidden"></div>
                <div className="bg-black bg-opacity-70 grow-0">
                    <div className="h-11"></div>

                    <div className="flex flex-wrap justify-center">
                        {merchItems.map((item, index) => (
                            <div key={item.id} className={`w-80 h-{150} flex flex-col items-center justify-center relative fade_in no_check delay-${(index * 3) * 100}`}>
                                <Link href={`/merch/${item.id}`}>
                                    <Image
                                        priority
                                        className="object-cover w-64 h-96 rounded-3xl"
                                        src={item.imgref ?? placeholderImage}
                                        alt={item.name}
                                        width={300}
                                        height={300}
                                    />
                                </Link>
                                <div className="mt-2 w-56 py-1 px-3 place-content-center">
                                    <p className="text-white text-2xl text-center align-middle">{item.name}</p>
                                </div>
                                <p className="pb-2 text-white text-lg text-center">${item.price}</p>
                            </div>
                        ))}
                    </div>

                    <div className="h-4"></div>
                </div>
                <div className="w-32 grow-0 overflow-hidden"></div>
            </div>

            <div className="h-20"></div>
        </main>
    );
};

export default MerchPage;