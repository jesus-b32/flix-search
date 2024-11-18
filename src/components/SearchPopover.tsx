import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search as SearchIcon } from "lucide-react";
import Search from "./client/Search";

/**
 * A popover that contains a search bar. The popover is
 * triggered by a button with a search icon.
 *
 * @example
 * <SearchPopover />
 */
export default function SearchPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <SearchIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen rounded-none border-none bg-slate-600">
        <Search />
      </PopoverContent>
    </Popover>
  );
}
