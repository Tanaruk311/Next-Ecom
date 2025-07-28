
import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 import Providers from "./Providers";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast'

import Footer from "./components/Footer";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "shopify",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col"
       // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
     <Providers> 
      <Navbar/>
      <main className="flex-1">{children}</main>
              <Toaster position="top-right" />
              <Footer/>
       </Providers>

   
      </body>
    </html>
  );
}
