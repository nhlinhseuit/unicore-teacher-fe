"use client";

import TimeReportComponent from "@/app/(root)/courses/[courseId]/(courseRelated)/create-report/TimeReportComponent";
import BorderContainer from "@/components/shared/BorderContainer";
import MiniButton from "@/components/shared/Button/MiniButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import { Button } from "@/components/ui/button";
import { TimeCalendar } from "@/components/ui/custom-time-calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReportDataOption } from "@/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  sDateEnd,
  sDateStart,
  sReportOptions,
  sSelectedSettingOption,
  sTimeEnd,
  sTimeStart,
} from "./(store)/createReportStore";

// ! CẬP NHẬT
const type: any = "create";

const ReportSchedule = () => {
  // ! Trong store signify, biến Date không khởi tạo được undefince mà phải sd new Date()
  // ! Nên check khác newDate()

  function isDateApproxEqual(
    date: Date,
    thresholdInSeconds: number = 30
  ): boolean {
    const now = new Date();
    const diffInMilliseconds = Math.abs(now.getTime() - date.getTime());
    return diffInMilliseconds <= thresholdInSeconds * 1000;
  }

  const getDisplayText = (date: any, time: any) => {
    return isDateApproxEqual(date) !== isDateApproxEqual(new Date())
      ? `${format(date, "dd/MM/yyyy")} - ${time !== "" ? time : "Giờ"}`
      : "Chọn ngày & giờ";
  };

  // ! BIẾN CHO CÁC TRƯỜNG DATA SETTING
  // const [dateStart, setDateStart] = React.useState<Date>();
  // const [timeStart, setTimeStart] = React.useState("");

  // const [dateEnd, setDateEnd] = React.useState<Date>();
  // const [timeEnd, setTimeEnd] = React.useState("");

  // const [selectedSettingOption, setSelectedSettingOption] = useState([1]);

  // ! BIẾN CHO COMPONENT CON

  // const [reportOptions, setReportOptions] = useState<ReportDataOption[]>([
  //   { dateSchedule: undefined, timeSchedule: "", value: 1 },
  //   { dateSchedule: undefined, timeSchedule: "", value: 2 },
  //   { dateSchedule: undefined, timeSchedule: "", value: 3 },
  // ]);

  // ! BIẾN GỘP TỪ STORE
  const reportOptions = sReportOptions.use();
  const dateStart = sDateStart.use();
  const timeStart = sTimeStart.use();
  const dateEnd = sDateEnd.use();
  const timeEnd = sTimeEnd.use();
  const selectedSettingOption = sSelectedSettingOption.use();

  const handleAddReport = () => {
    sReportOptions.set([
      ...reportOptions,
      {
        id: reportOptions.length + 1,
        dateSchedule: undefined,
        timeSchedule: "",
        value: 1,
      },
    ]);
  };

  const handleUpdateReport = (
    index: number,
    updatedData: Partial<ReportDataOption>
  ) => {
    const newReports = reportOptions.map((report, i) =>
      i === index ? { ...report, ...updatedData } : report
    );
    sReportOptions.set(newReports);
  };

  const handleRemoveReport = (index: number) => {
    sReportOptions.set(reportOptions.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* <sReportOptions.DevTool name="sReportOptions" /> */}

      <div className="flex-1 mt-10">
        <div className="flex px-6 gap-12">
          {/* //TODO: SECTION 1 */}

          <div className="flex w-[55%] flex-col gap-10">
            {/* Đăng ký thứ tự báo cáo */}
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                Đăng ký thứ tự báo cáo
              </label>

              <p className="text-[0.8rem] dark:text-slate-400 body-regular mt-2.5 text-light-500">
                Tạo các lựa chọn thời gian báo cáo và số lượng câu trả lời cho
                mỗi lựa chọn.
              </p>

              <BorderContainer otherClasses="mt-3.5">
                <div className="p-4">
                  {/* //TODO */}
                  {reportOptions.map((report, index) => (
                    <div key={index} className="mb-4">
                      <TimeReportComponent
                        id={index + 1}
                        dateSchedule={report.dateSchedule}
                        timeSchedule={report.timeSchedule}
                        value={report.value}
                        onDateChange={(date) =>
                          handleUpdateReport(index, {
                            dateSchedule: date,
                          })
                        }
                        onTimeChange={(time) =>
                          handleUpdateReport(index, {
                            timeSchedule: time,
                          })
                        }
                        onValueIncrement={() =>
                          handleUpdateReport(index, {
                            value: report.value + 1,
                          })
                        }
                        onValueDecrement={() => {
                          if (report.value > 1) {
                            handleUpdateReport(index, {
                              value: report.value - 1,
                            });
                          }
                        }}
                        onRemove={() => handleRemoveReport(index)}
                      />
                    </div>
                  ))}
                  {/* <button
                              onClick={handleAddReport}
                              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >
                              Thêm mới
                            </button> */}
                  <div className="flex-center">
                    <MiniButton
                      key={1}
                      value={1}
                      icon={"/assets/icons/add.svg"}
                      bgColor="bg-primary-500"
                      onClick={handleAddReport}
                      otherClasses={"!w-[25px] !h-[25px]"}
                    />
                  </div>

                  {/* <TimeReportComponent /> */}
                </div>
              </BorderContainer>
            </div>
          </div>

          {/* //TODO: SECTION 2 */}

          <div className="flex w-[45%] flex-col gap-10">
            {/* Thời hạn */}
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                Thời gian mở đăng ký báo cáo
              </label>
              <div className="mt-3.5 flex gap-2 items-center">
                <div className="w-[48%]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full flex items-center text-center font-normal ${
                          !dateStart && "text-muted-foreground"
                        } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                      >
                        <span
                          className={`flex-grow text-center ${
                            !dateStart && "text-muted-foreground"
                          }`}
                        >
                          {getDisplayText(dateStart, timeStart)}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <TimeCalendar
                        mode="single"
                        selected={dateStart}
                        onSelect={(date) => sDateStart.set(date)}
                        selectedTime={timeStart}
                        setSelectTime={(time) => {
                          sTimeStart.set(time);
                        }}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <span> - </span>

                <div className="w-[48%]">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full flex items-center text-center font-normal ${
                          !dateEnd && "text-muted-foreground"
                        } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                      >
                        <span
                          className={`flex-grow text-center ${
                            !dateEnd && "text-muted-foreground"
                          }`}
                        >
                          {getDisplayText(dateEnd, timeEnd)}
                        </span>
                        <CalendarIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <TimeCalendar
                        mode="single"
                        selected={dateEnd}
                        onSelect={(date) => sDateEnd.set(date)}
                        selectedTime={timeEnd}
                        setSelectTime={(time) => sTimeEnd.set(time)}
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Cài đặt đăng ký lịch báo cáo */}
            <div>
              <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                Cài đặt đăng ký lịch báo cáo
              </label>
              <BorderContainer otherClasses="mt-3.5">
                <div className="p-4 flex flex-col gap-10">
                  <div className="inline-flex">
                    <CheckboxComponent
                      handleClick={() => {
                        if (!selectedSettingOption.includes(1)) {
                          sSelectedSettingOption.set([
                            ...selectedSettingOption,
                            1,
                          ]);
                        } else {
                          sSelectedSettingOption.set(
                            selectedSettingOption.filter((item) => item !== 1)
                          );
                        }
                      }}
                      value={selectedSettingOption.includes(1)}
                      text="Cho phép chọn nhiều phương án"
                    />
                  </div>
                  <div className="inline-flex">
                    <CheckboxComponent
                      handleClick={() => {
                        if (!selectedSettingOption.includes(2)) {
                          sSelectedSettingOption.set([
                            ...selectedSettingOption,
                            2,
                          ]);
                        } else {
                          sSelectedSettingOption.set(
                            selectedSettingOption.filter((item) => item !== 2)
                          );
                        }
                      }}
                      value={selectedSettingOption.includes(2)}
                      text="Cho phép cập nhật lựa chọn"
                    />
                  </div>
                </div>
              </BorderContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSchedule;
