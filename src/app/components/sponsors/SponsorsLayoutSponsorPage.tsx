import Link from "next/link";
import getSponsorLogos from "./sponsors";
import { getSponsors } from "@/library/firebase/firestore";

const SponsorsLayoutSponsorPage = async () => {
    const sponsors = await getSponsors();
    return (
        <div className="flex flex-col relative flex-none z-20">
            {sponsors.map((sponsor: any, index: number) => (
                <div key={index}>
                    {index % 2 === 0 ? (<div className="flex h-128 overflow-hidden">
                        <div className="bg-cover grow overflow-hidden basis-1/2 flex justify-center items-center" style={{ backgroundImage: `url(${sponsor.background})`, minWidth: '512px' }}>
                            <div className="flex-none">
                                <Link target='_blank' href={sponsor.link} rel="noopener noreferrer">
                                    <img className="flex-none overflow-hidden w-112 fade_in" src={sponsor.imgref} />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-DarkBlue grow overflow-hidden min-w-fit flex justify-center items-center basis-1/2">
                            <div className="w-128 shrink-0">
                                <h1 className="text-white text-4xl text-center">
                                    {sponsor.name}
                                </h1>
                                <div className="h-10"></div>
                                <p className="text-white text-center">
                                    {sponsor.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="flex h-128 overflow-hidden">
                            <div className="bg-DarkBlue grow overflow-hidden min-w-fit flex justify-center items-center basis-1/2">
                                <div className="w-128 shrink-0">
                                    <h1 className="text-white text-4xl text-center">
                                        {sponsor.name}
                                    </h1>
                                    <div className="h-10"></div>
                                    <p className="text-white text-center">
                                        {sponsor.description}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-cover grow overflow-hidden basis-1/2 flex justify-center items-center" style={{ backgroundImage: `url(${sponsor.background})`, minWidth: '512px' }}>
                                <div className="flex-none">
                                    <Link target='_blank' href={sponsor.link} rel="noopener noreferrer">
                                        <img className="flex-none overflow-hidden w-112 fade_in" src={sponsor.imgref} />
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