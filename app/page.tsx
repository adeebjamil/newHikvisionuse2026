import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight
} from "lucide-react";

import HeroSlider from "@/components/HeroSlider";
import DistributorSection from "@/components/DistributorSection";
import SecuritySolutions from "@/components/SecuritySolutions";
import TechnologySection from "@/components/TechnologySection";
import SecurityOverview from "@/components/SecurityOverview";
import SupportSection from "@/components/SupportSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export const metadata: Metadata = {
  title: "Hikvision UAE | #1 Official Authorized CCTV Distributor in Dubai",
  description:
    "Hikvision UAE — the UAE's #1 official authorized distributor. Premium CCTV cameras, AI surveillance, NVR, PTZ cameras, access control & video intercom systems in Dubai, Abu Dhabi, Sharjah. 24/7 expert support.",
  alternates: { canonical: "https://hikvisionuae.ae" },
  openGraph: {
    url: "https://hikvisionuae.ae",
    title: "Hikvision UAE | #1 Official Authorized CCTV Distributor in Dubai",
    description:
      "UAE's #1 official Hikvision distributor. AI-powered CCTV cameras, NVR, PTZ, access control & smart surveillance. Expert installation across all 7 Emirates.",
    images: [{ url: "https://hikvisionuae.ae/hero.png", width: 1200, height: 630, alt: "Hikvision UAE Official Distributor" }],
  },
};


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <DistributorSection />
      <SecuritySolutions />
      <TechnologySection />
      <SecurityOverview />
      <SupportSection />
      <WhyChooseUs />




    </div>
  );
}
