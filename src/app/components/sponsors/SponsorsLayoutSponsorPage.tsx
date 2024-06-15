import Link from "next/link";
import getSponsorLogos from "./sponsors";

const SponsorsLayoutSponsorPage = async () => {
    const sponsors = await getSponsorLogos();
    return (
        <div className="flex flex-col relative flex-none z-20">
            {sponsors.map((sponsor: any, index: number) => (
                <div key={index}>
                    {index % 2 === 0 ? (<div className="flex h-128 overflow-hidden">
                        <div className="bg-cover grow overflow-hidden basis-1/2 flex justify-center items-center" style={{ backgroundImage: `url(${sponsor[4]})`, minWidth: '512px' }}>
                            <div className="flex-none">
                                <Link target='_blank' href={sponsor[1]} rel="noopener noreferrer">
                                    <img className="flex-none overflow-hidden w-112 fade_in" src={sponsor[0]} />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-DarkBlue grow overflow-hidden min-w-fit flex justify-center items-center basis-1/2">
                            <div className="w-128 shrink-0">
                                <h1 className="text-white text-4xl text-center">
                                    {sponsor[2]}
                                </h1>
                                <div className="h-10"></div>
                                <p className="text-white text-center">
                                    {sponsor[3]}
                                </p>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="flex h-128 overflow-hidden">
                            <div className="bg-DarkBlue grow overflow-hidden min-w-fit flex justify-center items-center basis-1/2">
                                <div className="w-128 shrink-0">
                                    <h1 className="text-white text-4xl text-center">
                                        {sponsor[2]}
                                    </h1>
                                    <div className="h-10"></div>
                                    <p className="text-white text-center">
                                        {sponsor[3]}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-cover grow overflow-hidden basis-1/2 flex justify-center items-center" style={{ backgroundImage: `url(${sponsor[4]})`, minWidth: '512px' }}>
                                <div className="flex-none">
                                    <Link target='_blank' href={sponsor[1]} rel="noopener noreferrer">
                                        <img className="flex-none overflow-hidden w-112 fade_in" src={sponsor[0]} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default SponsorsLayoutSponsorPage;