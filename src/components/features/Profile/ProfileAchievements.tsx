/* eslint-disable sonarjs/jsx-no-leaked-render */
"use client";

import { type FC } from "react";

import { Sparkles, Check } from "lucide-react";

import { TaskInterface } from "@/components/shared/Interfaces/VectorInterfaces/TaskInterface";
import { useProfileAchievements } from "@/hooks/queries/useProfile";
import { type ProfileAchievement } from "@/types/profile";

export const ProfileAchievements: FC = () => {
  const { data: achievements, isLoading } = useProfileAchievements();

  const displayAchievements: ProfileAchievement[] = achievements?.length
    ? achievements
    : [];

  return (
    <div className="flex flex-col gap-4 topmost_prnt">
      <h3 className="title-normal font-tusker-exp mb-4 tittle_top">
        Achievements
      </h3>
      <div className="inner_card cardbottom_prnt relative">
        <img
          className="img_bg_bottom absolute inset-0 w-full  object-cover"
          src="\profile-achievement-bg.png"
          alt=""
        />
        <div className="relative z-[1] card_content overflow-y-auto flex flex-col gap-3 card_top scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent">
          {isLoading ? (
            <div className="text-mini text-slight px-6 py-4">
              Loading achievements...
            </div>
          ) : displayAchievements.length ? (
            displayAchievements.map((achievement, index) => {
              const isCompleted = achievement.current >= achievement.target;
              const progressPercentage = achievement.target
                ? (achievement.current / achievement.target) * 100
                : 0;

              return (
                <div
                  key={achievement.id || index}
                  className="relative px-6 py-4"
                >
                  {/* TaskInterface as background for this specific item */}
                  <div className="absolute inset-0">
                    <TaskInterface />
                  </div>

                  <div className="relative z-[2]">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center flex-shrink-0">
                          {"icon" in achievement && achievement.icon ? (
                            (achievement.icon as React.ReactNode)
                          ) : (
                            <Sparkles className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-medium ${
                              isCompleted ? "text-accent" : "text-white"
                            }`}
                          >
                            {achievement.title}
                          </span>
                          <span className="text-mini text-slight">
                            {achievement.description}
                          </span>
                        </div>
                      </div>
                      {isCompleted && (
                        <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      )}
                    </div>

                    {!isCompleted && achievement.target && (
                      <div className="ml-9">
                        <div className="flex items-center justify-between text-mini text-slight mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.current}/{achievement.target}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-nero rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-mini text-slight px-6 py-4">
              No Achievements found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
