"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface FAQItemData {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemData) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-heading">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <p className="border-t border-slate-200 px-5 py-4 text-sm leading-7 text-body">
          {answer}
        </p>
      )}
    </div>
  );
}
