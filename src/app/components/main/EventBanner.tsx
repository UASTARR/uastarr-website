'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import launchCanadaLogo from '@/public/assets/logos/LaunchCanadaLogo.png';

const TARGET_DATE = new Date('2026-08-15T12:00:00-04:00').getTime();

function getTimeLeft(now: number) {
    const difference = Math.max(0, TARGET_DATE - now);
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        finished: difference <= 0,
    };
}

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className="bg-black h-14 w-16 lg:h-16 lg:w-20 rounded-md flex justify-center items-center">
            <p className="text-yellow-500 text-xl lg:text-2xl font-bold tabular-nums">
                {String(value).padStart(2, '0')}
            </p>
        </div>
        <p className="text-black text-sm lg:text-base font-semibold">{label}</p>
    </div>
);

const EventBanner = () => {
    const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(Date.now()));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(Date.now()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="z-20 relative flex flex-nowrap py-8 lg:py-10 flex-col bg-yellow-500">
            <div className="px-5 lg:px-20">
                <div className="flex flex-col items-center">
                    <Image
                        src={launchCanadaLogo}
                        alt="Launch Canada Logo"
                        className="h-16 w-16 lg:h-20 lg:w-20 object-contain pb-4 flow_in_left"
                    />
                    <h1 className="text-black text-center text-3xl lg:text-5xl font-bold flow_in_left pb-2">
                        Launch Canada 2026
                    </h1>
                    <p className="text-black text-center text-lg lg:text-2xl flow_in_left delay-300 pb-6">
                        {timeLeft.finished
                            ? "We're live in Timmins — follow along as we launch Albireo!"
                            : 'Countdown to competition week in Timmins, Ontario'}
                    </p>

                    {!timeLeft.finished && (
                        <div className="flex justify-center items-end gap-2 lg:gap-3 flow_in_left delay-600 pb-6">
                            <TimeUnit value={timeLeft.days} label="Days" />
                            <span className="text-black text-2xl lg:text-3xl font-bold pb-8">:</span>
                            <TimeUnit value={timeLeft.hours} label="Hours" />
                            <span className="text-black text-2xl lg:text-3xl font-bold pb-8">:</span>
                            <TimeUnit value={timeLeft.minutes} label="Mins" />
                            <span className="text-black text-2xl lg:text-3xl font-bold pb-8">:</span>
                            <TimeUnit value={timeLeft.seconds} label="Secs" />
                        </div>
                    )}

                    <Link
                        target="_blank"
                        href="https://www.launchcanada.org"
                        rel="noopener noreferrer"
                        className="flow_in_left delay-900"
                    >
                        <button className="whitespace-nowrap bg-black text-yellow-500 hover:transition-all hover:bg-white hover:text-black rounded-full px-10 py-3 font-semibold">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventBanner;
