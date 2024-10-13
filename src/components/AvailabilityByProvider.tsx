import type { streamingProviderList } from "@/server/actions/types";
import SelectSearch from "./client/SelectSearch";
import type { watchProviders } from "@/server/actions/types";

export default function AvailabilityByProvider({
  streamingProviderList,
  watchProviders,
  selectedStreamingProvider,
}: {
  streamingProviderList: streamingProviderList;
  watchProviders: watchProviders;
  selectedStreamingProvider: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Provider Availability</h1>
      <SelectSearch
        data={streamingProviderList}
        defaultValue={selectedStreamingProvider}
      />
    </div>
  );
}
