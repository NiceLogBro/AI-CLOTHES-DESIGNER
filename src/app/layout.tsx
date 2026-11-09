import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ThreadCraft AI - Transform Any Outfit Into Your Perfect Design",
  description:
    "Upload a photo, scan a barcode, or design from scratch. Our AI identifies every detail and lets you customize everything. Magical AI-powered dropshipping clothing platform.",
  keywords: [
    "AI fashion",
    "custom clothing",
    "outfit recognition",
    "dropshipping",
    "design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} min-h-screen antialiased bg-[#0F0B1E] text-[#F8F7FF] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
