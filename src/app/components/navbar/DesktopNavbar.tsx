'use client';
import Link from "next/link"

const DesktopNavbar = () => {
    let timer: NodeJS.Timeout | undefined;
    function showPopup(): void {
        const popupElement = document.getElementById("popup");
        if (popupElement) {
            popupElement.classList.remove("hidden");
            clearTimeout(timer);
        }
    }
    function hidePopup(): void {
        const popupElement = document.getElementById("popup");
        if (popupElement) {
            popupElement.classList.add("hidden");
        }
    }
    function delayedHidePopup(): void {
        timer = setTimeout(hidePopup, 500);
    }
    function delayHidePopup(): void {
        clearTimeout(timer);
    }
    return (
        <div className ="flex flex-nowrap">
            {/* Navigation bar */}
            <div className = "bg-gray-50 bg-opacity-10 rounded-full bg-cover px-12 py-3" style = {{display: "inline-block"}}>
                {/* Navigation buttons */}
                <div className ="flex flex-nowrap space-x-6">
                    <Link className="hover:text-yellow-300 text-white" href="/">Home</Link> 
                    <Link className="hover:text-yellow-300 text-white" href="/projects">Projects</Link> 
                    <Link className="hover:text-yellow-300 text-white whitespace-nowrap" href="/about-us">About Us</Link> 
                    <Link className="hover:text-yellow-300 text-white" href="/sponsors">Sponsors</Link>
                    <div className="inline-block justify-center flex">
                    
                        <a className="popup hover:text-yellow-300 text-white cursor-default" onMouseOver={() => showPopup()} onMouseOut={() => delayedHidePopup()} >More</a>
                        <div className="truepopup absolute justify-items-center hidden translate-y-[45px]" id ="popup" onMouseOver={() => delayHidePopup()} onMouseOut={() => delayedHidePopup()}> 
                            <div className = "flex flex-col justify-items-center bg-gray-50 bg-opacity-10 rounded-2xl left-20 px-3 py-3">
                                <Link href="/photo-albums" className="pb-2 text-white text-center hover:text-yellow-300 whitespace-nowrap">Photo Albums</Link>
                                <Link href="/contact" className="text-white text-center hover:text-yellow-300">Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Join Now Button */}
            <div className = "inline-block pl-5">
                <Link href="/contact">
                    <button className="text-white whitespace-nowrap bg-green-700 hover:transition-all duration-200 hover:bg-white hover:text-black rounded-full px-6 py-3">Join Now</button>
                </Link>
            </div>
        </div>
    )
}

export default DesktopNavbar;