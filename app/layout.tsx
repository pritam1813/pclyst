import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pclyst",
  description: "PC and Software Reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`} />
        <Providers>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
