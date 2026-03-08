import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-8 w-20 mb-1" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-[250px] w-full rounded" />
        </div>
        <div className="rounded-xl border bg-card p-6">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-[250px] w-full rounded" />
        </div>
      </div>
    </div>
  );
}
