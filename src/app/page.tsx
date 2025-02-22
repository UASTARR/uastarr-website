import Image from "next/image";
import Link from "next/link";
import vectorIcon from "../public/assets/STARRVectorIconSquare.png";
import elkoLogo from "../public/assets/logos/UofA_Elko_logo_outline_white.png";
import launchCanadaLogo from "../public/assets/logos/LaunchCanadaLogo.png";
import SponsorsLayoutMainPage from "./components/sponsors/SponsorsLayoutMainPage";
import BaseScripts from "./components/scripts/BaseScripts";
import Competition from "./components/main/Competition";
import FAQ from "./components/main/FAQ";
import PrintingBackground from "./components/videos/PrintingBackground";

export default function Home() {
    const firstBg = { backgroundImage: 'url(https://static.wixstatic.com/media/9dc5ac_f8ff2a1c0ac045669658cae9288656b4~mv2.jpg/v1/fill/w_1225,h_1100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/9dc5ac_f8ff2a1c0ac045669658cae9288656b4~mv2.jpg)' };
    const spacePortLogo = 'https://static.wixstatic.com/media/9dc5ac_05c9d5bc50ba42bcbb1d7a5233e21d0e~mv2.png/v1/fill/w_136,h_151,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/two-color-rocket_orig.png'

    return (
        <main>
            <BaseScripts />
            {/* <!--Tile 1--> */}
            <div className="z-20 relative flex flex-nowrap h-288 lg:h-224 flex-col bg-local bg-cover bg-left justify-between" style={firstBg}>
                <div className="h-32"></div>
                {/* <!--Main Text--> */}
                <div className="lg:pl-20">
                    <div className="flex flex-col lg:flex-row items-center">
                        <Image className="flex-none" src={vectorIcon} alt="Vector Icon" />
                        <h1 className="text-white text-center lg:text-left text-5xl lg:text-8xl font-bold flow_in_left">
                            It's Just Rocket <br /> Science.
                        </h1>
                    </div>
                    <p className="text-lg lg:text-2xl text-white flow_in_left delay-300 text-pretty px-6">
                        Student Team for Alberta Rocketry Research, University of Alberta
                    </p>
                    {/* <!--Buttons--> */}
                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-5 pl-5 pt-6">
                        <Link href="/about-us">
                            <button
                                className="flow_in_left delay-700 whitespace-nowrap bg-yellow-500 hover:transition-all hover:bg-white rounded-full w-40 py-3">
                                About Us
                            </button>
                        </Link>
                        <Link href="/projects" className="pt-6 lg:pt-0">
                            <button
                                className="flow_in_left delay-1000 whitespace-nowrap text-white bg-gray-50 bg-opacity-10 hover:transition-all hover:opacity-100 hover:bg-white hover:text-black rounded-full w-40 py-3">
                                Our Projects
                            </button>
                        </Link>
                    </div>
                </div>
                {/* <!--Info Box--> */}
                <div className="flex px-0 lg:px-20 pb-32">
                    <div className="flex flex-col lg:flex-row lg:justify-between w-screen px-3 py-3 bg-black bg-opacity-70 basis-1 grow">
                        {/* <!-- Textboxes --> */}
                        <div className="flex items-center h-20">
                            <div className="bg-green-800 h-16 w-2 rounded-full"></div>
                            <p className="text-white text-xl px-3 whitespace-nowrap fade_in">
                                100+ students
                            </p>
                        </div>
                        <div className="flex items-center h-20">
                            <div className="bg-green-800 h-16 w-2 rounded-full"></div>
                            <p className="text-white text-xl px-3 whitespace-nowrap fade_in delay-400">
                                7 Sub-Teams
                            </p>
                        </div>
                        <div className="flex items-center h-20">
                            <div className="bg-green-800 h-16 w-2 rounded-full"></div>
                            <p className="text-white text-xl px-3 whitespace-nowrap fade_in delay-800">
                                Est. in 2018
                            </p>
                        </div>
                        <div className="flex items-center h-20">
                            <div className="bg-green-800 h-16 w-2 rounded-full"></div>
                            <p className="text-white text-xl px-3 whitespace-nowrap fade_in delay-1200">
                                4 rockets launched
                            </p>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* <!--Tile 2 Background Video--> */}
            <PrintingBackground />

            {/* <!--Tile 2--> */}
            <div className="z-10 relative flex flex-nowrap h-192 flex-col bg-emerald-900 bg-opacity-10 bg-local bg-cover bg-[center-10rem] justify-between">
                <div className="flex pl-3 lg:pl-20 overflow-hidden">
                    <h1 className="flow_in_top px-3 py-3 bg-white rounded-b-2xl text-xl font-bold basis w-72">
                        How we do it
                    </h1>

                </div>
                <div className="px-6 lg:pl-20">
                    <Image className="w-80" src={elkoLogo} alt="Elko Logo" />
                    <div className="h-6"></div>
                    <h1 className="text-pretty text-white text-bold flow_in_left py-6 w-3/4 text-2xl leading-loose lg:w-160 lg:text-4xl lg:leading-relaxed">
                        From 3D printing, to electronics, to
                        assembly, we build our rockets in
                        house at UAlberta's very own Elko
                        Engineering Garage.
                    </h1>
                    <div className="pt-3">
                        {/* <Link href="/down-for-maintenance">
                            <button
                                className="flow_in_left delay-150 bg-yellow-500 hover:transition-all hover:bg-white rounded-full px-8 py-3">
                                Learn more about how our rockets are made
                            </button>
                        </Link> */}
                    </div>
                </div>
                <div className="basis-1/4"></div>

            </div>

            {/* <!--Tile 3--> */}
            <div className="z-10 relative flex flex-nowrap h-288 flex-col bg-cover justify-between bg-center" style={{ backgroundImage: 'url(/assets/backgrounds/rocket_bkg.jpeg)' }}>
                <div className="flex pl-3 lg:pl-20 overflow-hidden">
                    <h1 className="flow_in_top px-3 w-72 py-3 bg-white rounded-b-2xl text-xl font-bold">
                        Our Vision
                    </h1>
                </div>
                {/* <!--Main Content--> */}
                <div className="px-6 lg:pl-20 space-y-12">
                    {/* <!--Row 1--> */}
                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-16 space-y-12 lg:space-y-0">
                        {/* <!--Col 1--> */}
                        <div>
                            {/* <!--Rocket Icon--> */}
                            <div className="flex flex-row lg:flex-col max-lg:items-center">
                                <div className="fade_in h-14 w-14 rounded-xl border-2 border-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" aria-hidden="true" aria-labelledby="svgcid-jxdrfnhbrdbl" data-bbox="52 31.5 96 137" data-type="color" viewBox="52 31.5 96 137"><defs><style></style></defs><path fill="#FFFFFF" d="M113.508 168.5H86.493l-5.925-10.489-13.864 7.815L52 125.84l9.882-15.696a115.52 115.52 0 0 1-.56-11.358c0-35.788 34.569-63.984 36.042-65.167l2.635-2.119 2.636 2.119c1.472 1.182 36.041 29.378 36.041 65.167 0 3.82-.186 7.631-.558 11.358L148 125.84l-14.704 39.987-13.866-7.815-5.922 10.488zm-22.1-8.5h17.184l7.642-13.529 12.57 7.086 9.825-26.721-9.229-14.662.168-1.489c.44-3.883.664-7.885.664-11.899 0-26.353-22.424-49.104-30.229-56.223-7.801 7.131-30.236 29.928-30.236 56.223 0 3.977.225 7.982.666 11.901l.168 1.486-9.229 14.662 9.825 26.719 12.568-7.083L91.408 160z" data-color="1" /><path fill="#FFFFFF" d="M109.99 86.986c0 5.552-4.473 10.053-9.99 10.053s-9.99-4.5-9.99-10.053c0-5.552 4.473-10.053 9.99-10.053s9.99 4.5 9.99 10.053z" data-color="1" /></svg>
                                </div>
                                <h1 className="fade_in whitespace-nowrap text-2xl text-white lg:pt-8 max-lg:pl-3">
                                    Advance
                                </h1>
                            </div>
                            <p className="fade_in whitespace-nowrap text-white pt-5 lg:pt-12 text-lg">
                                Develop sounding rockets for <br />
                                intercollegiate competitions and <br />
                                provide a platform to test new data <br />
                                acquisition instruments.
                            </p>
                        </div>
                        {/* <!--Col 2--> */}
                        <div>
                            {/* <!--Megaphone Icon--> */}
                            <div className="flex flex-row lg:flex-col max-lg:items-center">
                                <div className="fade_in h-14 w-14 rounded-xl border-2 border-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" aria-hidden="true" aria-labelledby="svgcid-nrkdeipt6ixv" data-bbox="18.996 39.51 162.004 121.09" data-type="color" viewBox="18.996 39.51 162.004 121.09"><defs><style></style></defs><path fill="#FFFFFF" d="M181 96.4c0-9.6-7.3-17.4-16.2-18.3V50.8c0-3.6-1.8-6.9-5.1-9-3.8-2.4-8.8-3.1-13-1.2l-89.3 26H36.8c-9.4 0-17.2 6.9-17.4 15.1l-.4 27.5c-.1 3.7 1.5 7.3 4.2 10.2 3.3 3.3 8.1 5.3 13.1 5.3h21l6.9 2-3.8 12.3c-2.1 6.6 1.5 13.7 8.2 15.8l16.2 5.2c1.3.4 2.6.6 3.8.6 5.4 0 10.4-3.4 12.1-8.8l4.1-12.7 41.9 12.8c1.8.8 3.7 1.2 5.7 1.2 2.6 0 5.1-.7 7.3-2.1 3.3-2.1 5.1-5.4 5.1-9.1v-27.3c8.9-.7 16.2-8.6 16.2-18.2zm-144.6 21c-3.2 0-6.2-1-8.3-3.1-1.1-1-2.3-2.7-2.2-5.1l.5-27.3c.1-4.5 4.8-8.1 10.5-8.1h21.6l78.8-23.2V142l-78.8-24.5H36.4zm62.1 33.7c-1.7 5.4-7.6 8.4-13.1 6.7l-16.2-5.2c-5.4-1.7-8.4-7.6-6.7-13l3.9-12.2 36.1 11-4 12.7zm59.8-9.1c0 1.8-1.4 2.8-2.2 3.3-1.9 1.2-4.7 1.4-6.8.4l-9.7-2.9V50l9.2-2.7.5-.2c2.1-1 4.9-.8 6.8.4.7.5 2.1 1.5 2.1 3.3V142h.1zm6.5-29.6v-32c8.1.8 14 7.7 14 16s-5.9 15.1-14 16z" data-color="1" /></svg>
                                </div>
                                <h1 className="fade_in whitespace-nowrap text-2xl text-white lg:pt-8 max-lg:pl-3">
                                    Advocate
                                </h1>
                            </div>
                            <p className="fade_in whitespace-nowrap text-white pt-5 lg:pt-12 text-lg">
                                Introduce the sounding rocket <br />
                                industry into Alberta and strengthen <br />
                                Canada's position as a leader in the <br />
                                international aerospace community.
                            </p>
                        </div>
                    </div>
                    {/* <!--Row 2--> */}
                    <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-16 space-y-12 lg:space-y-0">
                        {/* <!--Col 1--> */}
                        <div>
                            {/* <!--Star Icon--> */}
                            <div className="flex flex-row lg:flex-col max-lg:items-center">
                                <div className="fade_in h-14 w-14 rounded-xl border-2 border-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" aria-hidden="true" aria-labelledby="svgcid--ogwvrc2dgf7m" data-bbox="20 23 160 154" data-type="color" viewBox="20 23 160 154"><defs><style></style></defs><path fill="#FFFFFF" d="M147.088 177a3.78 3.78 0 0 1-1.777-.443L100 152.504l-45.31 24.053a3.79 3.79 0 0 1-4.014-.286 3.845 3.845 0 0 1-1.519-3.749l8.657-50.964-36.668-36.09a3.848 3.848 0 0 1-.958-3.926 3.817 3.817 0 0 1 3.073-2.606l50.662-7.433 22.659-46.36C97.222 23.83 98.548 23 100 23s2.778.83 3.419 2.141l22.659 46.36 50.662 7.433a3.817 3.817 0 0 1 3.073 2.606 3.85 3.85 0 0 1-.958 3.926l-36.668 36.09 8.657 50.964a3.844 3.844 0 0 1-1.519 3.749 3.79 3.79 0 0 1-2.237.731zM100 144.338c.611 0 1.222.148 1.778.443l40.254 21.369-7.691-45.281a3.845 3.845 0 0 1 1.091-3.385l32.594-32.08-45.031-6.607a3.816 3.816 0 0 1-2.869-2.101L100 35.518 79.875 76.694a3.811 3.811 0 0 1-2.869 2.101l-45.031 6.607 32.594 32.08a3.846 3.846 0 0 1 1.091 3.385l-7.691 45.281 40.254-21.369a3.795 3.795 0 0 1 1.777-.441z" data-color="1" /></svg>
                                </div>
                                <h1 className="fade_in whitespace-nowrap text-2xl text-white lg:pt-8 max-lg:pl-3">
                                    Inspire
                                </h1>
                            </div>
                            <p className="fade_in whitespace-nowrap text-white pt-5 lg:pt-12 text-lg">
                                Educate the public through outreach <br />
                                activities and promote STEM <br />
                                (science, technology, engineering, <br />
                                mathematics) to students across <br />
                                Alberta.
                            </p>
                        </div>
                        {/* <!--Col 2--> */}
                        <div>
                            {/* <!--Lightbulb Icon--> */}
                            <div className="flex flex-row lg:flex-col max-lg:items-center">
                                <div className="fade_in h-14 w-14 rounded-xl border-2 border-white flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" aria-hidden="true" aria-labelledby="svgcid-gkakrk-n8eoqy" data-bbox="27 25 146 150" data-type="color" viewBox="27 25 146 150"><defs><style></style></defs><path fill="#FFFFFF" d="M48.4 101.6H30.2c-1.7 0-3.2-1.5-3.2-3.2 0-1.7 1.5-3.2 3.2-3.2h18.2c1.7 0 3.2 1.5 3.2 3.2-.1 1.8-1.4 3.2-3.2 3.2zM169.8 101.6h-18.2c-1.7 0-3.2-1.5-3.2-3.2 0-1.7 1.5-3.2 3.2-3.2h18.2c1.7 0 3.2 1.5 3.2 3.2 0 1.8-1.5 3.2-3.2 3.2zM100 49.7c-1.7 0-3.2-1.5-3.2-3.2V28.2c0-1.7 1.5-3.2 3.2-3.2s3.2 1.5 3.2 3.2v18.3c0 1.7-1.5 3.2-3.2 3.2zM63.5 65c-.8 0-1.6-.3-2.3-.9l-12.8-13c-1.3-1.3-1.3-3.3 0-4.6 1.3-1.3 3.3-1.3 4.6 0l12.9 13c1.3 1.3 1.3 3.3 0 4.6-.8.5-1.6.9-2.4.9zM136.5 65c-.8 0-1.6-.3-2.3-.9-1.3-1.3-1.3-3.3 0-4.6l12.9-13c1.3-1.3 3.3-1.3 4.6 0 1.3 1.3 1.3 3.3 0 4.6l-12.9 13c-.7.5-1.5.9-2.3.9zM112 158.7H88c-1.7 0-3.2-1.5-3.2-3.2 0-1.7 1.5-3.2 3.2-3.2h24c1.7 0 3.2 1.5 3.2 3.2-.1 1.8-1.5 3.2-3.2 3.2zM114 166.9H86c-1.7 0-3.2-1.5-3.2-3.2 0-1.7 1.5-3.2 3.2-3.2h27.8c1.7 0 3.2 1.5 3.2 3.2.1 1.7-1.3 3.2-3 3.2zM107 175H93c-1.7 0-3.2-1.5-3.2-3.2 0-1.7 1.5-3.2 3.2-3.2h14c1.7 0 3.2 1.5 3.2 3.2-.1 1.7-1.4 3.2-3.2 3.2zM113.1 149.8H86.9c-5.6 0-10-4.6-10-10.1v-2.3c0-4.4-2.4-10.5-6.8-17.5-5.6-7-8.5-15.4-8.5-24.2C61.6 74.4 78.8 57 100 57s38.4 17.4 38.4 38.7c0 8.9-2.9 17.3-8.5 24.2-4.3 6.9-6.8 13.1-6.8 17.5v2.3c.1 5.6-4.4 10.1-10 10.1zM100 63.5c-17.7 0-32 14.5-32 32.3 0 7.5 2.5 14.5 7.2 20.3l.2.3c3.6 5.7 7.8 13.9 7.8 21v2.3c0 2.1 1.6 3.7 3.7 3.7h26.4c2 0 3.7-1.6 3.7-3.7v-2.3c0-7.1 4.3-15.4 7.8-21l.2-.3c4.7-5.9 7.2-12.9 7.2-20.3C132 78 117.7 63.5 100 63.5z" data-color="1" /></svg>
                                </div>
                                <h1 className="fade_in whitespace-nowrap text-2xl text-white lg:pt-8 max-lg:pl-3">
                                    Innovate
                                </h1>
                            </div>
                            <p className="fade_in whitespace-nowrap text-white pt-5 lg:pt-12 text-lg">
                                Research, create, and implement <br />
                                technologies across the sciences to <br />
                                improve rocket designs.
                            </p>
                        </div>
                    </div>
                </div>
                <div>

                </div>

            </div>

            {/* <!--Tile 4--> */}
            <div className="z-10 relative flex flex-nowrap flex-col bg-DarkBlue">
                <div className="flex pl-3 lg:pl-20 overflow-hidden">
                    <h1 className="flow_in_top px-3 w-72 py-3 bg-white rounded-b-2xl text-xl font-bold">
                        Upcoming Competitions
                    </h1>
                </div>
                <div className="h-20"></div>
                {/* <!--Main content--> */}
                <div className="flex justify-center flex-col flex-none lg:items-center">
                    <div className="w-20 h-20 shrink-0"></div>
                    <div className="flow_in_left">
                        <Competition
                            year="2025"
                            name="International Rocket Engineering Competition"
                            link="https://spaceportamericacup.com/"
                            logo={{ src: spacePortLogo, alt: "IREC Logo" }}
                            description="The Spaceport America Cup is the world's largest
                            IREC - Intercollegiate Rocket Engineering Competition
                            for student rocketry teams. We plan to launch Ringo IV."
                        />
                    </div>
                    <div className="w-20 h-20 shrink-0"></div>
                    <div className="flow_in_left">
                        <Competition
                            year="2025"
                            name="Launch Canada"
                            link="https://www.launchcanada.org"
                            logo={{ src: launchCanadaLogo, alt: "Launch Canada Logo" }}
                            description="Launch Canada is a rocket competition designed to create
                            opportunities for amateur rocketeers from Canadian
                            universities. We plan to launch Ringo V."
                        />
                    </div>

                </div>
                <div className="h-28"></div>
                {/* <!--Sponsors Tag--> */}
                <div className="lg:pl-20 z-10 overflow-hidden">
                    <h1 className="flow_in_bottom px-3 w-screen lg:w-72 py-3 bg-white rounded-t-2xl text-xl font-bold">
                        Thanks to Our Sponsors
                    </h1>
                </div>
                {/* <!--Sponsors Boxes--> */}
                <div className="flex justify-center flex-none z-20">
                    <div className="lg:w-20 shrink-0 grow-0"></div>
                    {/* <!--Ad boxes--> */}

                    <div className="flex grow">
                        <div className="flex flex-col grow">
                            <SponsorsLayoutMainPage />
                        </div>
                        <div className="shrink lg:w-20 grow-0"></div>
                    </div>
                </div>
                <div className="h-12"></div>
                {/* <!--FAQ--> */}
                <FAQ />

                <div className="h-24"></div>
            </div>
        </main>
    );
}
