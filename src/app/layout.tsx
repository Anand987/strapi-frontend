import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";

const inter = Inter({ subsets: ["latin"] });

import { Header } from "@/components/custom/Header";
import { Footer } from "@/components/custom/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata.title,
    description: metadata.description
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  // console.dir(globalData, { depth: null })

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={globalData.header} />
        {children}
        <Footer data={globalData.footer} />
      </body>
    </html>
  );
}
