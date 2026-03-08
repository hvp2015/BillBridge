import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="rounded-xl border bg-card p-6">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="rounded-xl border bg-card">
        <div className="p-4 space-y-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
