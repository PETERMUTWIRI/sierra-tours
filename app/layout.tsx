import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/app/components/LayoutWrapper";

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
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
