import type { streamingProviderList } from "@/server/actions/types";
import SelectSearch from "./client/SelectSearch";
// import type { watchProviders } from "@/server/actions/types";
import type { movieDetails } from "@/server/actions/movies/types";
import type { tvDetails } from "@/server/actions/tv/types";

export default function AvailabilityByProvider({
  streamingProviderList,
  details,
  selectedStreamingProvider,
}: {
  streamingProviderList: streamingProviderList;
  details: movieDetails | tvDetails;
  selectedStreamingProvider: string;
}) {
  const title = "title" in details ? details.title : details.name;
  const watchProviders = details["watch/providers"].results;

  return (
    <div className="flex w-full flex-col items-center justify-center lg:w-10/12 lg:justify-start">
      <h2 className="text-2xl font-bold">Provider Availability</h2>
      <SelectSearch
        data={streamingProviderList}
        defaultValue={selectedStreamingProvider}
      />

      <div>
        <h2 className="text-2xl font-bold">
          {`${title} is available on Netflix in the following countries:`}
        </h2>
      </div>
    </div>
  );
}
