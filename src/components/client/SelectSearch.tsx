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
}: {
  data: countryList | streamingProviderList;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [watchRegion, setWatchRegion] = React.useState(
    searchParams.get("watch_region") ?? "US",
  );
  const [watchProvider, setWatchProvider] = React.useState(
    searchParams.get("streamingProvider") ?? "8",
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {"results" in data
            ? (data.results.find(
                (provider) => provider.provider_id.toString() === watchProvider,
              )?.provider_name ?? "Select Provider")
            : (data.find((country) => country.iso_3166_1 === watchRegion)
                ?.native_name ?? "Select country")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={
              "results" in data ? "Select streaming provider" : "Select country"
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
                      onSelect={(currentValue) => {
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
                      onSelect={(currentValue) => {
                        const params = new URLSearchParams(searchParams);
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
  );
}
