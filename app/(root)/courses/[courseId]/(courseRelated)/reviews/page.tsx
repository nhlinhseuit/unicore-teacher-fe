"use client";

import GradingReviewTable from "@/components/shared/Table/TableReview/GradingReviewTable";
import {
  mockDataReviewGrading,
  mockPostReviewDetail,
  mockReviewOptions,
} from "@/mocks";
import { useState } from "react";

import PostReviewScoreItem from "@/components/shared/Table/TableReview/PostReviewScoreItem";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import IconButton from "@/components/shared/Button/IconButton";
import TableSearch from "@/components/shared/Search/TableSearch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputComponent from "@/components/shared/Table/components/InputComponent";

const Review = () => {
  const [isViewDetailGradeColumn, setIsViewDetailGradeColumn] = useState(false);
  const [isReview, setIsReview] = useState(-1);
  const [selectedReviewOption, setSelectedReviewOption] = useState(1);

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");

  const AnnoucementSchema = z
    .object({
      score: z.string().optional(),
      feedback: z.string().optional(),
      reason: z.string().optional(),
    })
    .refine(
      (data) =>
        isReview !== 1 || (!isNaN(parseInt(score)) && score.trim() !== ""),
      {
        message: "Điểm phải là chữ số",
        path: ["score"],
      }
    )
    .refine(
      (data) =>
        isReview !== 1 || (parseInt(score) >= 0 && parseInt(score) <= 10),
      {
        message: "Điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 10",
        path: ["score"],
      }
    );

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {},
  });

  const { reset } = form;

  async function onSubmit(values: any) {
    try {
      console.log({
        score: score,
        feedback: feedback,
        reason: reason,
      });

      // naviate to home page
      // router.push("/");

      toast({
        title: "Phúc khảo bài làm thành công.",
        variant: "success",
        duration: 3000,
      });

      setIsReview(-1);
      setIsViewDetailGradeColumn(false);

      // reset({
      // });
    } catch {
    } finally {
    }
  }

  return (
    <>
      <div className="mb-6 flex justify-start ml-10 w-1/2 items-center gap-4">
        <p className="inline-flex justify-start text-sm whitespace-nowrap">
          Bộ lọc
        </p>
        <Dropdown
          className="z-30 rounded-lg"
          label=""
          dismissOnClick={true}
          renderTrigger={() => (
            <div>
              <IconButton
                text={`${
                  selectedReviewOption !== -1
                    ? mockReviewOptions[selectedReviewOption - 1].value
                    : "Chọn lớp"
                }`}
                onClick={() => {}}
                iconRight={"/assets/icons/chevron-down.svg"}
                bgColor="bg-white"
                textColor="text-black"
                border
              />
            </div>
          )}
        >
          <TableSearch
            setSearchTerm={() => {}}
            searchTerm={""}
            otherClasses="p-2"
          />
          <div className="scroll-container scroll-container-dropdown-content">
            {mockReviewOptions.map((course: any, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedReviewOption === course.id) {
                    setSelectedReviewOption(-1);
                  } else {
                    setSelectedReviewOption(course.id);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedReviewOption === course.id ? (
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
            ))}
          </div>
        </Dropdown>
      </div>

      <GradingReviewTable
        isMultipleDelete={false}
        dataTable={mockDataReviewGrading}
        viewDetailGradeColumn={() => {
          setIsViewDetailGradeColumn(true);
        }}
      />

      {/* EDIT GRADE COLUMN */}
      <AlertDialog open={isViewDetailGradeColumn}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Phúc khảo bài làm
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="text-center text-light-500 body-regular ">
            Sinh viên:{" "}
            <span className="font-semibold">Nguyễn Hoàng Linh - 21522289</span>
          </AlertDialogDescription>

          <PostReviewScoreItem
            postScoreDetail={mockPostReviewDetail[0]}
            setGrading={() => {
              // setIsGrading(true);
            }}
            isEdit={false}
          />

          {isReview !== 1 && isReview !== 2 ? (
            <div className="relative flex justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsReview(1);
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
              >
                Phúc khảo bài làm
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsReview(2);
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-[#F02021] text-slate-50 shadow hover:bg-[#F02021]/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
              >
                Từ chối phúc khảo
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsViewDetailGradeColumn(false);
                }}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
              >
                Hủy
              </button>
            </div>
          ) : isReview === 1 ? (
            <div className="mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Điểm */}
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="score"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Điểm phúc khảo{" "}
                            <span className="text-red-600">*</span>
                          </FormLabel>
                          <FormControl className="mt-3.5 ">
                            <Input
                              value={score}
                              onChange={(e) => {
                                setScore(e.target.value);
                              }}
                              placeholder="Nhập điểm..."
                              className="
                                  no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {/* Góp ý */}
                    <FormField
                      control={form.control}
                      name="feedback"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Góp ý
                          </FormLabel>
                          <FormControl className="mt-3.5 ">
                            <InputComponent
                              value={feedback}
                              placeholder="Nhập góp ý..."
                              onChange={() => (newValue: string) => {
                                setFeedback(newValue);
                              }}
                              isDescription
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="relative flex justify-center gap-2 mt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
                    >
                      Đồng ý
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsReview(-1);
                      }}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Điểm */}
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Lí do từ chối phúc khảo
                          </FormLabel>
                          <FormDescription className="body-regular mt-2.5 text-light-500">
                            Không bắt buộc.
                          </FormDescription>

                          <FormControl className="mt-3.5 ">
                            <textarea
                              value={reason}
                              onChange={(e) => {
                                setReason(e.target.value);
                              }}
                              placeholder="Nhập phản hồi..."
                              className="
                                no-focus
                                paragraph-regular
                                background-light900_dark300
                                light-border-2
                                text-dark300_light700
                                min-h-[200px]
                                rounded-md
                                border
                                resize-none
                                w-full
                                px-3
                                py-4
                                focus:outline-none
                                focus:ring-0
                                active:outline-none
                                focus:border-inherit
                                text-sm"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="relative flex justify-center gap-2 mt-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-primary-500 text-slate-50 shadow hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
                    >
                      Đồng ý
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsReview(-1);
                      }}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 px-4 py-2 mt-2 sm:mt-0"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Review;
