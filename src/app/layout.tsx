import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins, Playfair_Display, Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['300', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const playfairDisplay = Playfair_Display({
  weight: ['700'],
  style: ['italic'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

const bricolageGrotesque = Bricolage_Grotesque({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-bricolage-grotesque',
});

const essonnes = localFont({
  src: [
    {
      path: '../fonts/Essonnes-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Essonnes-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Essonnes-Italic.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-essonnes',
});

export const metadata: Metadata = {
  title: "Detroit Bitcoin Pizza Day",
  description: "Celebrating Bitcoin Pizza Day in Detroit - commemorating the first real-world Bitcoin transaction",
  keywords: ["Bitcoin", "Pizza Day", "Detroit", "Cryptocurrency", "Bitcoin Pizza Transaction"],
  openGraph: {
    title: "Detroit Bitcoin Pizza Day",
    description: "Celebrating the historic Bitcoin Pizza Transaction in Detroit",
    images: ['/og-image.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detroit Bitcoin Pizza Day",
    description: "Celebrating the historic Bitcoin Pizza Transaction in Detroit",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${playfairDisplay.variable} ${bricolageGrotesque.variable} ${essonnes.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
