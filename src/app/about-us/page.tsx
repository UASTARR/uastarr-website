import Link from 'next/link';
import React from 'react'
import BaseScripts from '../components/scripts/BaseScripts';
import Headshots from '../components/headshots/Headshots';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us",
};

const AboutUsPage = () => {
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="h-32"></div>

            {/* <!--Tile 1--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-70" >
                        <div className="overflow-hidden flex flex-col items-center">
                            <div className="h-2"></div>
                            <h1 className="text-4xl text-white fade_in delay-200 text-center">About Us</h1>
                            <div className="h-3"></div>
                            <div className="w-12 h-1 bg-white rounded-xl justify-center"></div>
                            <div className="h-3"></div>
                            <p className="w-192 text-white text-xl text-center fade_in delay-200">
                                The Student Team for Alberta Rocketry Research (STARR) is a team of like-minded students
                                from an array of disciplines and faculties who have come together with the common goal of
                                expanding Alberta’s space industry through the development, testing, and launching of high
                                altitude sounding rockets.
                            </p>
                            <div className="h-8"></div>
                            <img src="/assets/TeamPhoto.jpeg" className="rounded-xl w-192 flex-none overflow-hidden" />
                            <div className="h-8"></div>
                        </div>
                    </div>

                </div>
            </div>

            {/* <!--Tile 2--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-yellow-400" >
                        <div className="overflow-hidden flex flex-col items-center">
                            <div className="h-2"></div>
                            <h1 className="text-4xl text-black text-center">Our Mission and Vision</h1>
                            <div className="h-3"></div>
                            <div className="w-12 h-1 bg-black rounded-xl justify-center"></div>
                            <div className="h-3"></div>
                            <p className="w-192 text-lg text-center text-black">
                                Our mission is to provide experience for students in developing launch vehicles and scientific
                                payloads, educate the public through outreach activities, and promote STEM to students across Alberta.
                                <br />
                                <br />
                                Our vision is to provide to our members the necessary experience and skills to pursue a career
                                in the aerospace industry and strengthen Alberta's position as a leader in the Canadian aerospace community.
                            </p>
                            <div className="h-8"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!--Tile 3--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center overflow-hidden" >
                        <div className="overflow-hidden flex items-center">
                            <div>
                                <div className="h-12"></div>
                                <h1 className="text-4xl text-white">Our Team</h1>
                                <div className="h-4"></div>
                                <p className="w-128 text-lg text-white">
                                    Meet our 2022/2023 team leads. We are students from various disciplines and
                                    faculties, coming together in the name of student rocketry research!  🚀
                                    If you want to join any of our teams, contact us!
                                </p>
                                <div className="h-12"></div>
                            </div>
                            <div className="w-12"></div>
                            <img src="/assets/STARRVectorIconSquare.png" className="rounded-xl flex-none overflow-hidden" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-6"></div>
            {/* <!--Team members--> */}
            <div className="flex justify-center relative z-20">
                <div className="w-32 grow-0 overflow-hidden"></div>
                <div className="bg-black bg-opacity-70 grow-0">
                    <div className="h-16"></div>
                    <Headshots />
                    <div className="h-16"></div>
                </div>
                <div className="w-32 grow-0 overflow-hidden"></div>
            </div>

            {/* <!--Album link--> */}
            <div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="shrink-0 grow flex justify-center overflow-hidden" >
                        <div className="overflow-hidden flex flex-col items-center">
                            <div className="h-16"></div>
                            <h1 className="text-4xl text-white text-center">Looking for more photos?</h1>
                            <div className="h-8"></div>
                            <p className="w-192 text-lg text-center text-white">
                                Check out our photo albums to see our team and its experiences, events, and work throughout the years!
                            </p>
                            <div className="h-12"></div>
                            <Link href="/photo-albums">
                                <button
                                    className="whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                                    View More
                                </button>
                            </Link>
                            <div className="h-20"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AboutUsPage;