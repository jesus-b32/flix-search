"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type AvailabilityToggleProps = {
  providerView: React.ReactNode;
  countryView: React.ReactNode;
};

export default function AvailabilityToggle({
  providerView,
  countryView,
}: AvailabilityToggleProps) {
  return (
    <div className="flex w-[90%] flex-col md:w-10/12">
      <Tabs defaultValue="provider" className="w-full">
        <div className="mb-6 flex items-center justify-center">
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
