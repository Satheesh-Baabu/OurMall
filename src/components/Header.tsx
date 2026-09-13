"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import Button from "@/components/Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
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
    <header className="relative sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Our Mall home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-sm">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-heading">
              Our<span className="text-primary">Mall</span>
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm font-medium transition-colors duration-300 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 ${
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
          className="inline-flex rounded-full border border-slate-200 p-2 text-heading transition-colors hover:border-primary hover:text-primary md:hidden"
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
        <div className="absolute left-0 right-0 top-full border-t border-slate-200 bg-white shadow-lg md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-body hover:bg-slate-100 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button href="/register" className="w-full justify-center">
                Register
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
