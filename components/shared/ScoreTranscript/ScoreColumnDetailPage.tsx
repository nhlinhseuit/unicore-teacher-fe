"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { mockPostDataGradingDetail } from "@/mocks";
import { PostDataGradingDetailItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RenderFile from "../Annoucements/RenderFile";
import BackToPrev from "../BackToPrev";
import BorderContainer from "../BorderContainer";
import IconButton from "../Button/IconButton";
import SubmitButton from "../Button/SubmitButton";
import PostScoreColumnDetailItem from "./PostScoreColumnDetailItem";

interface Props {
  onClickPrev: () => void;
}

const ScoreColumnDetailPage = (params: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const refData = useRef(mockPostDataGradingDetail);

  const [isPercentageValid, setIsPercentageValid] = useState(true);
  const [totalScore, setTotalScore] = useState(0);
  const [isEditGradeColumn, setIsEditGradeColumn] = useState(false);

  const totalScorePercentage = (data: PostDataGradingDetailItem[]): number => {
    const totalPercentage = data.reduce((total, post) => {
      const percentage = post.scoreDetail["Tỉ lệ điểm"];
      return (
        total +
        (typeof percentage === "number" ? percentage : parseInt(percentage))
      );
    }, 0);

    return totalPercentage;
  };

  // TODO: FORM EDIT

  // Tạo mảng trạng thái tỷ lệ điểm từ dữ liệu mock
  const [scoreRatios, setScoreRatios] = useState(
    mockPostDataGradingDetail.map((item) =>
      item.scoreDetail["Tỉ lệ điểm"].toString()
    )
  );
  const [ratio, setRatio] = useState(100);

  // Hàm xử lý thay đổi tỷ lệ điểm cho từng bài tập
  const handleScoreRatioChange = (index: number, newValue: string) => {
    const updatedRatios = [...scoreRatios];
    updatedRatios[index] = newValue;
    setScoreRatios(updatedRatios);
  };

  const AnnoucementSchema = z
    .object({})
    .refine(
      () => {
        const issues: z.ZodIssue[] = [];
        for (let i = 0; i < scoreRatios.length; i++) {
          if (isNaN(parseInt(scoreRatios[i]))) {
            issues.push({
              code: "custom",
              message: "Tỉ lệ điểm phải là chữ số",
              path: [`scoreRatios.${i}`],
            });
          }
        }
        if (issues.length > 0) {
          throw new z.ZodError(issues); // Ném lỗi với danh sách issue
        }
        return true;
      },
      { message: "Tỉ lệ điểm phải là chữ số" }
    )
    .refine(
      () => {
        const issues: z.ZodIssue[] = [];
        for (let i = 0; i < scoreRatios.length; i++) {
          const ratio = parseInt(scoreRatios[i]);
          if (isNaN(ratio) || ratio < 0 || ratio > 100) {
            issues.push({
              code: "custom",
              message:
                "Tỉ lệ điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100",
              path: [`scoreRatios.${i}`],
            });
          }
        }
        if (issues.length > 0) {
          throw new z.ZodError(issues); // Ném lỗi với danh sách issue
        }
        return true;
      },
      {
        message: "Tỉ lệ điểm phải lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 100",
      }
    );

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      scoreRatios,
    },
  });

  const { reset } = form;

  async function onSubmit(values: any) {
    try {
      console.log({
        ratios: scoreRatios,
      });

      const res = scoreRatios.reduce((sum, ratio) => sum + parseInt(ratio), 0);
      if (res !== 100) {
        setRatio(res);
        return;
      }

      // naviate to home page
      // router.push("/");

      toast({
        title: "Chỉnh sửa hệ số điểm thành công.",
        variant: "success",
        duration: 3000,
      });

      setRatio(100);
      setIsEditGradeColumn(false);
    } catch {
    } finally {
    }
  }

  return (
    <>
      <BackToPrev text="Quay lại Bảng điểm" onClickPrev={params.onClickPrev} />

      <div className="flex justify-between mb-6">
        <div className="ml-4 flex gap-4 items-center">
          <p className="paragraph-semibold">
            Chi tiết cột điểm Quá trình - Sinh viên Nguyễn Hoàng Linh - MSSV
            21522289
          </p>
          {isEdit ? (
            <IconButton
              text="Lưu"
              onClick={() => {
                if (totalScorePercentage(refData.current) !== 100) {
                  setTotalScore(totalScorePercentage(refData.current));
                  setIsPercentageValid(false);
                  return;
                }

                // ? Gọi API với ref.current data
                setIsEdit(false);
                setIsPercentageValid(true);
              }}
            />
          ) : (
            <div className="flex gap-2">
              <IconButton
                text="Sửa điểm bài làm"
                onClick={() => {
                  setIsEdit(true);
                }}
              />
              <IconButton
                text="Chỉnh sửa hệ số cột điểm"
                blue
                onClick={() => {
                  setIsEditGradeColumn(true);
                }}
              />
            </div>
          )}
          {isPercentageValid ? (
            <></>
          ) : (
            <p className="text-[0.8rem] font-medium dark:text-red-900 text-red-500">
              * Tổng tỉ lệ điểm các bài tập không bằng 100% ({totalScore}%)
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {mockPostDataGradingDetail.map((item, index) => (
          <PostScoreColumnDetailItem
            key={item.id}
            postScoreDetail={item}
            setGrading={() => {
              // setIsGrading(true);
            }}
            isEdit={isEdit}
            savePostScoreDetail={(
              newPostScoreDetailItem: PostDataGradingDetailItem
            ) => {
              refData.current = mockPostDataGradingDetail.map((item) => {
                if (item.id === newPostScoreDetailItem.id)
                  return newPostScoreDetailItem;
                else return item;
              });
            }}
          />
        ))}
      </div>

      {/* EDIT GRADE COLUMN */}
      <AlertDialog open={isEditGradeColumn}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Chỉnh sửa hệ số điểm quá trình
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                {mockPostDataGradingDetail.map((item, index) => (
                  <BorderContainer key={item.id}>
                    <div className="relative flex-col w-full p-6">
                      <div className=" mt-3 ml-2 flex gap-4 items-center">
                        <p className="base-regular">{item.title}</p>
                        <Dropdown
                          className="z-30 rounded-lg"
                          label=""
                          renderTrigger={() => (
                            <Image
                              src={"/assets/icons/info.svg"}
                              width={18}
                              height={18}
                              alt={"edit"}
                              className={`object-contain cursor-pointer`}
                            />
                          )}
                        >
                          <Dropdown.Header>
                            <span className="block text-sm font-medium text-center truncate">
                              Thông tin
                            </span>
                          </Dropdown.Header>
                          <div className="scroll-container scroll-container-dropdown-content">
                            <ul>
                              <li role="menuitem">
                                <button
                                  type="button"
                                  className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                                >
                                  <span className="font-semibold">
                                    Thời hạn nộp bài:
                                  </span>
                                  <span>
                                    {" "}
                                    12h SA 8/11/2024 - 11h30 SA 15/11/2024
                                  </span>
                                </button>
                              </li>
                              <li role="menuitem">
                                <button
                                  type="button"
                                  className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                                >
                                  <span className="font-semibold">
                                    Thời hạn nộp trễ:
                                  </span>
                                  <span>
                                    12h SA 8/11/2024 - 11h30 SA 15/11/2024
                                  </span>
                                </button>
                              </li>
                              <li role="menuitem">
                                <button
                                  type="button"
                                  className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-700 cursor-default dark:text-gray-200 "
                                >
                                  <span className="font-semibold">
                                    Thời hạn đóng bài nộp:
                                  </span>
                                  <span>12h SA 16/11/2024</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </Dropdown>
                      </div>

                      <RenderFile
                        _id={1}
                        name={"exercise.docx"}
                        otherClasses={"mt-2 px-2"}
                      />
                    </div>

                    <FormField
                      key={item.id}
                      control={form.control}
                      // @ts-ignore
                      name={`scoreRatios.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col px-6 pt-2 pb-4">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            {item.title} - Tỉ lệ điểm (%)
                          </FormLabel>
                          <FormControl className="mt-3.5">
                            <Input
                              value={scoreRatios[index]} // Giá trị từ state
                              onChange={
                                (e) =>
                                  handleScoreRatioChange(index, e.target.value) // Cập nhật state
                              }
                              placeholder="Nhập tỉ lệ điểm..."
                              className="
              no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </BorderContainer>
                ))}

                <div className="items-center relative flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                  {ratio !== 100 ? (
                    <p className="text-[0.8rem] font-medium dark:text-red-900 text-red-500">
                      Tổng phần trăm các hệ số phải là 100% ({ratio}%)
                    </p>
                  ) : null}
                  <IconButton
                    cancel
                    text={"Hủy"}
                    onClick={() => {
                      setIsEditGradeColumn(false);
                    }}
                  />
                  <SubmitButton text={"Đồng ý"} />
                </div>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ScoreColumnDetailPage;
