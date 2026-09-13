import Link from "next/link";
import Image from "next/image";
const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-primary/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:px-8">
        <div>
          <Image
                      src="/ourmalllogo.png"
                      alt="Our Mall logo"
                      width="150"
                      height="50"
                    />
          <p className="mt-4 max-w-md text-sm leading-6 text-body">
            Curated essentials for modern living, everyday comfort, and smarter
            shopping.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-heading">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-body">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex hover:text-primary transition-transform duration-300 hover:translate-x-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-heading">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-body">
            <li>
              <a href="mailto:hello@ourmall.com">hello@ourmall.com</a>
            </li>
            <li>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>24/7 customer support</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 text-xs text-body sm:px-6 lg:px-8">
          <p>
            Developed by <span className="text-primary">Satheesh Baabu M</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
