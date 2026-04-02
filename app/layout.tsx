import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sierra Tours & Safaris | African Safari Adventures",
    template: "%s | Sierra Tours & Safaris",
  },
  description:
    "Discover the magic of Africa with our expertly curated safari experiences. From the Serengeti to Victoria Falls, we create unforgettable adventures.",
  keywords: [
    "safari",
    "africa",
    "kenya",
    "tanzania",
    "botswana",
    "zambia",
    "wildlife",
    "travel",
    "tours",
  ],
  openGraph: {
    title: "Sierra Tours & Safaris",
    description: "Discover the magic of Africa with our expertly curated safari experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
