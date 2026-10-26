'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import launchCanadaLogo from '@/public/assets/logos/LaunchCanadaLogo.png';

export interface EventBannerProps {
    targetDate?: string;
    competitionName?: string;
    location?: string;
    subtitle?: string;
    link?: string;
}

function calculateTimeLeft(targetTimestamp: number, now: number) {
    const difference = targetTimestamp - now;
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;

    // Is the event in the future?
    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            status: 'countdown' as const,
        };
    }

    // Is the event occurring right now (within 7 days of target date)?
    if (difference <= 0 && difference >= -oneWeekMs) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            status: 'live' as const,
        };
    }

    // Event concluded
    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        status: 'concluded' as const,
    };
}

const TimeUnit = ({ value, label }: { value: number | null; label: string }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className="bg-black h-14 w-16 lg:h-16 lg:w-20 rounded-md flex justify-center items-center shadow-md">
            <p className="text-yellow-500 text-xl lg:text-2xl font-bold font-mono tabular-nums">
                {value === null ? '--' : String(value).padStart(2, '0')}
            </p>
        </div>
        <p className="text-black text-xs lg:text-sm font-bold uppercase tracking-wider">{label}</p>
    </div>
);

const EventBanner = ({
    targetDate = '2027-08-14T12:00:00-04:00',
    competitionName = 'Launch Canada 2027',
    location = 'Timmins, Ontario',
    subtitle,
    link = 'https://www.launchcanada.org',
}: EventBannerProps) => {
    // null until mount to prevent hydration mismatch between server time and client time
    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

    useEffect(() => {
        const targetTimestamp = new Date(targetDate).getTime();
        const tick = () => setTimeLeft(calculateTimeLeft(targetTimestamp, Date.now()));
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    const status = timeLeft?.status ?? 'countdown';

    const defaultSubtitle =
        status === 'live'
            ? `We're live in ${location} — follow along as we compete!`
            : status === 'concluded'
            ? `Competition concluded in ${location} — stay tuned for results!`
            : `Countdown to competition week in ${location}`;

    return (
        <section aria-label="Competition Countdown Banner" className="z-20 relative flex flex-nowrap py-8 lg:py-10 flex-col bg-yellow-500 shadow-inner">
            <div className="px-5 lg:px-20">
                <div className="flex flex-col items-center">
                    <Image
                        src={launchCanadaLogo}
                        alt={`${competitionName} Logo`}
                        className="h-16 w-16 lg:h-20 lg:w-20 object-contain pb-4 flow_in_left"
                    />
                    <div className="flex items-center gap-2 pb-2">
                        <h1 className="text-black text-center text-3xl lg:text-5xl font-extrabold flow_in_left">
                            {competitionName}
                        </h1>
                        {status === 'live' && (
                            <span className="bg-red-600 text-white text-xs lg:text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                                Live Now
                            </span>
                        )}
                    </div>
                    <p className="text-black text-center text-lg lg:text-2xl font-medium flow_in_left delay-300 pb-6">
                        {subtitle || defaultSubtitle}
                    </p>

                    {status === 'countdown' && (
                        <div className="flex justify-center items-center gap-2 lg:gap-3 flow_in_left delay-600 pb-6" aria-live="polite">
                            <TimeUnit value={timeLeft?.days ?? null} label="Days" />
                            <span className="text-black text-2xl lg:text-3xl font-extrabold pb-6">:</span>
                            <TimeUnit value={timeLeft?.hours ?? null} label="Hours" />
                            <span className="text-black text-2xl lg:text-3xl font-extrabold pb-6">:</span>
                            <TimeUnit value={timeLeft?.minutes ?? null} label="Mins" />
                            <span className="text-black text-2xl lg:text-3xl font-extrabold pb-6">:</span>
                            <TimeUnit value={timeLeft?.seconds ?? null} label="Secs" />
                        </div>
                    )}

                    <Link
                        target="_blank"
                        href={link}
                        rel="noopener noreferrer"
                        className="flow_in_left delay-900"
                    >
                        <button className="whitespace-nowrap bg-black text-yellow-500 hover:transition-all hover:bg-white hover:text-black rounded-full px-10 py-3 font-bold shadow-lg">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default EventBanner;

