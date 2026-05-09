import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Official Hikvision Distributor Since 2009",
  description:
    "Learn about Hikvision UAE — the region's premier authorized security distributor. 15+ years in the UAE, 2500+ projects delivered, serving government, industrial, and residential sectors in Dubai and beyond.",
  keywords: [
    "about Hikvision UAE",
    "Hikvision authorized distributor Dubai",
    "CCTV company Dubai",
    "security company UAE",
    "Hikvision partner UAE",
    "surveillance company Dubai",
    "CCTV installation company UAE",
    "trusted security Dubai",
    "award winning security UAE",
  ],
  openGraph: {
    title: "About Hikvision UAE | Authorized Distributor — 15+ Years in UAE",
    description:
      "Hikvision UAE's official authorized distributor. 15+ years experience, 2500+ projects, 100+ partners across Dubai, Abu Dhabi & all Emirates.",
    url: "https://hikvisionuae.ae/about",
  },
  alternates: { canonical: "https://hikvisionuae.ae/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
