import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  className?: string;
};

export default function Button({
  href,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const classes = [
    "group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:scale-102",
    className,
  ].join(" ");

  const content = (
    <>
      <span>{children}</span>
      <span className="inline-flex transition-transform duration-300 group-hover:translate-x-1.5">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
