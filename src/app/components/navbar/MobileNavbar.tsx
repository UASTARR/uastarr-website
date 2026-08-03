'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import menuIcon from '@/public/assets/menu-svgrepo-com.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { blogsHref, mainHref, wikiHref } from '@/library/siteUrls'

function isSubdomainHost(sub: string) {
    if (typeof window === 'undefined') return false;
    const host = window.location.hostname.toLowerCase();
    return host === `${sub}.localhost` || host.startsWith(`${sub}.`);
}

const MobileNavbar = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [onWikiHost, setOnWikiHost] = useState(false);
    const [onBlogsHost, setOnBlogsHost] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setOnWikiHost(isSubdomainHost('wiki'));
        setOnBlogsHost(isSubdomainHost('blogs'));
    }, []);

    const onWiki =
        pathName === '/wiki' || pathName.startsWith('/wiki/') || onWikiHost;
    const onBlogs =
        pathName === '/blogs' || pathName.startsWith('/blogs/') || onBlogsHost;

    const NavButton = ({ page, children }: { page: string, children: React.ReactNode }) => {
        const href = mainHref(page);
        const isActive = page === '/'
            ? pathName === '/' && !onWiki && !onBlogs
            : pathName === page;
        return (
            <button
                className={`${isActive ? 'text-yellow-300 hover:text-bold' : 'hover:text-yellow-300'} whitespace-nowrap text-4xl py-3`}
                onClick={drawerToggle}
            >
                <Link href={href}>{children}</Link>
            </button>
        );
    }
    useEffect(() => {
        if (showDrawer) {
            document.getElementById("drawer")?.classList.remove("hidden");
            document.getElementById("drawer")?.classList.add("flex");
        } else {
            document.getElementById("drawer")?.classList.add("hidden");
            document.getElementById("drawer")?.classList.remove("flex");
        }
    }, [showDrawer]);
    const drawerToggle = () => {
        setShowDrawer(prev => !prev);
    }
    return (
        <div>
            <button className="lg:hidden" onClick={drawerToggle}>
                <Image className="w-10 h-10 invert" src={menuIcon} alt='menu' />
            </button>
            {/* Drawer */}
            <div id="drawer" className="fixed hidden z-40 w-full h-full bg-zinc-800/90 top-0 left-0 flex-col justify-center items-center text-white">
                <div className="absolute flex top-8 right-8 bg-red-600 place-content-center">
                    <button className="text-white text-center relative w-10 h-10" onClick={drawerToggle}> X </button>
                </div>
                <NavButton page="/">Home</NavButton>
                <NavButton page="/projects">Projects</NavButton>
                <NavButton page="/about-us">About Us</NavButton>
                <NavButton page="/sponsors">Sponsors</NavButton>
                <NavButton page="/merch">Merch</NavButton>
                <NavButton page="/photo-albums">Photo Albums</NavButton>
                <button
                    className={`${onWiki ? 'text-yellow-300 hover:text-bold' : 'hover:text-yellow-300'} whitespace-nowrap text-4xl py-3`}
                    onClick={drawerToggle}
                >
                    <Link href={wikiHref()}>Wiki</Link>
                </button>
                <button
                    className={`${onBlogs ? 'text-yellow-300 hover:text-bold' : 'hover:text-yellow-300'} whitespace-nowrap text-4xl py-3`}
                    onClick={drawerToggle}
                >
                    <Link href={blogsHref()}>Blogs</Link>
                </button>
                <button className="hover:text-yellow-300 whitespace-nowrap text-4xl py-3" onClick={drawerToggle}>
                    <Link target="_blank" href={mainHref("/join")} rel="noopener noreferrer">Join Us!</Link>
                </button>
                <NavButton page="/contact">Contact</NavButton>
            </div>
        </div>
    );
}

export default MobileNavbar;
