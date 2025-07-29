
import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 import Providers from "./Providers";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast'

import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Trendify",
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
