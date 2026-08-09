import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Caveat, Special_Elite, Shadows_Into_Light } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-special-elite",
});

const shadowsIntoLight = Shadows_Into_Light({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-shadows-into-light",
});

export const metadata: Metadata = {
  title: "Hari's studio",
  description: "Hari's Lab: A growing collection of interactive experiments, digital tools, culinary recipes, and curiosities meticulously preserved in an academic archive.",
  other: {
    "p:domain_verify": "4ee16782b2496fdc343f46505a88d548",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lora.variable} ${caveat.variable} ${specialElite.variable} ${shadowsIntoLight.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
