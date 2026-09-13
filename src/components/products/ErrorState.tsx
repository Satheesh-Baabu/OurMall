import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/Button";

export default function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-heading">Unable to load products</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-body">
        Something went wrong while fetching the products.
      </p>
      {onRetry && (
        <div className="mt-6">
          <Button onClick={onRetry} type="button" className="gap-2">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
