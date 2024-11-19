"use client";

import { Button } from "@/components/ui/button";
import { TimeCalendar } from "@/components/ui/custom-time-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import CustomNumberInput from "./CustomNumberInput";

interface Props {
  id: number;
  dateSchedule: Date | undefined;
  timeSchedule: string;
  value: number;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  onValueIncrement: () => void;
  onValueDecrement: () => void;
  onRemove: () => void;
}

const TimeReportComponent = ({
  id,
  dateSchedule,
  timeSchedule,
  value,
  onDateChange,
  onTimeChange,
  onValueIncrement,
  onValueDecrement,
  onRemove,
}: Props) => {
  const getDisplayText = (date: any, time: any) => {
    return date
      ? `${format(date, "dd/MM/yyyy")} - ${time !== "" ? time : "Giờ"}`
      : "Chọn ngày & giờ";
  };

  // const [dateSchedule, setDateSchedule] = React.useState<Date>();
  // const [timeSchedule, setTimeSchedule] = React.useState("");

  // const [value, setValue] = useState(1);

  // const handleIncrement = () => setValue(value + 1); // Tăng giá trị
  // const handleDecrement = () => {
  //   if (value > 1) setValue(value - 1); // Giảm giá trị nhưng không nhỏ hơn 1
  // };

  return (
    <>
      <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-medium leading-[20.8px]">
        Lựa chọn {id}
      </label>

      <div className="mt-3 flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full flex items-center text-center font-normal  hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
            >
              <span
                className={`flex-grow text-center ${
                  !dateSchedule && "text-muted-foreground"
                }`}
              >
                {getDisplayText(dateSchedule, timeSchedule)}
              </span>
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <TimeCalendar
              mode="single"
              selected={dateSchedule}
              onSelect={onDateChange}
              selectedTime={timeSchedule}
              setSelectTime={onTimeChange}
              initialFocus
              locale={vi}
            />
          </PopoverContent>
        </Popover>

        <CustomNumberInput
          value={value}
          onIncrement={onValueIncrement}
          onDecrement={onValueDecrement}
        />
      </div>
    </>
  );
};

export default TimeReportComponent;
