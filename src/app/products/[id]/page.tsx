"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import Button from "@/components/Button";
import Rating from "@/components/products/Rating";
import { getProductById } from "@/lib/api";
import type { Product } from "@/types/product";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (!id || Number.isNaN(id)) {
      setError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(false);

      const result = await getProductById(id);

      setProduct(result);
    } catch (error) {
      console.error("Failed to load product:", error);
      setError(true);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    setShowToast(true);

    window.setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-125 animate-pulse rounded-[28px] bg-slate-200" />

          <div className="space-y-4">
            <div className="h-8 w-28 animate-pulse rounded-full bg-slate-200" />
            <div className="h-12 w-3/4 animate-pulse rounded-full bg-slate-200" />
            <div className="h-28 w-full animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-slate-200" />
            <div className="h-12 w-40 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-heading">Product Not Found</h1>

          <p className="mt-4 text-base text-body">
            The product you&apos;re looking for could not be found.
          </p>

          <div className="mt-8 flex justify-center">
            <Button href="/products">Back to Products</Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Product Image */}
          <div className="rounded-4xl border border-slate-200 bg-white p-4 shadow-sm">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(true)}
              className="group relative block h-105 w-full cursor-pointer overflow-hidden rounded-3xl bg-slate-50 sm:h-130"
              aria-label={`View ${product.title} image`}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              />

             
            </button>
          </div>

          {/* Product Information */}
          <div>
            <span className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
              {product.category}
            </span>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-heading sm:text-5xl">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <Rating value={product.rating.rate} />

              <span className="text-sm text-body">
                {product.rating.count} reviews
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-heading">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-5 max-w-xl text-base leading-7 text-body">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button type="button" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Add to Cart Toast */}
      {showToast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-heading px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs">
            ✓
          </span>
          Added to cart successfully
        </div>
      )}

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`View ${product.title}`}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-heading shadow-lg transition-colors hover:bg-slate-100"
            aria-label="Close image"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
