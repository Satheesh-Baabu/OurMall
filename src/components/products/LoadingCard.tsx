export default function LoadingCard() {
  return (
    <div className="animate-pulse rounded-[28px] border border-slate-200 bg-white p-3 shadow-sm">
      <div className="h-64 rounded-[22px] bg-slate-200" />
      <div className="space-y-3 px-2 pb-2 pt-4">
        <div className="h-6 w-1/3 rounded-full bg-slate-200" />
        <div className="h-6 w-4/5 rounded-full bg-slate-200" />
        <div className="h-4 w-3/5 rounded-full bg-slate-200" />
        <div className="h-10 w-full rounded-full bg-slate-200" />
      </div>
    </div>
  );
}
