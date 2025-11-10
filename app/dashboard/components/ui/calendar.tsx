"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import {
  ChevronLeft,
  ChevronRight,
  type LucideProps, // <- use Lucide’s icon props type
} from "lucide-react";

import { cn } from "./utils";

// If you prefer not to import LucideProps, you can do:
// type LucideProps = React.SVGProps<SVGSVGElement>;

export type CalendarProps = Omit<DayPickerProps, "mode"> & {
  className?: string;
};

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      // Provide the two icon renderers with the correct prop type
      components={{
        IconLeft: (iconProps: LucideProps) => (
          <ChevronLeft className="h-4 w-4" {...iconProps} />
        ),
        IconRight: (iconProps: LucideProps) => (
          <ChevronRight className="h-4 w-4" {...iconProps} />
        ),
      }}
      {...props}
    />
  );
}

export default Calendar;

