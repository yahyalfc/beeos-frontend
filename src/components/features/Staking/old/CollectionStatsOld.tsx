import React from "react";

import { RightTriangle } from "@/components/shared/UI/RightTriangle/RightTriangle";
import { Skeleton } from "@/components/shared/UI/Skeleton/Skeleton";
import { useIsMobile } from "@/hooks/useResponsible";

interface CollectionStatsProps {
  isLoading: boolean;
  myNftCount: number;
  stakedNftCount: number;
  rewardedXp?: number;
  xpPerDay?: number;
}

const CollectionStatsOld: React.FC<CollectionStatsProps> = ({
  isLoading,
  myNftCount,
  stakedNftCount,
  rewardedXp,
  xpPerDay,
}) => {
  const StatCard: React.FC<{
    title: string;
    value: string | number | undefined;
    isFirst?: boolean;
    isLast?: boolean;
    isLoading: boolean;
  }> = ({ title, value, isFirst, isLast, isLoading }) => {
    const isMobile = useIsMobile();

    return (
      <div
        className="p-4 sm:p-5 relative"
        style={{
          background:
            "linear-gradient(30deg, #0E1010 0%, #0D1010 25%, #131919 50%, #0C0E0E 100% )",
        }}
      >
        <div className="text-white text-lg block mb-2">{title}</div>
        {isFirst ? (
          <RightTriangle
            className="absolute top-0 sm:bottom-0 sm:top-auto w-6 h-6 sm:w-9 sm:h-9"
            corner={isMobile ? "top-left" : "bottom-left"}
            height={isMobile ? 24 : 36}
            isFilled="rgba(6,7,7,1)"
            strokeColor="black"
            strokeWidth={1}
            width={isMobile ? 24 : 36}
          />
        ) : null}
        {isLast ? (
          <RightTriangle
            className="absolute bottom-0 right-0 left-auto top-auto w-6 h-6 sm:w-9 sm:h-9"
            corner="bottom-right"
            height={isMobile ? 24 : 36}
            isFilled="rgba(6,7,7,1)"
            strokeColor="black"
            strokeWidth={1}
            width={isMobile ? 24 : 36}
          />
        ) : null}
        {isLoading ? (
          <Skeleton className="h-6" />
        ) : (
          <div className="text-lg font-semibold text-accent block">
            {typeof value === "number" ? value.toLocaleString() : value ?? "0"}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:mb-8">
      <StatCard
        isFirst
        isLoading={isLoading}
        title="My NFTs"
        value={myNftCount}
      />
      <StatCard
        isLoading={isLoading}
        title="Staked NFTs"
        value={stakedNftCount}
      />
      <StatCard isLoading={isLoading} title="XP per Day" value={xpPerDay} />
      <StatCard
        isLast
        isLoading={isLoading}
        title="Rewarded XP"
        value={rewardedXp?.toFixed(3)}
      />
    </div>
  );
};

export default CollectionStatsOld;
