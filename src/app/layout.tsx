// pages/_app.js or _app.tsx (if using TypeScript)
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Navbar from "@/components/shared/Navbar";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import ClientSideSocketInitializer from "@/components/ClientSideSocketInitializer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-nunito",
});

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Algonauts",
  description: " Kids can play games! Waster their childhood with coding ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout");
  return (
    <Providers>
      <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <Toaster position="top-center" />
          <Navbar />
          <ClientSideSocketInitializer />
          {children}
        </body>
      </html>
    </Providers>
  );
}
