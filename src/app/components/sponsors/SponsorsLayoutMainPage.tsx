import Link from 'next/link';
import { getSponsors } from '@/library/firebase/firestore';

const SponsorsLayoutMainPage = async () => {
    const sponsors = await getSponsors();
    // For even number of sponsors
    // Displays 'become a sponsor' button at the end as wide as two sponsor logos
    if (sponsors.length % 2 === 0) {
        return (
            <div>
                {sponsors.map((sponsor: any, index: number) => (
                    <div key={index} className="flex flex-col lg:flex-row overflow-hidden min-w-max">
                        {index % 2 === 0 && (
                            <>
                            <div className="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t lg:border-r border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                                <Link target="_blank" href={sponsor.link} rel="noopener noreferrer" className="flex justify-center object-contain">
                                    <img className="max-w-80 max-h-28" src={sponsor.imgref} alt={sponsor.name}/>
                                </Link>
                            </div>
                            <div className="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                                <Link target="_blank" href={sponsors[index+1].link} rel="noopener noreferrer" className="flex justify-center object-contain">
                                    <img className="max-w-80 max-h-28" src={sponsors[index+1].imgref} alt={sponsors[index+1].name}/>
                                </Link>
                            </div>
                            </>
                        )}
                    </div>
                ))}
                <div className = "flex overflow-hidden min-w-max">
                    <div className ="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                        <Link href={'/contact'}>
                            <button className="whitespace-nowrap bg-yellow-500 hover:transition-all duration-200 hover:bg-white rounded-full px-6 py-3" type="button">Want to become a sponsor?</button>
                        </Link>
                    </div>
                </div>
            </div>
        );

    // For odd number of sponsors
    // Displays 'become a sponsor' button at the end as wide as one sponsor logo
    } else {
        return (
            <div>
                {sponsors.map((sponsor: any, index: number) => (
                    <div key={index} className="flex flex-col lg:flex-row overflow-hidden min-w-max">
                        {index % 2 === 0 && (
                            <div className="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t lg:border-r border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                                <Link target="_blank" href={sponsor.link} rel="noopener noreferrer" className="flex justify-center object-contain">
                                    <img className="max-w-80 max-h-28" src={sponsor.imgref} alt={sponsor.name}/>
                                </Link>
                            </div>
                        )}
                        {index % 2 === 0 && (
                            index + 1 !== sponsors.length ? (
                                <div className="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                                    <Link target="_blank" href={sponsors[index+1].link} rel="noopener noreferrer" className="flex justify-center object-contain">
                                        <img className="max-w-80 max-h-28" src={sponsors[index+1].imgref} alt={sponsors[index+1].name}/>
                                    </Link>
                                </div>
                            ) : (
                                <div className="shrink-0 h-28 w-screen lg:w-80 grow bg-cover flex justify-center items-center overflow-hidden border-t border-black" style={{ backgroundImage: "url(/assets/sponsor_bkgs/standardbkg.jpeg)" }}>
                                    <Link href={'/contact'}>
                                        <button className="whitespace-nowrap bg-yellow-500 hover:transition-all duration-200 hover:bg-white rounded-full px-6 py-3" type="button">Want to become a sponsor?</button>
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

export default SponsorsLayoutMainPage;