import React from 'react'
import BaseScripts from '../components/scripts/BaseScripts'
import SponsorsLayoutSponsorPage from '../components/sponsors/SponsorsLayoutSponsorPage'
import Link from 'next/link'

const SponsorsPage = () => {
    return (
        <main>
            <BaseScripts />
            <div className="fixed w-screen h-screen flex items-center">
                <img src="/assets/backgrounds/astronautBkg.jpeg" className="object-cover min-w-full min-h-full" />
            </div>

            <div className="h-128"></div>

            {/* <!--Splash page--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex items-center flex-col overflow-hidden" >
                        <div className="h-8"></div>
                        <h1 className="text-white text-6xl overflow-hidden">
                            Our Sponsors
                        </h1>
                        <div className="h-2"></div>
                        <p className="text-white text-xl overflow-hidden">
                            Helping Us Reach the Stars.
                        </p>
                    </div>
                </div>
            </div>
            <div className="h-96"></div>

            {/* <!--Sponsors Section--> */}
            <SponsorsLayoutSponsorPage />

            {/* <!--Sponsorship Package Section--> */}
            {/* <!--This is very janky, would not reccomend touching unless you have to--> */}
            <div className="z-20 bg-white relative h-192" style={{ backgroundImage: "url(https://static.wixstatic.com/media/9dc5ac_39ff54e1dfa04e298cb7d58566700807~mv2.jpg/v1/fill/w_1960,h_1652,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/9dc5ac_39ff54e1dfa04e298cb7d58566700807~mv2.jpg)" }}>
                <div className="h-16"></div>
                <div className="flex overflow-hidden grow">
                    <div className="w-20 grow-0 overflow-hidden"></div>
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-60" >
                        <div className="overflow-hidden w-160 h-144 flex items-center">
                            <div className="flex">
                                <div className="w-8 flex-none"></div>

                                <div className="w-96 flex justify-center">
                                    <img src="/assets/sponsorsCover.jpeg" style={{ width: '389px', height: '504px' }} />
                                </div>
                                <div className="w-56 flex-none"></div>

                            </div>
                        </div>
                    </div>
                    <div className="shrink-0 grow flex justify-center overflow-y-hidden" >
                        <div className="overflow-hidden w-64"></div>
                    </div>
                    <div className="shrink w-20 grow-0 overflow-hidden"></div>
                </div>

                <div className="flex overflow-y-visible grow">
                    <div className="w-20 grow-0 overflow-hidden"></div>
                    <div className="shrink-0 grow flex justify-center overflow-y-hidden" >
                        <div className="overflow-hidden w-112"></div>
                    </div>
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-90 -translate-y-128" >
                        <div className="overflow-hidden w-112 h-144">
                            <div className="flex">
                                <div className="w-6 flex-none"></div>
                                <div>
                                    <div className="h-12"></div>
                                    <h1 className="text-white text-6xl w-96">
                                        Sponsorship Package 2022/2023
                                    </h1>
                                    <div className="h-12"></div>
                                    <p className="text-white text-base w-96">
                                        Interested in learning more about us and our plans for Ringo II?
                                        Do you want to help support our mission? Check out our sponsorship package
                                        to see more of what we have to offer to the world of rocketry and engineering.
                                    </p>
                                    <div className="h-12"></div>
                                    <Link href={'/photo-albums'}>
                                        <button
                                            className="whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                                            View Sponsorship Package
                                        </button>
                                    </Link>
                                </div>
                                <div className="w-6 flex-none"></div>

                            </div>
                        </div>
                    </div>
                    <div className="shrink w-20 grow-0 overflow-hidden"></div>
                </div>
            </div>

            {/* <!--Contact Us Section--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center overflow-hidden  bg-gradient-to-b from-blue-500 to-black black-white" >
                        <div className="overflow-hidden flex flex-col items-center">
                            <div className="h-20"></div>
                            <h1 className="text-4xl text-white text-center">Want to be a sponsor?</h1>
                            <div className="h-4"></div>
                            <p className="w-192 text-lg text-center text-white">
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