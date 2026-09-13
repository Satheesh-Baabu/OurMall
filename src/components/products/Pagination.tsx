"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Dropdown, { type DropdownOption } from "@/components/Dropdown";

interface PaginationProps {
  currentPage: number;
  totalProducts: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const pageSizeOptions: DropdownOption[] = [
  { label: "8", value: "8" },
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "40", value: "40" },
];

export default function Pagination({
  currentPage,
  totalProducts,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  if (totalPages <= 1) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalProducts);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="mt-10 flex flex-col gap-5 border-t border-slate-200 pt-6 sm:flex-row items-center sm:justify-between"
      aria-label="Pagination navigation"
    >
      {/* Page size */}
      <div className="flex items-center gap-2 text-sm text-body">
        <span>Show</span>

        <Dropdown
          options={pageSizeOptions}
          value={String(pageSize)}
          onChange={(value) => onPageSizeChange(Number(value))}
          className="w-20"
        />
      </div>

      {/* Showing count */}
      <p className="text-sm text-body">
        Showing{" "}
        <span className="font-semibold text-heading">
          {startItem}–{endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-heading">
          {totalProducts}
        </span>{" "}
        products
      </p>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-heading transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>

        {/* Pages */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-body"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`h-9 min-w-9 rounded-full px-2 text-sm font-semibold transition-colors ${
                currentPage === page
                  ? "bg-primary text-white shadow-sm"
                  : "border border-slate-200 bg-white text-heading hover:border-primary hover:text-primary"
              }`}
              aria-current={
                currentPage === page ? "page" : undefined
              }
            >
              {page}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-heading transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight
            className="h-4 w-4"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}