"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "Faq" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Our Mall home"
        >
          <Image
            src="/ourmalllogo.png"
            alt="Our Mall logo"
            width={150}
            height={50}
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-1 after:bg-primary after:transition-all after:duration-300 ${
                isActive(item.href)
                  ? "text-primary after:w-full"
                  : "text-body hover:text-primary after:w-0 hover:after:w-full"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/register">Register</Button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex text-heading transition-colors hover:border-primary hover:text-primary md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] md:hidden h-screen">
          {/* Background Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/70"
          />

          {/* Side Drawer */}
          <div className="absolute right-0 top-0 h-screen w-[70%] max-w-sm bg-white shadow-2xl">
            <div className="flex h-full flex-col bg-white">
              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  aria-label="Our Mall home"
                >
                  <Image
                    src="/ourmalllogo.png"
                    alt="Our Mall logo"
                    width={150}
                    height={50}
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex text-heading transition-colors hover:border-primary hover:text-primary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav
                className="flex flex-1 flex-col gap-2 px-4 py-6 sm:px-6 "
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary/10 text-primary"
                        : "text-body hover:bg-slate-100 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-auto " onClick={() => setIsOpen(false)}>
                  <Button href="/register" className="w-full justify-center ">
                    Register
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
