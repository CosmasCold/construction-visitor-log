export default function SkeletonTable() {
  return (
    <div className="bg-white/[0.06] backdrop-blur-md rounded-2xl border border-white/10 shadow-card-raised overflow-x-auto p-4">
      <div className="animate-pulse space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="h-8 w-8 rounded bg-white/10" />
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-12 bg-white/10 rounded" />
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}