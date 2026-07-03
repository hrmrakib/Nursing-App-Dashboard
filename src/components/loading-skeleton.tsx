/**
 * LoadingSkeleton — pulse-animated placeholder for loading states.
 * Provides variants for stat cards, table rows, and profile sections.
 */

/** Skeleton block with configurable dimensions */
function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

/** Skeleton for a single stat card */
export function StatCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-card p-5 flex items-center gap-4">
      <SkeletonBlock className="w-12 h-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-7 w-16" />
      </div>
    </div>
  );
}

/** Skeleton for a row of 4 stat cards */
export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Skeleton for table rows */
export function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-card overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-primary/10 px-6 py-3">
        <div className="flex gap-8">
          {Array.from({ length: cols }).map((_, i) => (
            <SkeletonBlock key={i} className="h-4 w-24" />
          ))}
        </div>
      </div>

      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div
          key={rowIdx}
          className="px-6 py-4 border-b border-border-light flex gap-8"
        >
          {Array.from({ length: cols }).map((_, colIdx) => (
            <SkeletonBlock
              key={colIdx}
              className={`h-4 ${colIdx === 0 ? "w-28" : "w-20"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/** Skeleton for the nurse profile page */
export function ProfileSkeleton() {
  return (
    <div className="bg-surface rounded-xl border border-border shadow-card p-8 max-w-md space-y-6">
      <SkeletonBlock className="w-24 h-24 rounded-full mx-auto" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
      ))}
    </div>
  );
}
