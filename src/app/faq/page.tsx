import FAQItem, { type FAQItemData } from "@/components/FAQItem";
import { faqItems } from "@/data/faqData";

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Help center
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="space-y-4">
        {faqItems.map((item) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </main>
  );
}
