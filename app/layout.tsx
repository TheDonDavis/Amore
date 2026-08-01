import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "@/styles/globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Élan Decants";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} — Luxury Fragrance Decants`,
    template: `%s | ${brandName}`,
  },
  description:
    "Discover curated luxury fragrance decants. Hand-poured, elegantly portioned scents for the discerning collector.",
  keywords: [
    "fragrance decants",
    "perfume decants",
    "luxury fragrances",
    "Jamaica",
    "niche perfume",
  ],
  openGraph: {
    type: "website",
    locale: "en_JM",
    url: siteUrl,
    siteName: brandName,
    title: `${brandName} — Luxury Fragrance Decants`,
    description:
      "Discover curated luxury fragrance decants. Hand-poured, elegantly portioned scents.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
