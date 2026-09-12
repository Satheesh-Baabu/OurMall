import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "OurMall",
  description: "Modern e-commerce storefront built with Next.js and Fake Store API",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geologica.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-body">
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
