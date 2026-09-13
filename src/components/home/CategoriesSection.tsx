"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { useEffect, useState } from "react";

import { getCategories } from "@/lib/api";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
          console.error("Categories API did not return an array:", data);
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadCategories();
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-4 w-28 animate-pulse rounded-full bg-slate-200" />
          <div className="mt-3 h-9 w-56 animate-pulse rounded-full bg-slate-200" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-3xl bg-slate-100"
            />
          ))}
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 ">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Categories
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading">
          Shop by category
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.slice(0, 4).map((category) => (
          <Link
            key={category}
            href={`/products?category=${encodeURIComponent(category)}`}
            className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md "
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Home className="h-5 w-5" aria-hidden="true" />
            </div>

            <p className="text-lg font-semibold capitalize text-heading">
              {category}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Explore
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
