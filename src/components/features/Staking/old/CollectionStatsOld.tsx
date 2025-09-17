import React from "react";

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
    isLoading: boolean;
  }> = ({ title, value, isLoading }) => (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      {isLoading ? (
        <div className="h-6 bg-gray-700 rounded animate-pulse" />
      ) : (
        <div className="text-xl font-bold text-white">
          {typeof value === "number" ? value.toLocaleString() : value ?? "0"}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard isLoading={isLoading} title="My NFTs" value={myNftCount} />
      <StatCard
        isLoading={isLoading}
        title="Staked NFTs"
        value={stakedNftCount}
      />
      <StatCard isLoading={isLoading} title="XP per Day" value={xpPerDay} />
      <StatCard
        isLoading={isLoading}
        title="Rewarded XP"
        value={rewardedXp?.toFixed(3)}
      />
    </div>
  );
};

export default CollectionStatsOld;
