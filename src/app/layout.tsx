import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import Providers from "@/components/Provides";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body className={`${fontSans.variable}  antialiased`}>
        <Providers>
          <DefaultLayout>{children}</DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
