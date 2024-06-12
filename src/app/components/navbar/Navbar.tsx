'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import web_logo from '../../../public/assets/logos/logo.png';
import Link from 'next/link';

const Navbar = () => {
    const [popup, setPopup] = useState(true);
    let timer: NodeJS.Timeout | undefined;
    const showPopup = () => {
        clearTimeout(timer);
        setPopup(false);
    }

    const delayedHidePopup = () => {
        timer = setTimeout(() => setPopup(true), 500);
    }

    return (
        <div className ="header fixed z-50 items-center py-5 flex justify-between flex-nowrap w-screen" id="header">
            <div className = "inline-block flex-none px-6">
                <Link href="/"><Image className="size-11/12" src={web_logo} alt="starr logo broken"/></Link>
            </div>
            <div className ="flex flex-nowrap">
                {/* Navigation bar */}
                <div className = "bg-gray-50 bg-opacity-10 rounded-full bg-cover px-12 py-3" style = {{display: "inline-block"}}>
                    {/* Navigation buttons */}
                    <div className ="flex flex-nowrap space-x-6">
                        <Link className="hover:text-yellow-300 text-white" href="/">Home</Link> 
                        <Link className="hover:text-yellow-300 text-white" href="/projects">Projects</Link> 
                        <Link className="hover:text-yellow-300 text-white whitespace-nowrap" href="/about-us">About Us</Link> 
                        <Link className="hover:text-yellow-300 text-white" href="/sponsors">Sponsors</Link>
                        <div className="inline-block justify-items-center">
                        
                            <div className="hover:text-yellow-300 text-white cursor-default" onMouseOver={showPopup} onMouseOut={delayedHidePopup}> More </div>
                            <div className="truepopup justify-items-center" id ="popup" hidden={popup} onMouseOver={() => clearTimeout(timer)} onMouseOut={delayedHidePopup}>
                                <div className = "justify-items-center bg-gray-50 bg-opacity-10 rounded-full left-8 px-6 py-3">
                                    <div><Link className="text-white hover:text-yellow-300 whitespace-nowrap" href="/photo-albums"> Photo Albums </Link></div>
                                    <div><Link className="text-white hover:text-yellow-300" href="/contact"> Contact </Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Join Now Button */}
                <div className = "inline-block px-5 pr-10">
                    <Link href="/contact">
                        <button className="text-white whitespace-nowrap bg-green-700 hover:transition-all duration-200 hover:bg-white hover:text-black rounded-full px-6 py-3">Join Now</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;