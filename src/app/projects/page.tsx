import React from 'react'
import BaseScripts from '../components/scripts/BaseScripts'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects",
};

const ProjectsPage = () => {
    return (
        <main>
            <BaseScripts />
            {/* <!--Background Video--> */}
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/RipplingBkg.mp4" type="video/mp4" />
                </video>
            </div>
            {/* <!--Content--> */}
            <div className="relative z-20 pl-20">
                <div className="h-40"></div>
                <h1 className="text-4xl text-white flow_in_left delay-200">Our Projects</h1>
            </div><div className="h-12"></div><div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="w-20 grow-0 overflow-hidden"></div>
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-70 border-r border-gray-500">
                        <div className="overflow-hidden w-96 pl-10">
                            <div className="h-8"></div>
                            <div className="flex items-center">
                                <div className="bg-green-800 h-14 w-2 rounded-full absolute -translate-x-6"></div>
                                <h1 className="text-white text-2xl delay-200 fade_in no_check"> Ringo I </h1>
                            </div>
                            <div className="h-8"></div>
                            <img src="/assets/logos/LaunchCanadaCircleLogo.png" className="w-52 h-52" />
                            <div className="h-8"></div>
                            <p className="text-white text-lg delay-200 fade_in no_check">
                                Ringo I was the University of Alberta's first sounding rocket that competed in the inaugural 2022 Launch Canada Challenge.
                                The launch vehicle employed a dual event recovery system and was propelled to 10,671 ft on August 2, 2022.
                                Members of STARR worked and designed the rocket throughout the 2021-2022 academic year and was awarded first place in the
                                Payload Design Challenge and top 5 in the Basic Launch Challenge. Ringo I went on to launch successfully, becoming the second
                                ever amateur experimental rocket launch on Canadian soil.
                            </p>
                            <div className="h-20"></div>
                        </div>
                    </div>
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-70">
                        <div className="overflow-hidden w-96">
                            <div className="h-24"></div>
                            <p className="text-white">
                                This will be a photo album
                            </p>
                            <img src="/assets/placeholder_album.jpeg" />
                            <p className="text-white text-lg font-bold delay-200 no_check fade_in">
                                STARR and Ringo I at Launch Canada 2022
                            </p>
                        </div>

                    </div>

                    <div className="shrink w-20 grow-0 overflow-hidden"></div>
                </div>
            </div><div className="h-12"></div><div className="flex justify-center relative flex-none z-20">
                <div className="flex overflow-hidden grow">
                    <div className="w-20 grow-0 overflow-hidden"></div>
                    <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-70 border border-gray-500">
                        <div className="overflow-hidden w-96 pl-10">
                            <div className="h-8"></div>
                            <div className="flex items-center">
                                <div className="bg-green-800 h-14 w-2 rounded-full absolute -translate-x-6"></div>
                                <h1 className="text-white text-2xl fade_in"> Ringo II </h1>
                            </div>
                            <div className="h-8"></div>
                            <p className="text-white text-lg fade_in">
                                Ringo II will be STARR's next design project for the upcoming 2023 Launch Canada Challenge.
                                Members of STARR have completed the preliminary design stage for the launch vehicle and will
                                begin production in the next few months!
                            </p>
                            <div className="h-20"></div>
                        </div>
                    </div>
                    <div className="shrink-0 grow flex items-center justify-center overflow-hidden bg-black bg-opacity-70 border border-l-0 border-gray-500">
                        <div className="overflow-hidden w-96">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="flex justify-center items-center" id="countdown">
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="bg-green-700 h-16 w-20 rounded-md flex justify-center items-center">
                                            <p className="text-white text-xl" id="days"></p>
                                        </div>
                                        <div className="bg-green-700 h-8 w-20 flex justify-center items-center">
                                            <p className="text-white text-xl">Days</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-16 w-4 rounded-md flex justify-center items-center"></div>
                                        <div className="bg-green-700 h-8 w-4 flex justify-center items-center"></div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="bg-green-700 h-16 w-20 rounded-md flex justify-center items-center">
                                            <p className="text-white text-xl" id="hours"></p>
                                        </div>
                                        <div className="bg-green-700 h-8 w-20 flex justify-center items-center">
                                            <p className="text-white text-xl">Hours</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-16 w-4 rounded-md flex justify-center items-center"></div>
                                        <div className="bg-green-700 h-8 w-4 flex justify-center items-center"></div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="bg-green-700 h-16 w-20 rounded-md flex justify-center items-center">
                                            <p className="text-white text-xl" id="minutes"></p>
                                        </div>
                                        <div className="bg-green-700 h-8 w-20 flex justify-center items-center">
                                            <p className="text-white text-xl">Mins</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="h-16 w-4 rounded-md flex justify-center items-center"></div>
                                        <div className="bg-green-700 h-8 w-4 flex justify-center items-center"></div>
                                    </div>
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className="bg-green-700 h-16 w-20 rounded-md flex justify-center items-center">
                                            <p className="text-white text-xl" id="seconds"></p>
                                        </div>
                                        <div className="bg-green-700 h-8 w-20 flex justify-center items-center">
                                            <p className="text-white text-xl">Secs</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-white">Until Our Next Launch</p>
                            </div>
                        </div>

                    </div>

                    <div className="shrink w-20 grow-0 overflow-hidden"></div>
                </div>
            </div><div className="h-16"></div>
        </main>
    )
}

export default ProjectsPage;