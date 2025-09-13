"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type AvailabilityToggleProps = {
  providerView: React.ReactNode;
  countryView: React.ReactNode;
};

/**
 * A component that toggles between displaying the provider view and the country view.
 * Used for toggling between displaying the provider view and the country view.
 * Used in the movie and tv detail pages.
 *
 * @param providerView - the provider view
 * @param countryView - the country view
 * @returns a toggle component that displays the provider view and the country view
 */
export default function AvailabilityToggle({
  providerView,
  countryView,
}: AvailabilityToggleProps) {
  return (
    <div className="mt-6 flex w-[90%] flex-col md:w-10/12">
      <Tabs defaultValue="provider" className="w-full">
        <div className="mb-4 flex items-center justify-center">
          <TabsList>
            <TabsTrigger value="provider">By Provider</TabsTrigger>
            <TabsTrigger value="country">By Country</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="provider">{providerView}</TabsContent>

        <TabsContent value="country">{countryView}</TabsContent>
      </Tabs>
    </div>
  );
}
