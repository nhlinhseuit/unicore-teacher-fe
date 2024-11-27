"use client";

import IconButton from "@/components/shared/Button/IconButton";
import ScoreColumnDetailPage from "@/components/shared/ScoreTranscript/ScoreColumnDetailPage";
import TableSearch from "@/components/shared/Search/TableSearch";
import ScoreTranscriptTable from "@/components/shared/Table/TableScoreTranscript/ScoreTranscriptTable";
import {
  mockDataScoreTranscript,
  mockGradeColumnPercent,
  mockSubCoursesOfCourseScoreTranscript,
} from "@/mocks";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";

const ScoreTranscript = () => {
  const [selectedCourse, setSelectedCourse] = useState(-1);
  const [isEditTable, setIsEditTable] = useState(false);
  // const [isEditGradeColumn, setIsEditGradeColumn] = useState(false);
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] = useState(false);

  // const [scoreProgress, setScoreProgress] = useState<string>(
  //   mockGradeColumnPercent["Quá trình"].toString()
  // );
  // const handleChangeNumberOfScoreProgress = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setScoreProgress(e.target.value);
  // };

  // const [scoreMidterm, setScoreMidterm] = useState<string>(
  //   mockGradeColumnPercent["Giữa kỳ"].toString()
  // );
  // const handleChangeNumberOfScoreMidterm = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setScoreMidterm(e.target.value);
  // };

  // const [scoreFinal, setScoreFinal] = useState<string>(
  //   mockGradeColumnPercent["Cuối kỳ"].toString()
  // );
  // const handleChangeNumberOfScoreFinal = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setScoreFinal(e.target.value);
  // };

  // const AnnoucementSchema = z
  //   .object({
  //     progress: z.number().optional(),
  //     midterm: z.number().optional(),
  //     final: z.number().optional(),
  //   })
  //   .refine((data) => !isNaN(parseInt(scoreProgress)), {
  //     message: "Hệ số điểm phải là chữ số",
  //     path: ["progress"],
  //   })
  //   .refine(
  //     (data) => parseInt(scoreProgress) >= 0 && parseInt(scoreProgress) <= 100,
  //     {
  //       message: "Hệ số điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100",
  //       path: ["progress"],
  //     }
  //   )
  //   //
  //   .refine((data) => !isNaN(parseInt(scoreMidterm)), {
  //     message: "Hệ số điểm phải là chữ số",
  //     path: ["midterm"],
  //   })
  //   .refine(
  //     (data) => parseInt(scoreMidterm) >= 0 && parseInt(scoreMidterm) <= 100,
  //     {
  //       message: "Hệ số điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100",
  //       path: ["midterm"],
  //     }
  //   )
  //   //
  //   .refine((data) => !isNaN(parseInt(scoreFinal)), {
  //     message: "Hệ số điểm phải là chữ số",
  //     path: ["final"],
  //   })
  //   .refine(
  //     (data) => parseInt(scoreFinal) >= 0 && parseInt(scoreFinal) <= 100,
  //     {
  //       message: "Hệ số điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100",
  //       path: ["final"],
  //     }
  //   )
  //   //
  //   .refine(
  //     (data) =>
  //       parseInt(scoreProgress) +
  //       parseInt(scoreMidterm) +
  //       parseInt(scoreFinal) ===
  //       100,
  //     {
  //       message: "Tổng phần trăm các hệ số phải là 100%",
  //       path: ["final"],
  //     }
  //   );

  // const form = useForm<z.infer<typeof AnnoucementSchema>>({
  //   resolver: zodResolver(AnnoucementSchema),
  //   defaultValues: {
  //     progress: mockGradeColumnPercent["Quá trình"],
  //     midterm: mockGradeColumnPercent["Giữa kỳ"],
  //     final: mockGradeColumnPercent["Cuối kỳ"],
  //   },
  // });

  // const { reset } = form;

  // async function onSubmit(values: any) {
  //   try {
  //     console.log({
  //       progress: values.progress,
  //       midterm: values.midterm,
  //       final: values.final,
  //     });

  //     // naviate to home page
  //     // router.push("/");

  //     toast({
  //       title: "Đăng đề tài mới thành công.",
  //       variant: "success",
  //       duration: 3000,
  //     });

  //     setIsEditGradeColumn(false);
  //   } catch {
  //   } finally {
  //   }
  // }

  return (
    <>
      {isViewDetailGradeColumn ? (
        <ScoreColumnDetailPage
          onClickPrev={() => {
            setIsViewDetailGradeColumn(false);
          }}
        />
      ) : (
        <>
          <div
            className="
          mt-6 mb-10 flex justify-between items-center w-full gap-6 sm:flex-row sm:items-center"
          >
            {/* Search & Filter */}
            <div className="flex justify-start ml-10 w-1/2 items-center gap-4">
              {/* //!: API tên lớp */}
              <p className="inline-flex justify-start text-sm whitespace-nowrap">
                Xem bảng điểm của lớp:
                <span className="ml-2 font-semibold">
                  Nhập môn ứng dụng di động
                </span>
              </p>

              <Dropdown
                className="z-30 rounded-lg"
                label=""
                dismissOnClick={true}
                renderTrigger={() => (
                  <div>
                    <IconButton
                      text={`${selectedCourse !== -1
                          ? mockSubCoursesOfCourseScoreTranscript[
                            selectedCourse - 1
                          ].value
                          : "Chọn lớp"
                        }`}
                      onClick={() => { }}
                      iconRight={"/assets/icons/chevron-down.svg"}
                      bgColor="bg-white"
                      textColor="text-black"
                      otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                    />
                  </div>
                )}
              >
                <TableSearch
                  setSearchTerm={() => { }}
                  searchTerm={""}
                  otherClasses="p-2"
                />
                <div className="scroll-container scroll-container-dropdown-content">
                  {mockSubCoursesOfCourseScoreTranscript.map(
                    (course: any, index) => (
                      <Dropdown.Item
                        key={`${course}_${index}`}
                        onClick={() => {
                          if (selectedCourse === course.id) {
                            setSelectedCourse(-1);
                          } else {
                            setSelectedCourse(course.id);
                          }
                        }}
                      >
                        <div className="flex justify-between w-full gap-4">
                          <p className="text-left line-clamp-1">
                            {course.value}
                          </p>
                          {selectedCourse === course.id ? (
                            <Image
                              src="/assets/icons/check.svg"
                              alt="search"
                              width={21}
                              height={21}
                              className="cursor-pointer mr-2"
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </Dropdown.Item>
                    )
                  )}
                </div>
              </Dropdown>
            </div>

            {/* Create announcement */}
            <div className="flex gap-2">
              {/* <IconButton
                text="Chỉnh sửa hệ số điểm"
                onClick={() => {
                  setIsEditGradeColumn(true);
                }}
              /> */}
              <IconButton text="Xuất file điểm" green />
            </div>
          </div>

          {/* //TODO: BÀI TẬP */}
          <ScoreTranscriptTable
            isEditTable={isEditTable}
            isMultipleDelete={false}
            dataTable={mockDataScoreTranscript}
            dataGradeColumnPercent={mockGradeColumnPercent}
            viewDetailGradeColumn={() => {
              console.log("123123");
              setIsViewDetailGradeColumn(true);
            }}
          />
        </>
      )}

      {/* EDIT GRADE COLUMN */}
      {/*<AlertDialog open={isEditGradeColumn}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Chỉnh sửa hệ số điểm
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="progress"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Điểm quá trình (%)
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          value={scoreProgress}
                          onChange={handleChangeNumberOfScoreProgress}
                          placeholder="Nhập tên đề tài..."
                          className="
                                no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="midterm"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Điểm giữa kỳ (%)
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          value={scoreMidterm}
                          onChange={handleChangeNumberOfScoreMidterm}
                          placeholder="Nhập tên đề tài..."
                          className="
                                no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="final"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Điểm cuối kỳ (%)
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          value={scoreFinal}
                          onChange={handleChangeNumberOfScoreFinal}
                          placeholder="Nhập tên đề tài..."
                          className="
                                no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="relative flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditGradeColumn(false);
                      reset({
                        progress: mockGradeColumnPercent["Quá trình"],
                        midterm: mockGradeColumnPercent["Giữa kỳ"],
                        final: mockGradeColumnPercent["Cuối kỳ"],
                      });
                    }}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
                  >
                    Đồng ý
                  </button>
                </div>
              </div> 
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>*/}
    </>
  );
};

export default ScoreTranscript;
