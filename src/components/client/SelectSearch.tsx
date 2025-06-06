"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type {
  countryList,
  streamingProviderList,
} from "@/server/actions/types";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * A component that renders a searchable and selectable popover list for either
 * streaming providers or countries. It allows users to filter and select
 * options from the provided data, updating the URL search parameters based on
 * the selection.
 * @param data - An array of either country objects or streaming provider objects.
 * @returns A React component for selecting and searching through the given data.
 */
export default function SelectSearch({
  data,
  className,
}: {
  data: countryList | streamingProviderList;
  className?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const watchProviderId =
    searchParams.get("streamingProvider") ??
    ("results" in data ? data.results[0]?.provider_id.toString() : "");

  const [open, setOpen] = React.useState(false);
  const [watchRegion, setWatchRegion] = React.useState(
    searchParams.get("watch_region") ?? "US",
  );
  const [watchProvider, setWatchProvider] = React.useState(watchProviderId);

  return (
    <div className={cn("w-[200px]", className)}>
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {"results" in data
              ? (data.results.find(
                  (provider) =>
                    provider.provider_id.toString() === watchProvider,
                )?.provider_name ?? "Select Provider")
              : (data.find((country) => country.iso_3166_1 === watchRegion)
                  ?.native_name ?? "Select country")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" side="bottom">
          <Command>
            <CommandInput
              placeholder={
                "results" in data
                  ? "Select streaming provider"
                  : "Select country"
              }
            />
            <CommandList>
              <CommandEmpty>
                {"results" in data
                  ? "No streaming providers found"
                  : "No countries found"}
              </CommandEmpty>
              <CommandGroup>
                {"results" in data
                  ? data.results.map((provider) => (
                      <CommandItem
                        key={provider.provider_id}
                        value={provider.provider_name.toLowerCase()}
                        onSelect={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set(
                            "streamingProvider",
                            provider.provider_id.toString(),
                          );
                          setWatchProvider(provider.provider_id.toString());
                          setOpen(false);
                          router.push(`${pathname}?${params.toString()}`);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            watchProvider === provider.provider_id.toString()
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {provider.provider_name}
                      </CommandItem>
                    ))
                  : data.map((country) => (
                      <CommandItem
                        key={country.iso_3166_1}
                        value={country.native_name.toLowerCase()}
                        onSelect={() => {
                          const params = new URLSearchParams(searchParams);
                          if (searchParams.get("page")) params.set("page", "1");
                          params.set("watch_region", country.iso_3166_1);
                          setWatchRegion(country.iso_3166_1);
                          setOpen(false);
                          router.push(`${pathname}?${params.toString()}`);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            watchRegion === country.iso_3166_1
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {country.native_name}
                      </CommandItem>
                    ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
