import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
// The following is an example of how to use dynamic imports in Next.js (to fix hydration error)
// import dynamic from 'next/dynamic'
// const Navbar = dynamic(() => import('./components/navbar/Navbar'), { ssr: false })

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UASTARR | Student Team for Alberta Rocketry Research",
  description: "Student Team for Alberta Rocketry Research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className= {`bg-black overflow-y-scroll overflow-x-hidden relative ${inter.className}`} id="body">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
