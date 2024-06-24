import React from 'react'
import BaseScripts from '../components/scripts/BaseScripts'
import SponsorsLayoutSponsorPage, { SponsorPackageDesktop, SponsorPackageMobile } from '../components/sponsors/SponsorsLayoutSponsorPage'
import Link from 'next/link'
import { Metadata } from 'next';
import Image from 'next/image';
import astronautBkg from '@/public/assets/backgrounds/astronautBkg.jpeg'

export const metadata: Metadata = {
    title: "Sponsors",
};

const SponsorsPage = () => {
    return (
        <main>
            <BaseScripts />
            <div className="fixed w-screen h-screen flex items-center">
                <Image src={astronautBkg} alt='' className="object-cover min-w-full min-h-full" />
            </div>

            <div className="h-96"></div>

            {/* <!--Splash page--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex items-center flex-col overflow-hidden" >
                        <div className="h-8"></div>
                        <h1 className="text-white text-4xl lg:text-6xl overflow-hidden">
                            Our Sponsors
                        </h1>
                        <div className="h-2"></div>
                        <p className="text-white text-md lg:text-xl overflow-hidden">
                            Helping Us Reach the Stars.
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-80"></div>

            {/* <!--Sponsors Section--> */}
            <SponsorsLayoutSponsorPage />

            {/* <!--Sponsorship Package Section--> */}
            <div className="max-lg:hidden">
                <SponsorPackageDesktop />
            </div>
            <div className="lg:hidden">
                <SponsorPackageMobile />
            </div>

            {/* <!--Contact Us Section--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center bg-gradient-to-b from-blue-500 to-black black-white" >
                        <div className="overflow-hidden flex flex-col items-center">
                            <div className="h-20"></div>
                            <h1 className="text-2xl lg:text-4xl text-white text-center px-6">Want to be a sponsor?</h1>
                            <div className="h-4"></div>
                            <p className="w-screen lg:w-192 text-sm lg:text-lg text-center text-white text-pretty px-6">
                                We're excited to have you on board. Our vision depends on generous sponsors like you,
                                and we look forward to seeing the heights we'll reach together.
                            </p>
                            <div className="h-12"></div>
                            {/* <!--Change href to contact page--> */}
                            <Link href={'/contact'}>
                                <button
                                    className="whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                                    Contact Us
                                </button>
                            </Link>
                            <div className="h-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}

export default SponsorsPage