"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight, type LucideProps } from "lucide-react";
import { cn } from "./utils";

// If you prefer not to import LucideProps, you can instead use:
// type LucideProps = React.SVGProps<SVGSVGElement>;

export type CalendarProps = Omit<DayPickerProps, "mode"> & {
  className?: string;
};

export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      /* Some RDP versions don't declare IconLeft/IconRight in the
         CustomComponents type, even though the props work at runtime.
         We cast to `any` to satisfy TS and keep the icons. */
      components={
        {
          IconLeft: (iconProps: LucideProps) => (
            <ChevronLeft className="h-4 w-4" {...iconProps} />
          ),
          IconRight: (iconProps: LucideProps) => (
            <ChevronRight className="h-4 w-4" {...iconProps} />
          ),
        } as any
      }
      {...props}
    />
  );
}

export default Calendar;

