import Image from 'next/image';
import web_logo from '../../../public/assets/logos/logo.png';
import Link from 'next/link';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {

    return (
        <div className ="header fixed z-50 items-center py-5 flex justify-between flex-nowrap w-screen" id="header">
            <div className = "inline-block flex-none px-6">
                <Link href="/"><Image className="object-cover top-0 left-0 w-72" src={web_logo} alt="starr logo broken"/></Link>
            </div>
            {/* Mobile Navbar */}
            {/* <div className = "lg:hidden">
                <MobileNavbar />
            </div> */}

            {/* Deaktop Navbar */}
            {/* <div className='max-lg:hidden'> */}
            <div className = "">
                <DesktopNavbar />
            </div>
        </div>
    )
}

export default Navbar;