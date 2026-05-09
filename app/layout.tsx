import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import ConditionalLayout from "@/components/ConditionalLayout";
import "./globals.css";

const SITE_URL = "https://hikvisionuae.ae";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Hikvision UAE | Official Authorized Distributor in Dubai",
    template: "%s | Hikvision UAE",
  },
  description:
    "Hikvision UAE is the #1 official authorized distributor of Hikvision security cameras, CCTV systems, NVR, PTZ cameras, access control, and AI surveillance solutions in Dubai, Abu Dhabi, Sharjah, and across the UAE. Expert installation. 24/7 support.",
  keywords: [
    "Hikvision UAE",
    "Hikvision Dubai",
    "Hikvision authorized distributor UAE",
    "CCTV Dubai",
    "CCTV UAE",
    "security cameras UAE",
    "IP cameras Dubai",
    "PTZ cameras UAE",
    "NVR UAE",
    "network video recorder Dubai",
    "AcuSense",
    "ColorVu",
    "DarkFighter",
    "TandemVu",
    "DeepinView",
    "access control UAE",
    "video intercom Dubai",
    "AI surveillance UAE",
    "CCTV installation Dubai",
    "security systems Abu Dhabi",
    "Sharjah CCTV",
    "surveillance cameras UAE",
    "Hikvision official distributor",
    "bullet cameras UAE",
    "dome cameras Dubai",
    "turret cameras UAE",
    "PoE switches UAE",
    "fingerprint terminals Dubai",
    "smart security UAE",
    "thermal cameras UAE",
  ],
  authors: [{ name: "Hikvision UAE", url: SITE_URL }],
  creator: "Hikvision UAE",
  publisher: "Hikvision UAE",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: SITE_URL,
    siteName: "Hikvision UAE",
    title: "Hikvision UAE | #1 Official Authorized Distributor in Dubai",
    description:
      "Official Hikvision distributor in UAE. Shop CCTV cameras, NVR, PTZ, access control & AI surveillance solutions. Expert installation across Dubai, Abu Dhabi, Sharjah & all Emirates.",
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 1200,
        height: 630,
        alt: "Hikvision UAE — Official Authorized Distributor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hikvision UAE | Official Authorized Distributor",
    description:
      "Official Hikvision distributor in UAE. CCTV cameras, NVR, PTZ, access control & AI surveillance solutions in Dubai & all Emirates.",
    images: [`${SITE_URL}/logo.webp`],
  },
  alternates: { canonical: SITE_URL },
  category: "Security Technology",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: "Hikvision UAE",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  description:
    "Official authorized distributor of Hikvision security cameras, CCTV systems, NVR, PTZ cameras, access control and AI surveillance solutions in the UAE.",
  telephone: "+971509693134",
  email: "sales@hikvisionuae.ae",
  address: {
    "@type": "PostalAddress",
    streetAddress: "No. 12, Al Khabaisi, Abu Hail",
    addressLocality: "Dubai",
    addressCountry: "AE",
    postalCode: "00000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.285873,
    longitude: 55.325986,
  },
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
  areaServed: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "UAE"],
  sameAs: [
    "https://www.hikvision.com",
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        suppressHydrationWarning
      >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Preloader />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
