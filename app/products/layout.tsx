import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products — Professional Security Camera Catalog",
  description:
    "Browse Hikvision UAE's complete catalog: Network Cameras, PTZ Cameras, NVRs, Access Control, Video Intercom, and more. Official authorized distributor in Dubai, Abu Dhabi, Sharjah.",
  keywords: [
    "Hikvision products UAE",
    "CCTV catalog Dubai",
    "network cameras UAE",
    "PTZ cameras Dubai",
    "NVR UAE",
    "access control Dubai",
    "video intercom UAE",
    "bullet cameras",
    "dome cameras",
    "turret cameras",
    "IP cameras UAE",
    "security camera catalog",
    "Hikvision shop Dubai",
    "buy CCTV UAE",
  ],
  openGraph: {
    title: "Hikvision UAE Products | Professional Security Camera Catalog",
    description:
      "Official Hikvision product catalog in UAE. Network Cameras, PTZ, NVR, Access Control & more. Expert installation across all Emirates.",
    url: "https://hikvisionuae.ae/products",
    images: [{ url: "https://hikvisionuae.ae/camera.png", alt: "Hikvision Security Cameras UAE" }],
  },
  alternates: { canonical: "https://hikvisionuae.ae/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
