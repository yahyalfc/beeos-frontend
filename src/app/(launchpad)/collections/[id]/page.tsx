import { CollectionSingleHero } from "@/components/features/LaunchpadGroup/CollectionSinglePage/CollectionSingleHero/CollectionSingleHero";
import { CollectionSingleProfile } from "@/components/features/LaunchpadGroup/CollectionSinglePage/CollectionSingleProfile/CollectionSingleProfile";
import { CollectionSingleTasks } from "@/components/features/LaunchpadGroup/CollectionSinglePage/CollectionSingleTasks/CollectionSingleTasks";
import { CollectionSingleProvider } from "@/components/providers/Collections.provider";

// NO CACHE
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  return (
    <main>
      <CollectionSingleProvider collectionId={id}>
        <CollectionSingleHero />
        <CollectionSingleProfile />
        <CollectionSingleTasks collectionId={id} />
      </CollectionSingleProvider>
    </main>
  );
}
