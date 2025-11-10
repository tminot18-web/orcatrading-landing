"use client";

import * as React from "react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight, type LucideProps } from "lucide-react";
import { cn } from "./utils";

// Explicitly describe just the icon renderers we use.
// We'll cast when supplying to DayPicker to avoid version/type drift.
type CustomIcon = (props: LucideProps) => React.ReactNode;
type CustomComponents = {
  IconLeft?: CustomIcon;
  IconRight?: CustomIcon;
};

// Omit 'components' (we manage it) and **omit 'required'**
// (RDP’s types don't accept it, even if HTML attrs might).
export type CalendarProps = Omit<DayPickerProps, "components" | "required"> & {
  components?: Partial<CustomComponents>;
};

export function Calendar({
  className,
  components,
  // strip anything named `required` to avoid passing it down
  // (if a parent typed it in their HTML props union)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  required: _required,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      // Some RDP versions don't declare IconLeft/IconRight in the
      // CustomComponents type even though they work at runtime.
      components={
        {
          IconLeft: (iconProps: LucideProps) => (
            <ChevronLeft className="h-4 w-4" {...(iconProps as any)} />
          ),
          IconRight: (iconProps: LucideProps) => (
            <ChevronRight className="h-4 w-4" {...(iconProps as any)} />
          ),
          ...(components as any),
        } as any
      }
      {...(props as any)}
    />
  );
}

