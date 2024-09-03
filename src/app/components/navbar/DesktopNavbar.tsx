'use client';
import Link from "next/link"

const DesktopNavbar = () => {
    let timer: NodeJS.Timeout | undefined;
    let projectTimer: NodeJS.Timeout | undefined;
    function showPopup(): void {
        const popupElement = document.getElementById("popup");
        if (popupElement) {
            popupElement.classList.remove("hidden");
            clearTimeout(timer);
        }
    }
    function showPopupProject(): void {
        const popupProjectElement = document.getElementById("popupProject");
        if (popupProjectElement) {
            popupProjectElement.classList.remove("hidden");
            clearTimeout(projectTimer);
        }
    }
    function hidePopup(): void {
        const popupElement = document.getElementById("popup");
        if (popupElement) {
            popupElement.classList.add("hidden");
        }
    }
    function hidePopupProject(): void {
        const popupProjectElement = document.getElementById("popupProject");
        if (popupProjectElement) {
            popupProjectElement.classList.add("hidden");
        }
    }
    function delayedHidePopup(): void {
        timer = setTimeout(hidePopup, 500);
    }
    function delayedHidePopupProject(): void {
        projectTimer = setTimeout(hidePopupProject, 500);
    }
    function delayHidePopup(): void {
        clearTimeout(timer);
    }
    function delayHidePopupProject(): void {
        clearTimeout(projectTimer);
    }
    return (
        <div className="flex flex-nowrap">
            {/* Navigation bar */}
            <div className="bg-gray-50 bg-opacity-10 rounded-full bg-cover px-12 py-3" style={{ display: "inline-block" }}>
                {/* Navigation buttons */}
                <div className="flex flex-nowrap space-x-6">
                    <Link className="hover:text-yellow-300 text-white" href="/">Home</Link>
                    {/* <Link className="hover:text-yellow-300 text-white" href="/projects">Projects</Link>  */}
                    <div className="flex justify-center">
                        <Link href="/projects" className="popupProject hover:text-yellow-300 text-white" onMouseOver={() => showPopupProject()} onMouseOut={() => delayedHidePopupProject()}>Projects</Link>
                        <div className="absolute justify-items-center hidden translate-y-[45px]" id="popupProject" onMouseOver={() => delayHidePopupProject()} onMouseOut={() => delayedHidePopupProject()}>
                            <div className="flex flex-col justify-items-center bg-gray-50 bg-opacity-10 rounded-2xl left-20 px-3 py-3">
                                <Link href="/projects/rockets" className="pb-2 text-white text-center hover:text-yellow-300">Rockets</Link>
                                <Link href="/projects/payloads" className="pb-2 text-white text-center hover:text-yellow-300">Payloads</Link>
                                <Link href="/projects/ground-station" className="text-white text-center hover:text-yellow-300">Ground Station</Link>
                            </div>
                        </div>
                    </div>
                    <Link className="hover:text-yellow-300 text-white whitespace-nowrap" href="/about-us">About Us</Link>
                    <Link className="hover:text-yellow-300 text-white" href="/sponsors">Sponsors</Link>
                    <div className="flex justify-center">
                        <a className="popup hover:text-yellow-300 text-white cursor-default" onMouseOver={() => showPopup()} onMouseOut={() => delayedHidePopup()} >More</a>
                        <div className="absolute justify-items-center hidden translate-y-[45px]" id="popup" onMouseOver={() => delayHidePopup()} onMouseOut={() => delayedHidePopup()}>
                            <div className="flex flex-col justify-items-center bg-gray-50 bg-opacity-10 rounded-2xl left-20 px-3 py-3">
                                <Link href="/photo-albums" className="pb-2 text-white text-center hover:text-yellow-300 whitespace-nowrap">Photo Albums</Link>
                                <Link href="/contact" className="text-white text-center hover:text-yellow-300">Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Join Now Button */}
            <div className="inline-block pl-5">
                <Link target="_blank" href="https://forms.gle/rjTRr46NLjMoaXFMA" rel="noopener noreferrer">
                    <button className="text-white whitespace-nowrap bg-green-700 hover:transition-all duration-200 hover:bg-white hover:text-black rounded-full px-6 py-3">Join Now</button>
                </Link>
            </div>
        </div>
    )
}

export default DesktopNavbar;