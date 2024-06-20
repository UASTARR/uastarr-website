import Link from "next/link";

const SponsorWithImage = ({
        side, link, imgref, name, description, background
    } : {
        side: string, link: string, imgref: string, name: string, description: string, background: string
    }) => {
    if (side === 'left') {
        return (
            <div className="flex flex-col lg:flex-row h-128">
                <SponsorImage imgref={imgref} link={link} background={background} />
                <SponsorText name={name} description={description} />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col lg:flex-row h-128">
                <SponsorText name={name} description={description} />
                <SponsorImage imgref={imgref} link={link} background={background} />
            </div>
        );
    }
}

const SponsorImage = ({ imgref, link, background } : { imgref: string, link: string, background: string }) => {
    return (
        <div className="bg-cover grow basis-1/2 flex justify-center items-center w-screen lg:w-512" style={{ backgroundImage: `url(${background})` }}>
            <div className="flex-none">
                <Link target='_blank' href={link} rel="noopener noreferrer">
                    <img className="flex-none w-screen px-6 lg:px-0 max-h-64 object-contain lg:w-112 fade_in" src={imgref} />
                </Link>
            </div>
        </div>
    );
}

const SponsorText = ({ name, description } : { name: string, description: string }) => {
    return (
        <div className="bg-DarkBlue grow min-w-fit flex justify-center items-center basis-1/2">
            <div className="w-screen lg:w-128 shrink-0 px-6 lg:px-0">
                <h1 className="text-white text-2xl lg:text-4xl text-center">
                    {name}
                </h1>
                <div className="h-5 lg:h-10"></div>
                <p className="text-white text-xs lg:text-lg text-center text-pretty">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default SponsorWithImage;