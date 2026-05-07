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
