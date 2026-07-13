import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { sheltersQueryOptions } from "@/api/shelters/queries";
import HomePageContent from "@/components/pages/HomePageContent";
import { createQueryClient } from "@/lib/query-client";

const Home = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(sheltersQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageContent />
    </HydrationBoundary>
  );
};

export default Home;
