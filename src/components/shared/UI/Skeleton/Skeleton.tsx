import { cn } from "@/lib/utils";

import cl from "./Skeleton.module.css";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
}

function Skeleton({ className, count, ...props }: SkeletonProps) {
  const skeletons = Array(count ?? 1).fill(0);
  return count ? (
    skeletons.map((_, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className={cn(`${cl.skeleton}`, className)}
        {...props}
      />
    ))
  ) : (
    <div
      className={cn(`${cl.skeleton}`, className)}
      {...props}
    />
  );
}

export { Skeleton };
