import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/tokens.css";
import "@/styles/globals.scss";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#fafaf9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://joanarbo.com'),
  title: {
    default: "Joan Arbo | Design Systems Lead & Strategist",
    template: "%s | Joan Arbo"
  },
  description: "Operational Strategy Lead bridging design and engineering. I help organizations like Amazon and Western Union translate business strategy into efficient design infrastructure.",
  keywords: ["Design Systems Lead", "Operational Strategy", "Design Ops", "Product Engineering", "Systems Architect", "Next.js", "Joan Arbo"],
  authors: [{ name: "Joan Arbo", url: "https://joanarbo.com" }],
  creator: "Joan Arbo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://joanarbo.com",
    title: "Joan Arbo | Design Systems Lead & Strategist",
    description: "Operational Strategy Lead. I help organizations translate business strategy into efficient design infrastructure.",
    siteName: "Joan Arbo Portfolio",
    images: [
      {
        url: "/og-image.jpg", // We need to ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "Joan Arbo - Product Engineer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joan Arbo | Design Systems Lead & Strategist",
    description: "Operational Strategy Lead helping teams scale design systems with AI-driven workflows.",
    images: ["/images/social-share.png"],
    creator: "@joanarbo",
  },
  alternates: {
    canonical: 'https://joanarbo.com',
    languages: {
      'es-ES': 'https://joanarbo.com/es',
      'en-US': 'https://joanarbo.com',
      'ca-ES': 'https://joanarbo.com/ca',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
        <Providers>
          <JsonLd />
          <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />
          <Header />
          {children}
          <ScrollToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
