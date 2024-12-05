"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selectedTime: string;
  setSelectTime: (time: string) => void;
};

// Tạo mảng các options thời gian
const timeOptions = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minute = (i % 4) * 10;
  const ampm = hour < 12 ? "SA" : "CH";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const displayMinute =
    minute === 0 ? "00" : minute.toString().padStart(2, "0");
  return `${displayHour}:${displayMinute} ${ampm}`;
});

function TimeCalendar({
  selectedTime,
  setSelectTime,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="flex space-x-2">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-slate-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-slate-400",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md"
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_start: "day-range-start",
          day_range_end: "day-range-end",
          day_selected:
            "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
          day_today:
            "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
          day_outside:
            "day-outside text-slate-500 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
          day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
          day_range_middle:
            "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
        }}
        {...props}
      />

      {/* Time Picker Component */}
      <div className=" p-3 flex flex-col gap-4 w-24 overflow-y-auto max-h-[300px]">
        <div
          className="pt-1 text-sm font-medium text-center border-b-[1px] light-border-2"
          aria-live="polite"
          role="presentation"
          id="react-day-picker-171"
        >
          Thời gian
        </div>

        <div className="scroll-container scroll-container-time-content flex flex-col gap-1">
          {timeOptions.map((time) => (
            <button
              key={time}
              className={cn(
                "px-2 py-1 text-[12px] text-center rounded-md whitespace-nowrap",
                time === selectedTime
                  ? "bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900"
                  : "hover:bg-slate-200 dark:hover:bg-slate-700"
              )}
              onClick={() => setSelectTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

TimeCalendar.displayName = "TimeCalendar";

export { TimeCalendar };
