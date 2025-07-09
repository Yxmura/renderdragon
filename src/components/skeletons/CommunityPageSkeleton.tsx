import { Skeleton } from "@/components/ui/skeleton";
import VideoCardSkeleton from "./VideoCardSkeleton";
import ServerCardSkeleton from "./ServerCardSkeleton";

const CommunityPageSkeleton = () => {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Tutorials Skeleton */}
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className="h-8 w-1/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-6" />
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Servers Skeleton (for the other tab) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 6 }).map((_, i) => (
            <ServerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPageSkeleton; 