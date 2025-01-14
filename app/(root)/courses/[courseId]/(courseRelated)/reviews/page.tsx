"use client";

import GradingReviewTable from "@/components/shared/Table/TableReview/GradingReviewTable";
import { useEffect, useState } from "react";

import PostReviewScoreItem from "@/components/shared/Table/TableReview/PostReviewScoreItem";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import NoResult from "@/components/shared/Status/NoResult";
import InputComponent from "@/components/shared/Table/components/InputComponent";
import TableSkeleton from "@/components/shared/Table/components/TableSkeleton";
import TextAreaComponent from "@/components/shared/TextAreaComponent";
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
import { ReviewOptions } from "@/constants";
import { toast } from "@/hooks/use-toast";
import {
  declineAReview,
  fetchReviewsInClass,
  gradeAReview,
} from "@/services/reviewServices";
import {
  convertReviewToPostData,
  convertToDataTableReviewsViKeys,
  IReviewResponseData,
} from "@/types/entity/Review";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Review = () => {
  const [
    selectedReviewViewDetailGradeColumn,
    setSelectedReviewViewDetailGradeColumn,
  ] = useState("");

  const [isReview, setIsReview] = useState(-1);
  const [selectedReviewOption, setSelectedReviewOption] = useState("");

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [reason, setReason] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<IReviewResponseData[]>([]);
  let tableData;

  const params = {
    class_id: "677cd4ae0a706479b8773770",
    subclass_code: "SE113.O21.PMCL",
  };

  useEffect(() => {
    fetchReviewsInClass(params)
      .then((data: IReviewResponseData[]) => {
        console.log("fetchReviewsInClass", data);

        setReviews(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

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

  const getReview = () => {
    return reviews[parseInt(selectedReviewViewDetailGradeColumn) - 1];
  };

  const getReviewByStatus = () => {
    if (selectedReviewOption === "")
      return convertToDataTableReviewsViKeys(reviews);
    return convertToDataTableReviewsViKeys(reviews).filter(
      (item) => item.data["Trạng thái"] === selectedReviewOption
    );
  };

  async function onSubmit(values: any) {
    try {
      console.log({
        score: score,
        feedback: feedback,
        reason: reason,
      });

      if (isReview === 1) {
        const params = {
          grade: score,
          feedback: feedback,
        };

        gradeAReview(getReview().id, params).then((data) => {
          console.log("gradeAReview", data);

          toast({
            title: "Phúc khảo bài làm thành công.",
            variant: "success",
            duration: 3000,
          });
        });
      } else if (isReview === 2) {
        declineAReview(getReview().id).then((data) => {
          console.log("declineAReview", data);

          toast({
            title: "Từ chối phúc khảo bài làm thành công.",
            variant: "success",
            duration: 3000,
          });
        });
      }
    } catch {
    } finally {
      setIsReview(-1);
      setSelectedReviewViewDetailGradeColumn("");
      setScore("");
      setFeedback("");
      setReason("");
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
                  selectedReviewOption !== ""
                    ? selectedReviewOption
                    : "Chọn bộ lọc"
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
          <div className="scroll-container scroll-container-dropdown-content">
            {ReviewOptions.map((course: any, index) => (
              <Dropdown.Item
                key={`${course}_${index}`}
                onClick={() => {
                  if (selectedReviewOption === course.value) {
                    setSelectedReviewOption("");
                  } else {
                    setSelectedReviewOption(course.value);
                  }
                }}
              >
                <div className="flex justify-between w-full gap-4">
                  <p className="text-left line-clamp-1">{course.value}</p>
                  {selectedReviewOption === course.value ? (
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

      {isLoading ? (
        <TableSkeleton />
      ) : reviews && getReviewByStatus().length > 0 ? (
        <GradingReviewTable
          isMultipleDelete={false}
          dataTable={getReviewByStatus()}
          viewDetailGradeColumn={(reviewNumber: string) => {
            setSelectedReviewViewDetailGradeColumn(reviewNumber);
          }}
        />
      ) : (
        <NoResult
          title="Không có dữ liệu!"
          description="Không có đơn phúc khảo nào!"
        />
      )}

      {/* EDIT GRADE COLUMN */}
      <AlertDialog open={selectedReviewViewDetailGradeColumn !== ""}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Phúc khảo bài làm
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogDescription className="text-center text-light-500 body-regular ">
            Sinh viên:{" "}
            {selectedReviewViewDetailGradeColumn !== "" ? (
              <span className="font-semibold">
                {getReview().submitter_name} - {getReview().submitter_id}
              </span>
            ) : null}
          </AlertDialogDescription>

          {selectedReviewViewDetailGradeColumn !== "" ? (
            <PostReviewScoreItem
              postScoreDetail={convertReviewToPostData(getReview())}
              setGrading={() => {
                // setIsGrading(true);
              }}
              isEdit={false}
            />
          ) : null}

          {isReview !== 1 && isReview !== 2 ? (
            <div className="relative flex justify-center gap-2 mt-4">
              <IconButton
                text={"Phúc khảo bài làm"}
                onClick={() => {
                  setIsReview(1);
                }}
              />
              <IconButton
                red
                text={"Từ chối phúc khảo"}
                onClick={() => {
                  setIsReview(2);
                }}
              />
              <IconButton
                cancel
                text={"Hủy"}
                onClick={() => {
                  setSelectedReviewViewDetailGradeColumn("");
                }}
              />
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
                              onChange={(newValue: string | number) => {
                                setFeedback(newValue.toString());
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
                    <SubmitButton text={"Đồng ý"} />
                    <IconButton
                      cancel
                      text={"Hủy"}
                      onClick={() => {
                        setIsReview(-1);
                      }}
                    />
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
                            <TextAreaComponent
                              value={reason}
                              placeholder="Nhập phản hồi..."
                              onChange={(e) => {
                                setReason(e.target.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="relative flex justify-center gap-2 mt-4">
                    <SubmitButton text={"Đồng ý"} />
                    <IconButton
                      cancel
                      text={"Hủy"}
                      onClick={() => {
                        setIsReview(-1);
                      }}
                    />
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
