// components/SkeletonTable.tsx
export default function SkeletonTable({ rows = 5, cols = 8 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="h-4 bg-white/10 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}