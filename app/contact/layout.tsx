import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Security Consultation",
  description:
    "Contact Hikvision UAE for expert security consultation, product enquiries, and professional CCTV installation in Dubai, Abu Dhabi, Sharjah, and all Emirates. Call +971 50 969 3134 or email sales@hikvisionuae.ae.",
  keywords: [
    "contact Hikvision UAE",
    "CCTV consultation Dubai",
    "security camera quote UAE",
    "Hikvision support Dubai",
    "CCTV installation quote UAE",
    "security system inquiry Dubai",
    "Hikvision phone UAE",
    "buy security cameras UAE",
    "free security consultation Dubai",
  ],
  openGraph: {
    title: "Contact Hikvision UAE | Free Security Consultation — Dubai",
    description:
      "Get expert security consultation from Hikvision UAE. Call +971 50 969 3134 or visit our Dubai office. Professional CCTV installation across all Emirates.",
    url: "https://hikvisionuae.ae/contact",
  },
  alternates: { canonical: "https://hikvisionuae.ae/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
