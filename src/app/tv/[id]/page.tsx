import { getTvShowDetails } from "@/server/actions/tv/actions";
import DetailCard from "@/components/DetailCard";
import JustWatchAttribution from "@/components/JustWatchAttribution";

export default async function MovieDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const seriesId = Number(params.id);
  const series = await getTvShowDetails(seriesId);

  if (series instanceof Error) {
    throw new Error(`Failed to fetch data: ${series}`);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <DetailCard details={series} />
      <JustWatchAttribution title={series.name} />
    </div>
  );
}
