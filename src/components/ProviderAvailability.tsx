import SelectSearch from "./client/SelectSearch";

export default function ProviderAvailability() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Provider Availability</h1>
      <SelectSearch />
    </div>
  );
}
