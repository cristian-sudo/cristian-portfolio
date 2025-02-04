import type { Metadata } from "next";
import { Fira_Sans, Fira_Mono  } from "next/font/google";
import Navbar from './components/Navbar';
import "./globals.css";
import SocialMediaSidebar from "@/app/components/SocialMediaSidebar";
import {LanguageProvider} from "@/app/context/LanguageContext";
import Footer from "@/app/components/Footer";


const firaSans = Fira_Sans({
    weight: ["200", "400"],
    style: "normal",
    subsets: ["latin"],
    variable: "--font-fira-sans",
});

const firaMono = Fira_Mono({
    weight: ["400", "500", "700"],
    style: "normal",
    subsets: ["latin"],
    variable: "--font-fira-mono",
});


export const metadata: Metadata = {
  title: "Cristian Plop - Portfolio",
  description: "Cristian Plop UK based software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaSans.variable} ${firaMono.variable} antialiased text-white bg-black`}
      >
      <LanguageProvider>
      <SocialMediaSidebar />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
