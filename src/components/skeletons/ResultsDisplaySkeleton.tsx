import { Skeleton } from "@/components/ui/skeleton";

const ResultsDisplaySkeleton = () => {
  return (
    <div className="mt-8 space-y-6">
      {/* Main Result Card Skeleton */}
      <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden p-8">
        <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-6">
          <Skeleton className="w-24 h-24 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="bg-gray-50 dark:bg-slate-700/30 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
              <Skeleton className="h-5 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mt-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Platform Recommendations Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Source Analysis Skeleton */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/2 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-5 w-1/2 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplaySkeleton; 