import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import DefaultRootLayout from "@/components/layouts/DefaultRootLayout";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Comic_Neue as ComicNeueFont } from "next/font/google";
import LandingPageRootLayout from "@/components/layouts/LandingPageRootLayout";

const isLandingPage = process.env.NEXT_PUBLIC_CAST_LANDING_PAGE === "true";

export const metadata: Metadata = isLandingPage
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
      <body className={`${font.className} antialiased`}>
        <Providers>
          {isLandingPage ? (
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
