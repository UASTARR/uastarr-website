import Link from "next/link";

const Footer = () => {
    return (
        <div className="bg-black z-10 relative flex-col justify-between">
            {/* <!--Catagories--> */}
            <div className="flex justify-between space-x-6 px-12 pt-12">
                <div className="space-y-4 basis-1">
                    <h1 className="text-white font-semibold text-lg whitespace-nowrap">
                        Student Team for Alberta <br /> Rocketry Research
                    </h1>
                    <p className="text-gray-400 text-base whitespace-nowrap">
                        Donadeo Innovation Centre <br />
                        for Engineering <br />
                        9211-116 St. NW <br />
                        Edmonton, AB T6G 1H9
                    </p>
                    <div className="pt-4">
                        <Link href={"/contact"}>
                            <button className="whitespace-nowrap bg-yellow-500 hover:transition-all duration-200 hover:bg-white rounded-full px-6 py-3" type="button">Contact Us</button>
                        </Link>
                    </div>
                </div>
                <div className="space-y-4 basis-2">
                    <h1 className="text-white font-semibold text-lg whitespace-nowrap">
                        Want to stay in the know about STARR? 💫
                    </h1>
                    <p className="text-gray-400 text-base whitespace-nowrap">
                        Join our mailing list to keep up with our events, <br />
                        blog posts, and other news!
                    </p>
                </div>
                <div className="flex flex-col basis-1">
                    <h1 className="text-white font-semibold text-lg whitespace-nowrap pb-4">
                        Menu
                    </h1>
                    <Link href={"/"}>
                        <div className=" text-gray-400 text-base whitespace-nowrap">Home</div>
                    </Link>
                    <Link href={"/projects"}>
                        <div className="text-gray-400 text-base whitespace-nowrap">Projects</div>
                    </Link>
                    <Link href={"/about-us"}>
                        <div className="text-gray-400 text-base whitespace-nowrap">About Us</div>
                    </Link>
                    <Link href={"/sponsors"}>
                        <div className="text-gray-400 text-base whitespace-nowrap">Sponsors</div>
                    </Link>
                    <Link href={"/photo-albums"}>
                        <div className="text-gray-400 text-base whitespace-nowrap">Photo Albums</div>
                    </Link>
                    <Link href={"/contact"}>
                        <div className="text-gray-400 text-base whitespace-nowrap">Contact Us</div>
                    </Link>
                </div>
                <div className="flex flex-col basis-1">
                    <h1 className="text-white font-semibold text-lg whitespace-nowrap pb-4">
                        Follow us on
                    </h1>
                    <Link target="_blank" href="https://www.facebook.com/uastarr/" rel="noopener noreferrer">
                        <div className=" text-gray-400 text-base whitespace-nowrap">Facebook</div>
                    </Link>
                    <Link target="_blank" href="https://www.instagram.com/uastarr/" rel="noopener noreferrer">
                        <div className=" text-gray-400 text-base whitespace-nowrap">Instagram</div>
                    </Link>
                    <Link target="_blank" href="https://twitter.com/uastarr" rel="noopener noreferrer">
                        <div className=" text-gray-400 text-base whitespace-nowrap">Twitter</div>
                    </Link>
                    <Link target="_blank" href="https://www.linkedin.com/company/uastarr/" rel="noopener noreferrer">
                        <div className=" text-gray-400 text-base whitespace-nowrap">LinkedIn</div>
                    </Link>
                </div>
            </div>
            {/* <!--Copywright Statement--> */}
            <div className="pt-16">
                <h1 className="text-gray-400 text-base whitespace-nowrap">
                    Copyright © 2022 Student Team for Alberta Rocketry Research. All rights reserved.
                </h1>
            </div>
        </div>

    )
}

export default Footer;