"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

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

// type definitions
import type {
  languagesList,
  watchProviderRegions,
} from "@/server/actions/types";

interface SelectListProps {
  list: languagesList | watchProviderRegions;
  currentValue: string;
  setCurrentValue: Dispatch<SetStateAction<string>>;
  className?: string;
  onValueChange?: () => void;
}

export default function SelectList({
  list,
  currentValue,
  setCurrentValue,
  className,
  onValueChange,
}: SelectListProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("w-[200px]", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="secondary"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {"results" in list
              ? list.results.find(
                  (region) => region.iso_3166_1 === currentValue,
                )?.native_name
              : list.find((language) => language.iso_639_1 === currentValue)
                  ?.english_name}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start" side="bottom">
          <Command>
            <CommandInput placeholder={"Select language..."} />
            <CommandList>
              <CommandEmpty>{"No languages found"}</CommandEmpty>
              <CommandGroup>
                {"results" in list
                  ? list.results.map((region) => (
                      <CommandItem
                        key={region.iso_3166_1}
                        value={region.native_name.toLowerCase()}
                        onSelect={() => {
                          setCurrentValue(region.iso_3166_1);
                          setOpen(false);
                          if (onValueChange) onValueChange();
                        }}
                      >
                        {region.native_name}
                      </CommandItem>
                    ))
                  : list.map((language) => (
                      <CommandItem
                        key={language.iso_639_1}
                        value={language.english_name.toLowerCase()}
                        onSelect={(currentValue) => {
                          setCurrentValue(
                            list.find(
                              (language) =>
                                language.english_name.toLowerCase() ===
                                currentValue,
                            )?.iso_639_1 ?? "",
                          );
                          setOpen(false);
                          if (onValueChange) onValueChange();
                        }}
                      >
                        {language.english_name}
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
