import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import web_logo from "../public/assets/logos/logo.png";
import favicon from "../public/favicon.png";
import { showPopup, delayHidePopup, delayedHidePopup } from "./scripts";
import Link from "next/link";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head> */}
        {/* <link rel="icon" href="./favicon.png" /> */}
      {/* </head> */}
      
      
      <body className= {`overflow-y-scroll overflow-x-hidden relative ${inter.className}`} id="body">
        {children}
      </body>
    </html>
  );
}