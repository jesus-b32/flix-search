"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search as SearchIcon } from "lucide-react";
import Search from "@/components/client/Search";
import React from "react";

/**
 * A popover that contains a search bar. The popover is
 * triggered by a button with a search icon.
 * Used in the home page.
 *
 * @example
 * <SearchPopover />
 */
export default function SearchPopover() {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button aria-label="Open search">
          <SearchIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen rounded-none border-none bg-slate-600">
        <Search onSearch={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
