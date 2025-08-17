"use client";

import { type FC, useCallback } from "react";

import { toast } from "sonner";

import { useCollectionSingleContext } from "@/components/providers/Collections.provider";
import { TaskCard } from "@/components/shared/Cards/TaskCard";
import { Skeleton } from "@/components/shared/UI/Skeleton/Skeleton";
import { useCompleteTask } from "@/hooks/mutations/user-tasks-mutations";
import { useTasks } from "@/hooks/queries/use-tasks";
import { PROJECT_STATUSES } from "@/types/collections";
import { type Task } from "@/types/tasks";

interface CollectionSingleTasksProps {
  collectionId: string;
}

export const CollectionSingleTasks: FC<CollectionSingleTasksProps> = ({
  collectionId,
}) => {
  const { data: tasksData, isLoading: isTasksLoading } = useTasks(collectionId);
  const { completedTasks, collectionData, isLoading } =
    useCollectionSingleContext();

  const isTasksLoaded = tasksData && !isLoading && !isTasksLoading;

  const completeTaskMutation = useCompleteTask();

  const handleClickOnTask = useCallback(
    async (taskData: Task) => {
      if (completedTasks !== null && collectionData) {
        const status = collectionData.status.statusName;
        if (status === PROJECT_STATUSES.FINISHED) {
          toast.error("Oops... The time for completing the tasks has expired");
          return;
        }

        if (status === PROJECT_STATUSES.UPCOMING) {
          toast.error(
            "This collection is not yet started. You can't complete tasks."
          );
          return;
        }

        window.open(taskData.link, "_blank");
        try {
          const data = await completeTaskMutation.mutateAsync(taskData.id);
          if (!data.id) {
            toast.error("Something went wrong! Please try again later :(");
          }
        } catch {
          toast.error("Something went wrong! Please try again later :(");
        }

        return;
      }
      toast.error("You need to Connect your Wallet first!", {
        position: "top-center",
      });
    },
    [completeTaskMutation, collectionData, completedTasks]
  );

  return (
    <section className="pt-14">
      <div className="container" id="tasks">
        <div className="inner-container">
          <h2 className="title-md mb-8">
            Tasks{" "}
            {collectionData?.status.statusName === PROJECT_STATUSES.FINISHED
              ? "(ended)"
              : null}
          </h2>
          <ul className="grid grid-col-1 md:grid-cols-3 gap-5">
            {isTasksLoaded ? (
              tasksData.map((task) => {
                const taskObj: Task = {
                  ...task,
                  finished: completedTasks
                    ? Boolean(completedTasks.find((c) => c.task.id === task.id))
                    : false,
                };
                return (
                  <TaskCard
                    key={task.id}
                    data={taskObj}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={handleClickOnTask}
                  />
                );
              })
            ) : (
              <Skeleton className="h-[222px] w-full" count={6} />
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
