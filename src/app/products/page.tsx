"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getCategories, getProducts } from "@/lib/api";
import type { Product } from "@/types/product";

import ProductCard from "@/components/products/ProductCard";
import SearchBar from "@/components/products/SearchBar";
import CategoryFilter from "@/components/products/CategoryFilter";
import Pagination from "@/components/products/Pagination";
import LoadingCard from "@/components/products/LoadingCard";
import ErrorState from "@/components/products/ErrorState";
import EmptyState from "@/components/products/EmptyState";

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingState />}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsLoadingState() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-12 w-56 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-3 h-5 w-80 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="h-12 animate-pulse rounded-full bg-slate-200" />
        <div className="h-12 animate-pulse rounded-full bg-slate-200" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </main>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
    () => searchParams.get("category") ?? "all",
  );
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const [allProducts, allCategories] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(allProducts);
      setCategories(allCategories);
    } catch (error) {
      console.error("Failed to load products:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = !term || product.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize,
  );
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };
  const onCategoryChange = (category: string) => {
    setCurrentPage(1);
    setSelectedCategory(category);
    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const handleSearchChange = (value: string) => {
    setCurrentPage(1);
    setSearchTerm(value);
  };

  const clearFilters = () => {
    setCurrentPage(1);
    setSearchTerm("");
    setSelectedCategory("all");

    const url = new URL(window.location.href);
    url.searchParams.delete("category");

    window.history.replaceState({}, "", url.toString());
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
          Browse collection
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
          Products
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-body">
          Discover practical picks for everyday living, curated with quality,
          comfort, and style in mind.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_220px]">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />

        <CategoryFilter
          categories={categories}
          value={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>

      {/* Products */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState onRetry={loadProducts} />
      ) : filteredProducts.length === 0 ? (
        <EmptyState onClear={clearFilters} />
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            currentPage={safeCurrentPage}
            totalProducts={filteredProducts.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </main>
  );
}
