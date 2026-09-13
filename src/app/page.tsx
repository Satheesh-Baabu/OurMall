import Image from "next/image";
import { Sparkles} from "lucide-react";
import Button from "@/components/Button";
import { featureCards } from "@/data/featureCards";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductsSection from "@/app/products/page";
export default async function HomePage() {
  
  return (
    <main className="flex-1">
      {/* Hero Section  */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="reveal reveal-left order-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
              Fresh picks for everyday life
            </div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Discover products built for modern living.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-body sm:text-lg">
              Browse our collection of trusted essentials and home favorites
              designed to make life simpler, smarter, and more enjoyable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/products">Explore Products</Button>
            </div>
          </div>

          <div className="reveal reveal-right order-2">
            <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="relative h-120 overflow-hidden rounded-[26px] bg-primary/10">
                <Image
                  src="/home-hero.jpg"
                  alt="Modern home and shopping lifestyle"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductsSection />
      {/* why choose us section */}
      <section className="bg-primary/10 py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary reveal reveal-right">
              Why choose us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading reveal reveal-left">
              Designed to make shopping easier
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 hover:border-primary/90 reveal reveal-bottom"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-heading">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-body">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Browse by Category Section */}
      <CategoriesSection />
      {/* Ready to Shop Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16 reveal reveal-bottom">
        <div className="rounded-4xl border border-slate-300 bg-white px-6 py-10 text-center sm:px-10 lg:px-16 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary reveal reveal-right">
            Ready to shop
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-heading sm:text-4xl reveal reveal-left">
            Upgrade your everyday essentials.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-body reveal reveal-right">
            Explore our catalog for home favorites, accessories, and practical
            finds designed to fit your routine.
          </p>

          <div className="mt-8 flex justify-center reveal reveal-bottom">
            <Button href="/products">Explore Products</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
