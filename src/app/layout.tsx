import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import "./globals.css";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ourmall-project.vercel.app"),

  title: {
    default: "OurMall | Modern Online Shopping",
    template: "%s | OurMall",
  },

  description:
    "Discover quality products, everyday essentials, accessories, and home favorites at OurMall.",

  keywords: [
    "OurMall",
    "online shopping",
    "ecommerce",
    "products",
    "fashion",
    "electronics",
    "jewelry",
  ],

  authors: [{ name: "OurMall" }],
  creator: "OurMall",
  publisher: "OurMall",

  openGraph: {
    type: "website",
    siteName: "OurMall",
    title: "OurMall | Modern Online Shopping",
    description:
      "Discover quality products, everyday essentials, accessories, and home favorites at OurMall.",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OurMall - Modern Online Shopping",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OurMall | Modern Online Shopping",
    description:
      "Discover quality products, everyday essentials, accessories, and home favorites at OurMall.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geologica.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-body">
        <div className="flex min-h-screen flex-col">
          <Header />
          <AnimationObserver />
          <div className="flex-1 overflow-hidden">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
