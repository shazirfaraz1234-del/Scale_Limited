import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, siteSchemaGraph } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const SITE_TITLE = "Scale Limited | Staff Augmentation, BPO & Technology Services";
const SITE_DESCRIPTION =
  "Scale Limited helps businesses grow through flexible staffing, reliable business process outsourcing, and technology-driven solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Scale Limited",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Scale Limited",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Scale Limited",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1073,
        height: 375,
        alt: "Scale Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "7Uwgns3VlUadhB5MyeeHq_aVBhQ5rWhj6Tq6iVzXPK4",
  },
};

import NextTopLoader from 'nextjs-toploader';
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemaGraph) }}
        />
        <NextTopLoader color="#0F172A" showSpinner={false} height={3} />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
