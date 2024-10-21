import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search as SearchIcon } from "lucide-react";
import Search from "./client/Search";

export default function SearchPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <SearchIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-screen rounded-none border-none bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <Search />
      </PopoverContent>
    </Popover>
  );
}
