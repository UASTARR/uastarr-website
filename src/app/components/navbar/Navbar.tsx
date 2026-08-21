import Image from 'next/image';
import web_logo from '../../../public/assets/logos/logo.png';
import Link from 'next/link';
import { Suspense } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { mainHref } from '@/library/siteUrls';

const Navbar = () => {

    return (
        <div className =" px-8 header fixed z-50 items-center py-8 flex justify-between flex-nowrap w-full" id="header">
            <div className = "inline-block flex-none">
                <Link href={mainHref("/")}><Image loading='eager' className="max-xs:hidden object-contain top-0 left-0 w-72 h-[48px]" src={web_logo} alt="starr logo broken"/></Link>
            </div>
            {/* Mobile Navbar */}
            <div className = "lg:hidden">
                <Suspense fallback={null}>
                    <MobileNavbar />
                </Suspense>
            </div>

            {/* Desktop Navbar */}
            <div className='max-lg:hidden'>
                <DesktopNavbar />
            </div>
        </div>
    )
}

export default Navbar;