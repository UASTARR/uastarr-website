'use client'
import React, { use, useEffect, useState } from 'react'

export default function Countdown({
    launchDate
}: {
    launchDate: Date
}) {
    var now = new Date().getTime();
    var difference = launchDate.getTime() - now;
    const [timeLeft, setTimeLeft] = useState(difference);

    const [days, setDays] = React.useState(99);
    const [hours, setHours] = React.useState(99);
    const [minutes, setMinutes] = React.useState(59);
    const [seconds, setSeconds] = React.useState(59);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1000);
                setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
                setHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <>
            <div className="flex justify-center items-center" id="countdown">
                <div className="flex flex-col items-center space-y-2">
                    <div className="bg-green-700 h-16 w-20 rounded-md flex justify-center items-center">
                        <p className="text-white text-xl" id="days">{days}</p>
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
                        <p className="text-white text-xl" id="hours">{hours}</p>
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
                        <p className="text-white text-xl" id="minutes">{minutes}</p>
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
                        <p className="text-white text-xl" id="seconds">{seconds}</p>
                    </div>
                    <div className="bg-green-700 h-8 w-20 flex justify-center items-center">
                        <p className="text-white text-xl">Secs</p>
                    </div>
                </div>
            </div>
            <div className="h-3"></div>
            <p className="text-white">Until Our Launch</p>
        </>
    );
}