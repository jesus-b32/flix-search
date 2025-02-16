"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";

interface DateSelectorProps {
  date: Date | null;
  setDate: Dispatch<SetStateAction<Date | null>>;
  setIsChanged?: (value: boolean) => void;
}

export default function DateSelector({
  date,
  setDate,
  setIsChanged,
}: DateSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date !== null ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? date : undefined}
          onSelect={(date) => {
            setDate(date ? date : null);
            setIsChanged?.(true);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
