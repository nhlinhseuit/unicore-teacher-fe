import { ReportDataOption } from "@/types";
import { signify } from "react-signify";

// TODO Interface định nghĩa các state của ReportSchedule

export const sReportOptions = signify<ReportDataOption[]>([
  { id: 1, dateSchedule: undefined, timeSchedule: "", value: 1 },
  { id: 2, dateSchedule: undefined, timeSchedule: "", value: 1 },
  { id: 3, dateSchedule: undefined, timeSchedule: "", value: 1 },
]);

export const sDateStart = signify<Date | undefined>(new Date());
export const sTimeStart = signify<string>("");
export const sDateEnd = signify<Date | undefined>(new Date());
export const sTimeEnd = signify<string>("");
export const sSelectedSettingOption = signify<number[]>([1]);


export const sSubmitReportSchedule = signify(false)
export const sCompletedReportSchedule = signify(false)


// TODO Interface định nghĩa các state của ReportSchedule
