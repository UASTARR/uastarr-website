import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Logo {
    src: string | StaticImageData;
    alt: string;
}

const Competition = ({
    year, name, link, logo, description
} : {
    year: string, name: string, link: string, logo: Logo, description: string
}) => {
    return (
        <div className="flex items-center space-x-5 overflow-hidden">
            {/* <!--Text--> */}
            <div>
                <h1 className="text-white text-3xl whitespace-nowrap">
                    {year}
                </h1>
                <h2 className="text-white text-6xl pb-6 w-128 text-pretty">
                    {name}
                </h2>
                <hr className="w-24 h-2 pb-8" />
                <p className="text-white text-lg w-128 text-pretty ">
                    {description}
                </p>
                {/* <!--Learn more button--> */}
                <div className="h-16"></div>
                <div>
                    <Link target="_blank" href={link} rel="noopener noreferrer">
                        <button
                            className="whitespace-nowrap bg-red-600 hover:transition-all text-white hover:bg-white hover:text-black rounded-full px-14 py-3">
                            Learn More
                        </button>
                    </Link>
                </div>
            </div>

            {/* <!--Logo--> */}
            <Image src={logo.src} className="h-72 w-72 object-contain" alt={logo.alt} width={700} height={700}/>
        </div>
    )
}

export default Competition;