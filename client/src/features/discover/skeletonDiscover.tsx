import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDiscover() {
  return (
    <div className="flex gap-3 w-full py-5">
      <Skeleton className="w-[40px] h-[40px] rounded-full bg-border" />
      <div className="flex flex-col gap-3 w-full">
        <div className="flex w-full justify-between">
          <Skeleton className="w-[100px] h-[20px] rounded-full bg-border" />
          <Skeleton className="w-[60px] h-[20px] rounded-full bg-border" />
        </div>
        <Skeleton className="w-2/3 h-[20px] rounded-full bg-border" />
        <Skeleton className="w-2/3 h-[20px] rounded-full bg-border" />
        <div className="flex gap-2">
          <Skeleton className="w-[30px] h-[30px] rounded-full bg-border" />
          <Skeleton className="w-[30px] h-[30px] rounded-full bg-border" />
        </div>
        <Skeleton className="w-[50px] h-[14px] rounded-full bg-border" />
      </div>
    </div>
  );
}
