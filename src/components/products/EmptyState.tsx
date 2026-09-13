import { SearchX } from "lucide-react";
import Button from "@/components/Button";

export default function EmptyState({ onClear }: { onClear?: () => void }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <SearchX className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-heading">No products found</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-body">
        Try changing your search or category filter.
      </p>
      {onClear && (
        <div className="mt-6">
          <Button onClick={onClear} type="button">
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
