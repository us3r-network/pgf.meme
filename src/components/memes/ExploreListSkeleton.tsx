import { Skeleton } from "../ui/skeleton";

export default function ExploreListSkeleton() {
  return (
    <div className="flex flex-1 flex-col p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="aspect-square rounded-lg" />
        ))}
      </div>
    </div>
  );
}
