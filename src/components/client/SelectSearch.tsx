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

export default function SelectSearch({
  data,
  defaultValue,
}: {
  data: countryList | streamingProviderList;
  defaultValue: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {"results" in data
            ? value
              ? data.results.find(
                  (provider) => provider.provider_name.toLowerCase() === value,
                )?.provider_name
              : "Select Streaming Provider..."
            : value
              ? data.find(
                  (country) => country.native_name.toLowerCase() === value,
                )?.native_name
              : "Select Country..."}
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
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === provider.provider_name.toLowerCase()
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
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country.native_name.toLowerCase()
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
