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
    keywords: "Cristian Plop, software engineer, web development, full-stack developer, portfolio",
    authors: [
        {
            name: "Cristian Plop",
            url: "https://www.cristianplop.com",
        },
    ],
    openGraph: {
        type: "website",
        url: "https://www.cristianplop.com",
        title: "Cristian Plop - Portfolio",
        description: "Cristian Plop UK based software engineer",
        images: [
            {
                url: "https://www.cristianplop.com/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Cristian Plop's Portfolio",
            },
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <meta charSet="UTF-8" />
        <title>Cristian Plop - Portfolio</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </head>
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
