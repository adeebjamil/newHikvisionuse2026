import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Solutions — Security for Every Sector",
  description:
    "Hikvision UAE delivers tailored security solutions for Manufacturing, Retail, Healthcare, Education, Government, Residential, Logistics & Hospitality across Dubai, Abu Dhabi, and all Emirates.",
  keywords: [
    "Hikvision industry solutions UAE",
    "manufacturing security Dubai",
    "retail CCTV UAE",
    "healthcare surveillance Dubai",
    "education security UAE",
    "government surveillance UAE",
    "smart home security Dubai",
    "logistics CCTV UAE",
    "hospitality security Dubai",
    "enterprise security UAE",
    "AI security solutions UAE",
    "intelligent surveillance Dubai",
  ],
  openGraph: {
    title: "Hikvision UAE Industry Solutions | Tailored Security for Every Sector",
    description:
      "Tailored Hikvision security solutions for Manufacturing, Retail, Healthcare, Education, Government & more. Official distributor covering all UAE Emirates.",
    url: "https://hikvisionuae.ae/solutions",
    images: [{ url: "https://hikvisionuae.ae/solutions_bg.png", alt: "Hikvision Industry Solutions UAE" }],
  },
  alternates: { canonical: "https://hikvisionuae.ae/solutions" },
};

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
