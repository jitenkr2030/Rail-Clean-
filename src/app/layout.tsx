import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RailClean AI - Smart Railway Cleanliness Monitoring",
  description: "Transforming Indian Railways with AI-driven cleanliness monitoring, passenger feedback, and staff accountability. Real-time dashboard for railway officials.",
  keywords: ["RailClean AI", "Indian Railways", "Cleanliness Monitoring", "Passenger Feedback", "Railway Management", "AI Insights", "Next.js", "TypeScript"],
  authors: [{ name: "RailClean AI Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RailClean AI - Railway Cleanliness Monitoring",
    description: "Real-time railway coach cleanliness monitoring with passenger feedback and AI insights for Indian Railways.",
    url: "https://railclean.ai",
    siteName: "RailClean AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RailClean AI",
    description: "Smart railway cleanliness monitoring system for Indian Railways",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
