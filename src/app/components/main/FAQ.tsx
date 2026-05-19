'use client';
import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";

type FAQItemProps = {
    title: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
};

function FAQItem({ title, open, onToggle, children }: FAQItemProps) {
    return (
        <div className="flex flex-col w-screen max-lg:px-6 lg:w-192">
            <button type="button" onClick={onToggle}>
                <div className="flex justify-between py-6 pr-1 items-center">
                    <h1 className="text-white">
                        {title}
                    </h1>
                    <Image
                        className={`w-3 h-3 flex-none overflow-hidden invert transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        src="/assets/down.png"
                        alt="down"
                        width={48}
                        height={48}
                    />
                </div>
            </button>

            <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                    <div className="pb-5">
                        {children}
                    </div>
                </div>
            </div>
            <hr className="brightness-50 opacity-70 max-lg:w-1/2" />
        </div>
    );
}

export default function FAQ() {
    const [hidden1, setHidden1] = useState(true);
    const [hidden2, setHidden2] = useState(true);
    const [hidden3, setHidden3] = useState(true);

    return (
        <div className = "lg:pl-20">
            <h1 className = "max-lg:pl-6 text-white text-4xl whitespace-nowrap flow_in_left">
                FAQ
            </h1>
            <div className = "h-4"></div>
            {/* <!--Dropdown 1--> */}
            <FAQItem title="How Do I Join STARR?" open={!hidden1} onToggle={() => setHidden1(prev => !prev)}>
                <Link target="_blank" href="/join" rel="noopener noreferrer">
                    <button className="text-white whitespace-nowrap bg-green-700 hover:transition-all duration-200 hover:bg-white hover:text-black rounded-full px-6 py-3">Click Here</button>
                </Link>
            </FAQItem>
            {/* <!--Dropdown 2--> */}
            <FAQItem title="How do I Become a Sponsor?" open={!hidden2} onToggle={() => setHidden2(prev => !prev)}>
                <p className="text-white text-pretty py-3 px-3">
                    Thanks for supporting our vision in advancements and education of rocketry and aerospace engineering in Alberta and Canada! 🚀 Leave us a message through our contact page, and we'll get back to you as soon as possible.
                </p>
            </FAQItem>
            {/* <!--Dropdown 3--> */}
            <FAQItem title="How are the Rockets Built?" open={!hidden3} onToggle={() => setHidden3(prev => !prev)}>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-white text-pretty py-3 px-3">
                        We build our rockets in house at the University of Alberta's Elko Engineering Garage. Head to the Rocket Specs page for more details.
                    </p>
                    <video className="w-80 h-80 lg:w-96 lg:h-96" muted loop>
                        <source src="/assets/simpson.mp4" type="video/mp4" />
                    </video>
                </div>
            </FAQItem>
        </div>
    )



}