import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Comic_Neue as ComicNeueFont } from "next/font/google";
import Script from "next/script";
import BgGifs from "@/components/layouts/BgGifs";

export const metadata: Metadata = {
  title: "castcoin.fun",
  description: "Welcome to castcoin.fun✨",
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
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
