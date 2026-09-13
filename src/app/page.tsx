import Button from "@/components/Button";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductsSection from "@/app/products/page";
import BannerSection from "@/components/home/BannerSection";
export default async function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section  */}
      <BannerSection />

      <section id="products">
        <ProductsSection />
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
