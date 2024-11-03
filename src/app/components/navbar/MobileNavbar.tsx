'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import menuIcon from '@/public/assets/menu-svgrepo-com.svg';
import Image from 'next/image';
import { usePathname } from 'next/navigation'

const MobileNavbar = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const pathName = usePathname();
    const NavButton = ({ page, children }: { page: string, children: React.ReactNode }) => {
        if (pathName === page) {
            return (
                <button className="text-yellow-300 hover:text-bold whitespace-nowrap text-4xl py-3" onClick={drawerToggle}>
                    <Link href={page}>{children}</Link>
                </button>
            );
        } else {
            return (
                <button className="hover:text-yellow-300 whitespace-nowrap text-4xl py-3" onClick={drawerToggle}>
                    <Link href={page}>{children}</Link>
                </button>
            );
        }
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
                <button className="hover:text-yellow-300 whitespace-nowrap text-4xl py-3" onClick={drawerToggle}>
                    <Link target="_blank" href="/join" rel="noopener noreferrer">Join Us!</Link>
                </button>
                <NavButton page="/contact">Contact</NavButton>
            </div>
        </div>
    );
}

export default MobileNavbar;