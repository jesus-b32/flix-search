import type { streamingProviderList } from "@/server/actions/types";
import SelectSearch from "./client/SelectSearch";
import type { watchProviders } from "@/server/actions/types";

export default function AvailabilityByProvider({
  streamingProviders,
  movieWatchProviders,
}: {
  streamingProviders: streamingProviderList;
  movieWatchProviders: watchProviders;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Provider Availability</h1>
      {/* <SelectSearch /> */}
    </div>
  );
}
