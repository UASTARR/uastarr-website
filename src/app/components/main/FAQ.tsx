'use client';
import { useEffect, useState } from "react";
import $ from 'jquery';
import Image from 'next/image';

export default function FAQ() {
    const [hidden1, setHidden1] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const [hidden3, setHidden3] = useState(true);

    useEffect(() => {
        const item = "hidden1";
        const element = document.getElementById(item);
        const arrow = document.getElementById("arrow1");
        if (element && arrow) {
            if (!hidden1) {
                $('#' + item).slideDown("slow");
                element.classList.remove("hidden");
                arrow.classList.add("rotate-180");
            } else {
                $('#' + item).slideUp("slow");
                element.classList.add("hidden");
                arrow.classList.remove("rotate-180");
            }
        }
    }, [hidden1]); // This effect runs when elementIdToShow changes.

    useEffect(() => {
        const item = "hidden2";
        const element = document.getElementById(item);
        const arrow = document.getElementById("arrow2");
        if (element && arrow) {
            if (!hidden2) {
                $('#' + item).slideDown("slow");
                element.classList.remove("hidden");
                arrow.classList.add("rotate-180");
            } else {
                $('#' + item).slideUp("slow");
                element.classList.add("hidden");
                arrow.classList.remove("rotate-180");
            }
        }
    }, [hidden2]); // This effect runs when elementIdToShow changes.

    useEffect(() => {
        const item = "hidden3";
        const element = document.getElementById(item);
        const arrow = document.getElementById("arrow3");
        if (element && arrow) {
            if (!hidden3) {
                $('#' + item).slideDown("slow");
                element.classList.remove("hidden");
                arrow.classList.add("rotate-180");
            } else {
                $('#' + item).slideUp("slow");
                element.classList.add("hidden");
                arrow.classList.remove("rotate-180");
            }
        }
    }, [hidden3]); // This effect runs when elementIdToShow changes.

    return (
        <div className = "pl-20">
            <h1 className = "text-white text-4xl whitespace-nowrap overflow-hidden flow_in_left">
                FAQ
            </h1>
            <div className = "h-4"></div>
            {/* <!--Dropdown 1--> */}
            <div className = "flex flex-col w-192">
                <button onClick={() => setHidden1(prev => !prev)}>
                    <div className = "flex justify-between py-6 pr-1 items-center">
                        <h1 className="text-white">
                            How Do I Join STARR?
                        </h1>
                        {/* <!--Placeholder down arrow--> */}
                        <Image id="arrow1" className = "w-3 h-3 flex-none overflow-hidden invert" src = "/assets/down.png" alt="down" width={48} height={48}/>
                    </div>
                </button> 

                <div id = "hidden1" className ="hidden">
                    <p className ="text-white text-pretty py-3 px-3">
                        Leave us a message through our contact page, and tell us:<br />
                        - What's your name?<br />
                        - What program are you in?<br />
                        - What year are you in?<br />
                        - Why do you want to join STARR?<br />
                        We'll get back to you as soon as possible! 🚀
                    </p>
                </div>
                <hr className="brightness-50 opacity-70" />
            </div>
            {/* <!--Dropdown 2--> */}
            <div className = "flex flex-col w-192">
                <button onClick={() => setHidden2(prev => !prev)}>
                    <div className = "flex justify-between py-6 pr-1 items-center">
                        <h1 className="text-white">
                            How do I Become a Sponsor?
                        </h1>
                        {/* <!--Placeholder down arrow--> */}
                        <Image id="arrow2" className = "w-3 h-3 flex-none overflow-hidden invert" src = "/assets/down.png" alt="down" width={48} height={48}/>
                    </div>
                </button> 

                <div id = "hidden2" className ="hidden">
                    <p className ="text-white text-pretty py-3 px-3">
                        Thanks for supporting our vision in advancements and education of rocketry and aerospace engineering in Alberta and Canada! 🚀 Leave us a message through our contact page, and we'll get back to you as soon as possible.
                    </p>
                </div>
                <hr className="brightness-50 opacity-70" />
            </div>
            {/* <!--Dropdown 3--> */}
            <div className = "flex flex-col w-192">
                <button onClick={() => setHidden3(prev => !prev)}>
                    <div className = "flex justify-between py-6 pr-1 items-center">
                        <h1 className="text-white">
                            How are the Rockets Built?
                        </h1>
                        {/* <!--Placeholder down arrow--> */}
                        <Image id="arrow3" className = "w-3 h-3 flex-none overflow-hidden invert" src = "/assets/down.png" alt="down" width={48} height={48}/>
                    </div>
                    
                </button> 

                <div id = "hidden3" className ="hidden">
                    <div className = "flex flex-col items-center justify-center">
                        <p className ="text-white text-pretty py-3 px-3">
                            We build our rockets in house at the University of Alberta's Elko Engineering Garage. Head to the Rocket Specs page for more details.
                        </p>
                        <video className="w-96 h-96" autoPlay muted loop>
                            <source src="/assets/simpson.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
                <hr className="brightness-50 opacity-70" />
            </div>
        </div>
    )



}