import { Skeleton } from "@/components/ui/skeleton";

const TitleSuggestionSkeleton = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="pixel-card p-4 space-y-3">
        <Skeleton className="h-5 w-5/6" />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default TitleSuggestionSkeleton;