"use client";

import { type FC } from "react";

import { Lock, Dices, Sparkles, Rocket } from "lucide-react";

import { TaskInterface } from "@/components/shared/Interfaces/VectorInterfaces/TaskInterface";
import { useProfileActivities } from "@/hooks/queries/useProfile";

const getActivityIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("stake")) {
    return <Lock className="w-5 h-5 text-white" />;
  }
  if (lowerTitle.includes("mint")) {
    return <Rocket className="w-5 h-5 text-white" />;
  }
  if (lowerTitle.includes("raffle")) {
    return <Dices className="w-5 h-5 text-white" />;
  }
  return <Sparkles className="w-5 h-5 text-white" />;
};

export const ProfileActivities: FC = () => {
  const { data: activities, isLoading } = useProfileActivities();

  const displayActivities = activities?.length ? activities : [];

  return (
    <div className="flex flex-col gap-4 topmost_prnt">
      <div className="flex items-center justify-between mb-4 tittle_top">
        <h3 className="title-normal font-tusker-exp">Recent Activities</h3>
      </div>

      <div className="inner_card cardbottom_prnt relative">
        <img
          className="img_bg_bottom absolute inset-0 w-full  object-cover"
          src="\profile-achievement-bg.png"
          alt=""
        />
        <div className="relative z-[1] max-h-[600px] overflow-y-auto flex flex-col gap-3 card_top scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent">
          {isLoading ? (
            <div className="text-mini text-slight px-6 py-4">
              Loading activities...
            </div>
          ) : displayActivities.length ? (
            displayActivities.map((activity, index) => (
              <div
                key={`${activity.title}-${index}`}
                className="relative px-6 py-4"
              >
                {/* TaskInterface as background for this specific item */}
                <div className="absolute inset-0">
                  <TaskInterface />
                </div>

                <div className="relative z-[2] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center flex-shrink-0">
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
                  <span className="text-accent font-semibold flex-shrink-0">
                    +{activity.points}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-mini text-slight px-6 py-4">
              No Activities found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
