import { CollectionsHero } from "@/components/features/LaunchpadGroup/CollectionsPage/CollectionsHero/CollectionsHero";
import { ListOfCollections } from "@/components/features/LaunchpadGroup/CollectionsPage/ListOfCollections/ListOfCollections";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/UI/Tabs/Tabs";

export const dynamic = "force-dynamic";
export const revalidate = 1;

export default function Home() {
  return (
    <main className="block">
      <CollectionsHero />
      <div className="container block mt-10">
        <Tabs className="inner-container" defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <ListOfCollections />
    </main>
  );
}
