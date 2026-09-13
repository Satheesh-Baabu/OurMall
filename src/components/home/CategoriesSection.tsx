"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "/categories/electronics.png",
  },
  {
    name: "Men's Clothing",
    slug: "men's clothing",
    image: "/categories/mens.png",
  },
  {
    name: "Women's Clothing",
    slug: "women's clothing",
    image: "/categories/womens.png",
  },
  {
    name: "Jewelry",
    slug: "jewelery",
    image: "/categories/jewels.png",
  },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Categories
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-heading">
          Shop by category
        </h2>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${encodeURIComponent(category.slug)}`}
            className="group flex flex-col items-center text-center"
          >
            {/* Category Image */}
            <div className="relative aspect-square w-full max-w-45 overflow-hidden rounded-t-full bg-primary/30 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 40vw, 180px"
                className="object-cover"
              />
            </div>

            {/* Category Name */}
            <p className="mt-4 text-sm font-medium text-heading transition-colors duration-300 group-hover:text-primary sm:text-base">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}