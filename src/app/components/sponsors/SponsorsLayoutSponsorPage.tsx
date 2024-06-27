import Link from "next/link";
import { getSponsorRanks, getSponsors } from "@/library/firebase/firestore";
import SponsorWithImage from "./SponsorsLayoutSingleSponsorPage";
import PackageBackground from "@/public/assets/sponsor_bkgs/bkg3.jpeg"
import Image from "next/image";

const SponsorsLayoutSponsorPage = async () => {
    const sponsorRanks = await getSponsorRanks();
    const sponsors = [] as any[];
    const bannerColours: { [key: string]: string } = {
        "bronze": "bg-gradient-to-r from-orange-400 to-zinc-500",
        "silver": "bg-gradient-to-r from-gray-400 to-zinc-500",
        "gold": "bg-gradient-to-r from-yellow-400 to-zinc-500",
        "green": "bg-gradient-to-r from-green-500 to-zinc-500"
    }
    for (let i = 0; i < sponsorRanks.length; i++) {
        sponsors[i] = await getSponsors(sponsorRanks[i].id);
    }
    let sponsorIndex = 0;
    return (
        <div className="flex flex-col relative flex-none z-20">
            {sponsorRanks.map((currentRank: any, index: number) => {
                const currentSponsors = sponsors[index];
                const colour = bannerColours[currentRank.colour];
                return (
                    <div key={index}>
                        <div className={`relative py-5 lg:py-10 flex justify-center items-center ${colour}`}>
                            <h1 className="text-2xl font-bold lg:text-4xl text-center text-white">
                                {currentRank.title}
                            </h1>
                        </div>
                        {currentSponsors.length ? (currentSponsors.map((sponsor: any, index: number) => {
                            sponsorIndex++;
                            return (
                                <div key={index}>
                                    {sponsorIndex % 2 === 0 ? (
                                        <SponsorWithImage
                                            side='left'
                                            link={sponsor.link}
                                            imgref={sponsor.imgref} name={sponsor.name}
                                            description={sponsor.description}
                                            background={sponsor.background}
                                        />
                                    ) : (
                                        <>
                                            <div className="max-lg:hidden">
                                                <SponsorWithImage
                                                    side='right'
                                                    link={sponsor.link}
                                                    imgref={sponsor.imgref}
                                                    name={sponsor.name}
                                                    description={sponsor.description}
                                                    background={sponsor.background}
                                                />
                                            </div>
                                            <div className="lg:hidden">
                                                <SponsorWithImage
                                                    side='left'
                                                    link={sponsor.link}
                                                    imgref={sponsor.imgref}
                                                    name={sponsor.name}
                                                    description={sponsor.description}
                                                    background={sponsor.background}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            )
                        })) : (
                            <div className="bg-DarkBlue grow min-w-fit flex justify-center items-center h-64">
                                <div className="w-screen shrink-0 px-6">
                                    <h1 className="text-white text-2xl lg:text-4xl text-center">
                                        Get your sponsorship here!
                                    </h1>
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

const SponsorPackageDesktop = () => {
    {/* <!--This is very janky, would not reccomend touching unless you have to--> */ }
    return (
        <div className="z-20 bg-white relative h-192" style={{ backgroundImage: "url(https://static.wixstatic.com/media/9dc5ac_39ff54e1dfa04e298cb7d58566700807~mv2.jpg/v1/fill/w_1960,h_1652,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/9dc5ac_39ff54e1dfa04e298cb7d58566700807~mv2.jpg)" }}>
            <div className="h-16"></div>
            <div className="flex overflow-hidden grow">
                <div className="w-20 grow-0 overflow-hidden"></div>
                <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-60" >
                    <div className="overflow-hidden w-160 h-144 flex items-center">
                        <div className="flex">
                            <div className="w-8 flex-none"></div>

                            <Link href={'/assets/sponsor_package/Sponsorship Package - STARR.pdf'} download={true} className="w-96 flex justify-center">
                                <img src="/assets/sponsor_package/sponsorsCover.jpeg" style={{ width: '389px', height: '504px' }} />
                            </Link>
                            <div className="w-56 flex-none"></div>

                        </div>
                    </div>
                </div>
                <div className="shrink-0 grow flex justify-center overflow-y-hidden" >
                    <div className="overflow-hidden w-64"></div>
                </div>
                <div className="shrink w-20 grow-0 overflow-hidden"></div>
            </div>

            <div className="flex overflow-y-visible grow">
                <div className="w-20 grow-0 overflow-hidden"></div>
                <div className="shrink-0 grow flex justify-center overflow-y-hidden" >
                    <div className="overflow-hidden w-112"></div>
                </div>
                <div className="shrink-0 grow flex justify-center overflow-hidden bg-black bg-opacity-90 -translate-y-128" >
                    <div className="overflow-hidden w-112 h-144">
                        <div className="flex">
                            <div className="w-6 flex-none"></div>
                            <div>
                                <div className="h-12"></div>
                                <h1 className="text-white text-6xl w-96">
                                    Sponsorship Package 2023/2024
                                </h1>
                                <div className="h-12"></div>
                                <p className="text-white text-base w-96">
                                    Interested in learning more about us and our plans for Ringo III? <br />
                                    Do you want to help support our mission? Check out our sponsorship package
                                    to see more of what we have to offer to the world of rocketry and engineering.
                                </p>
                                <div className="h-12"></div>
                                {/* Link place holder */}
                                <Link href={'/assets/sponsor_package/Sponsorship Package - STARR.pdf'} download={true}>
                                    <button
                                        className="whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                                        View Sponsorship Package
                                    </button>
                                </Link>
                            </div>
                            <div className="w-6 flex-none"></div>

                        </div>
                    </div>
                </div>
                <div className="shrink w-20 grow-0 overflow-hidden"></div>
            </div>
        </div>
    )
}

const SponsorPackageMobile = () => {
    return (
        <>
            <div className="bg-gradient-to-b from-cyan-950 to-black grow min-w-fit flex flex-col justify-center items-center z-20 relative py-6 min-h-80">
                <div className="w-screen lg:w-128 px-6 lg:px-0">
                    <h1 className="text-white text-2xl lg:text-4xl text-center">
                        Sponsorship Package 2023/2024
                    </h1>
                    <div className="h-5 lg:h-10"></div>
                    <p className="text-white text-xs lg:text-lg text-center text-pretty">
                        Interested in learning more about us and our plans for Ringo III? <br />
                        Do you want to help support our mission? Check out our sponsorship package
                        to see more of what we have to offer to the world of rocketry and engineering.
                    </p>
                </div>
                <div className="h-12"></div>
                {/* Link place holder */}
                <Link href={'/assets/sponsor_package/Sponsorship Package - STARR.pdf'} download={true}>
                    <button
                        className="bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                        View Sponsorship Package
                    </button>
                </Link>
            </div>
            <div className="bg-cover flex relative justify-center items-center w-screen py-6" style={{ backgroundImage: `url(${PackageBackground.src})` }}>
                <div className="flex-none">
                    {/* Link place holder */}
                    <Link href={'/assets/sponsor_package/Sponsorship Package - STARR.pdf'} download={true} className="max-h-80 object-contain">
                        <Image className="justify-center object-contain max-h-80 w-screen" src="/assets/sponsor_package/sponsorsCover.jpeg" alt="Sponsor Package" width={389} height={504} />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SponsorsLayoutSponsorPage;
export { SponsorPackageDesktop, SponsorPackageMobile };