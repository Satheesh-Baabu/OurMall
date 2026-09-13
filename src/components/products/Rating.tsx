import { Star } from "lucide-react";

export default function Rating({ value }: { value: number }) {
  const filled = Math.round(value);

  return (
    <div className="flex items-center gap-1 text-[13px] text-secondary" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < filled ? "fill-current text-secondary" : "text-slate-300"}`}
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-sm font-medium text-body">{value.toFixed(1)}</span>
    </div>
  );
}
