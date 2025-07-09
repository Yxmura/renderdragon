import { Skeleton } from "@/components/ui/skeleton";

const TextGeneratorControlsSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Text Input Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Font Selection Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Slider Skeletons */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}

      {/* Switch and Color Skeletons */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-5 w-24" />
        </div>
        <div>
            <Skeleton className="h-8 w-full" />
        </div>
      </div>

      {/* Download/Upload Buttons Skeleton */}
      <div className="flex gap-4 pt-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default TextGeneratorControlsSkeleton; 