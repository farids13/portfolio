import { Allura, Dosis, Geist } from "next/font/google";
import { Amiri } from "next/font/google";

import type { Metadata } from "next";

import "../style/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Starfield from "@/components/main/StartField";

const dosis = Dosis({
  variable: "--font-dosis",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap', 
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Farid Satria",
  description: "Full Stack Developer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${dosis.variable} ${geistSans.variable} ${allura.variable} ${amiri.variable} antialiased`}>
        <Starfield count={50} />
        {children}
      </body>
    </html>
  );
}
