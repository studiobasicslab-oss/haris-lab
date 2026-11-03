import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Caveat, Special_Elite, JetBrains_Mono, Outfit, Instrument_Serif } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
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

export const metadata: Metadata = {
  title: "Hari's Lab | Studio Basics Atelier",
  description: "Hari's Lab: A curated digital laboratory of interactive arcade games, cosmic telemetry tools, culinary logbooks, and knowledge archives.",
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
      className={`${cormorant.variable} ${lora.variable} ${instrumentSerif.variable} ${outfit.variable} ${jetbrainsMono.variable} ${caveat.variable} ${specialElite.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
