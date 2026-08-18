import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/app/components/footer/Footer";
import Navbar from "@/app/components/navbar/Navbar";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

// The following is an example of how to use dynamic imports in Next.js (to fix hydration error)
// import dynamic from 'next/dynamic'
// const Navbar = dynamic(() => import('./components/navbar/Navbar'), { ssr: false })

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | UASTARR",
    default: "UASTARR | Student Team for Alberta Rocketry Research"
  },
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
