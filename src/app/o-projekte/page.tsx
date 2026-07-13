import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { shelterResultsQueryOptions } from "@/api/shelters/queries";
import AboutProjectPageContent from "@/components/pages/AboutProjectPageContent";
import { createQueryClient } from "@/lib/query-client";

const AboutProject = async () => {
  const queryClient = createQueryClient();

  await queryClient.prefetchQuery(shelterResultsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutProjectPageContent />
    </HydrationBoundary>
  );
};

export default AboutProject;
