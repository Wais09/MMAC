import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marrickville Martial Arts Club | BJJ, Muay Thai, MMA & Wrestling | Sydney",
  description: "Premier martial arts training in Marrickville, Sydney. World-class Brazilian Jiu-Jitsu, Muay Thai, MMA & Wrestling classes led by internationally awarded coaches including world champion Tsuchika Shimoyamada. Free trial available.",
  keywords: [
    "martial arts Marrickville",
    "BJJ Sydney",
    "Muay Thai Marrickville",
    "MMA training Sydney",
    "Wrestling classes Marrickville",
    "Brazilian Jiu Jitsu",
    "martial arts club",
    "self defense classes",
    "Tsuchika Shimoyamada",
    "Josh Allsopp",
    "martial arts training"
  ].join(", "),
  authors: [{ name: "Marrickville Martial Arts Club" }],
  creator: "Marrickville Martial Arts Club",
  publisher: "Marrickville Martial Arts Club",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://marrickvillemartialarts.com",
    siteName: "Marrickville Martial Arts Club",
    title: "Marrickville Martial Arts Club | World-Class BJJ, Muay Thai, MMA & Wrestling",
    description: "Experience world-class martial arts training in Marrickville, Sydney. Our internationally awarded coaches including world champion Tsuchika Shimoyamada offer BJJ, Muay Thai, MMA & Wrestling classes for all levels.",
    images: [
      {
        url: "https://img.youtube.com/vi/-I544tzhNgw/maxresdefault.jpg",
        width: 1280,
        height: 720,
        alt: "Marrickville Martial Arts Club - Classes Showcase Video",
      },
      {
        url: "https://marrickvillemartialarts.com/logo.png",
        width: 400,
        height: 400,
        alt: "Marrickville Martial Arts Club Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrickville Martial Arts Club | World-Class BJJ, Muay Thai, MMA & Wrestling",
    description: "Experience world-class martial arts training in Marrickville, Sydney. Led by internationally awarded coaches including world champion Tsuchika Shimoyamada.",
    images: ["https://img.youtube.com/vi/-I544tzhNgw/maxresdefault.jpg"],
  },
  verification: {
    google: "your-google-verification-code-here",
  },
  category: "Sports & Fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
