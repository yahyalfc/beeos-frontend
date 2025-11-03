"use client";

import { type FC } from "react";

import { Lock, Palette, Dices, Sparkles } from "lucide-react";

import { TaskInterface } from "@/components/shared/Interfaces/VectorInterfaces/TaskInterface";
import { useProfileActivities } from "@/hooks/queries/useProfile";

const MOCK_ACTIVITIES = [
  { title: "Stake", points: 120, date: "Aug" },
  { title: "Mint", points: 85, date: "Aug" },
  { title: "Raffle", points: 50, date: "Aug" },
];

const getActivityIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("stake")) {
    return <Lock className="w-5 h-5 text-white" />;
  }
  if (lowerTitle.includes("mint")) {
    return <Palette className="w-5 h-5 text-white" />;
  }
  if (lowerTitle.includes("raffle")) {
    return <Dices className="w-5 h-5 text-white" />;
  }
  return <Sparkles className="w-5 h-5 text-white" />;
};

export const ProfileActivities: FC = () => {
  const { data: activities, isLoading } = useProfileActivities();

  const displayActivities = activities?.length ? activities : MOCK_ACTIVITIES;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="title-mini">Recent Activity</h3>
        <button className="text-accent text-sm hover:underline">
          View all
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          <div className="text-mini text-slight">Loading activities...</div>
        ) : (
          displayActivities.slice(0, 5).map((activity) => (
            <div key={activity.title} className="relative px-6 py-4">
              <TaskInterface />
              <div className="relative z-[2] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center">
                    {getActivityIcon(activity.title)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">
                      {activity.title}
                    </span>
                    {/* <span className="text-mini text-slight">
                      {activity.date ||
                        new Date().toLocaleDateString("en-US", {
                          month: "short",
                        })}
                    </span> */}
                  </div>
                </div>
                <span className="text-accent font-semibold">
                  +{activity.points}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
