import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function SkeletonLoading({maxW}) {
  return (
    <div className={`max-w-[${maxW}px] w-full flex items-center gap-3 my-8 px-8`}>
      <div>
        <Skeleton className="flex rounded-full w-16 h-16" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-4 w-3/5 rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
        <Skeleton className="h-4 w-5/5 rounded-lg" />
      </div>
    </div>
  );
}
