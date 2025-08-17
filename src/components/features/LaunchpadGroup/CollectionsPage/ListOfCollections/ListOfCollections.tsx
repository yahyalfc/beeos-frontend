/* eslint-disable no-nested-ternary */
/* eslint-disable sonarjs/no-nested-conditional */
"use client";

import { type FC } from "react";

import { CollectionCard } from "@/components/shared/Cards/CollectionCard";
import { Skeleton } from "@/components/shared/UI/Skeleton/Skeleton";
import { useCollections } from "@/hooks/queries/use-collections";
import { PROJECT_STATUSES } from "@/types/collections";

export const ListOfCollections: FC = ({}) => {
  const { data, isLoading } = useCollections(undefined);

  const pastCollections = data
    ? data.filter(
        (collection) =>
          collection.status.statusName === PROJECT_STATUSES.FINISHED
      )
    : null;

  const upcomingLiveCollections = data
    ? data.filter(
        (collection) =>
          collection.status.statusName === PROJECT_STATUSES.UPCOMING ||
          collection.status.statusName === PROJECT_STATUSES.QUESTING ||
          collection.status.statusName === PROJECT_STATUSES.MINT
      )
    : null;

  return (
    <section className="relative pt-10">
      <div className="container">
        {(upcomingLiveCollections && !isLoading) ||
        (!upcomingLiveCollections && isLoading) ? (
          <div className="inner-container">
            <h2 className="title-md mb-7">Upcoming</h2>
            {upcomingLiveCollections?.length && !isLoading ? (
              <ul className="grid md:grid-cols-4 gap-5">
                {upcomingLiveCollections.map((collectionData) => (
                  <CollectionCard
                    key={collectionData.id}
                    data={collectionData}
                  />
                ))}
              </ul>
            ) : !upcomingLiveCollections && isLoading ? (
              <ul className="grid md:grid-cols-4 gap-5">
                <Skeleton className="aspect-[335/486] block" count={4} />
              </ul>
            ) : (
              <ListOfCollectionsEmpty />
            )}
          </div>
        ) : null}
        {(pastCollections && !isLoading) || (!pastCollections && isLoading) ? (
          <div className="inner-container mt-14">
            <h2 className="title-md mb-7">Past</h2>

            {pastCollections?.length && !isLoading ? (
              <ul className="grid md:grid-cols-4 gap-5">
                {/* sort by date */}
                {pastCollections.toSorted(
                  (a, b) => new Date(b.status.endsAt).getTime() - new Date(a.status.endsAt).getTime()
                ).map((collectionData) => (
                  <CollectionCard
                    key={collectionData.id}
                    data={collectionData}
                  />
                ))}
              </ul>
            ) : !pastCollections && isLoading ? (
              <ul className="grid md:grid-cols-4 gap-5">
                <Skeleton className="aspect-[335/486] block" count={4} />
              </ul>
            ) : (
              <ListOfCollectionsEmpty />
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

const ListOfCollectionsEmpty: FC = () => {
  return (
    <div className="inner-container w-full">
      <p className="text-start text-md my-16">
        No Collections Found. There are currently <br/> no collections available.
      </p>
    </div>
  );
};
