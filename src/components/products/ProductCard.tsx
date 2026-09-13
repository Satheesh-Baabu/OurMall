import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import Rating from "@/components/products/Rating";
import Button from "@/components/Button";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-[22px] bg-slate-50">
          <div className="relative h-64 w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="space-y-3 px-2 pb-2 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary">
              {product.category}
            </span>
            <span className="text-lg font-bold text-heading">${product.price.toFixed(2)}</span>
          </div>

          <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold text-heading">{product.title}</h3>

          <div className="flex items-center justify-between gap-2">
            <Rating value={product.rating.rate} />
            <span className="text-xs text-body">({product.rating.count})</span>
          </div>

          <div className="flex items-center justify-between pt-2 text-sm font-semibold text-primary">
            <Button className="w-full">View Product</Button>
           </div>
        </div>
      </Link>
    </article>
  );
}
