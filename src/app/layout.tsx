import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import DefaultRootLayout from "@/components/layouts/DefaultRootLayout";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Comic_Neue as ComicNeueFont } from "next/font/google";
import LandingPageRootLayout from "@/components/landing-page/LandingPageRootLayout";
import Script from "next/script";
import { CAST_LANDING_PAGE } from "@/constants";

export const metadata: Metadata = CAST_LANDING_PAGE
  ? { title: "degencast.ai", description: "Welcome to degencast.ai✨" }
  : {
      title: "degencast.fun",
      description: "Welcome to degencast.fun✨",
    };

const font = ComicNeueFont({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://terminal.jup.ag/main-v3.js" data-preload></Script>
      <body className={`${font.className} antialiased`}>
        <Providers>
          {CAST_LANDING_PAGE ? (
            <LandingPageRootLayout>{children}</LandingPageRootLayout>
          ) : (
            <DefaultRootLayout>{children}</DefaultRootLayout>
          )}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
