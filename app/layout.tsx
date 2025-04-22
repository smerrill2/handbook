import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Our Company Handbook",
  description: "Employee handbook with a gaming twist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} antialiased`}
      >
        {/* Removed the <header> element that had the green background */}
        {/* 
        <header className="bg-brand-green p-4 flex items-center">
          <Image 
            src="/Logo.png" 
            alt="Company Logo" 
            width={200}
            height={50}
            priority
          />
        </header>
        */}
        {children}
      </body>
    </html>
  );
}
