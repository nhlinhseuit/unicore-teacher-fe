"use client";

import React, { useState } from "react";
import ReportInfo from "./ReportInfo";
import BackToPrev from "@/components/shared/BackToPrev";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import { useToast } from "@/hooks/use-toast";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILE_VALUE } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateReport = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const pathName = usePathname();

  const steps = [
    { id: 1, title: "Bước 1", desc: "Thêm lịch báo cáo" },
    { id: 2, title: "Bước 2", desc: "Thông tin báo cáo đồ án" },
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };
  const goToPrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };


  // TODO: Report Info vars


  const AnnoucementSchema = z
    .object({
      title: z
        .string()
        .min(5, { message: "Tiêu đề phải chứa ít nhất 5 ký tự" })
        .max(130),
      description: z
        .string()
        .min(20, { message: "Nội dung thông báo phải chứa ít nhất 20 ký tự" }),
      file: z.any(),
      dateSubmit: z.date().optional(),
      datePost: z.date().optional(),
      dateRemindGrade: z.date().optional(),
      dateClose: z.date().optional(),
      multipleCourses: z.number().optional(),
      groupOption: z.any().optional(),
      submitOption: z.any().optional(),
      gradeColumn: z.any().optional(),
      teacherGrading: z.any().optional(),
      date: z.date().optional(),
      maxRecheck: z.number().optional(),
    })
    .refine(
      (data) =>
        selectedFiles.every(
          (file) =>
            ALLOWED_FILE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
        ),
      {
        message: `File không hợp lệ hoặc vượt quá ${MAX_FILE_VALUE}MB.`,
        path: ["file"],
      }
    )
    .refine(
      (data) =>
        selectedScheduleOption === 2 ? !(datePost === undefined) : true,

      {
        message: "Bạn phải chọn lịch đăng thông báo",
        path: ["datePost"],
      }
    )


    // .refine(
    //   (data) =>
    //     !(
    //       dateStart === undefined ||
    //       timeStart === "" ||
    //       dateEnd === undefined ||
    //       timeEnd === ""
    //     ),
    //   {
    //     message: "Bạn phải chọn thời gian bắt đầu và kết thúc (ngày & giờ)",
    //     path: ["dateSubmit"],
    //   }
    // )
    // .refine((data) => !(dateClose === undefined || timeClose === ""), {
    //   message: "Bạn phải chọn thời gian đóng (ngày & giờ)",
    //   path: ["dateClose"],
    // })

    .refine((data) => selectedSubmitOption.length > 0, {
      message: "Bạn phải chọn hình thức nộp bài",
      path: ["submitOption"],
    })
    .refine((data) => selectedGradeColumn !== -1, {
      message: "Bạn phải chọn cột điểm cho báo cáo",
      path: ["gradeColumn"],
    })
    .refine(
      (data) =>
        selectedRecheckOption === 2
          ? numberOfRecheck !== "" && !isNaN(parseInt(numberOfRecheck))
          : true,
      {
        message: "Số lần tối đa phải là chữ số và không được để trống",
        path: ["maxRecheck"],
      }
    )
    .refine(
      (data) =>
        selectedRecheckOption === 2 ? parseInt(numberOfRecheck) > 0 : true,
      {
        message: "Số phải lớn hơn 0",
        path: ["maxRecheck"],
      }
    );

  const { toast } = useToast();
  const methods = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      submitOption: undefined,
      date: undefined,
    },
  });

    // TRUYỀN HẾT TẤT CẢ BIẾN NÀY QUA REPORT INFO, ĐỂ REPORT INFO SỬ DỤNG ĐỀU LÀ THAM CHIẾU CỦA COMPONENT CHA
    // NẾU MUỐN NÚT SUBMIT Ở BÊN COMPONENT CHA => TRUYỀN TẤT CẢ BIẾN QUA + TRUYỀN HANDLE SUBMIT QUA USEFORMCONTEXT
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedGradeColumn, setSelectedGradeColumn] = useState<number>(-1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedScheduleOption, setSelectedScheduleOption] = useState(1);
  const [selectedRecheckOption, setSelectedRecheckOption] = useState(1);
  const [numberOfRecheck, setNumberOfRecheck] = useState<string>("");
  const [datePost, setDatePost] = React.useState<Date>();
  const [selectedSubmitOption, setSelectedSubmitOption] = useState([1]);
  const [selectedGroupOption, setSelectedGroupOption] = useState(1);
  const [selectedCheckAttendance, setSelectedCheckAttendance] = useState(1);
  const [selectedSubmitType, setSelectedSubmitType] = useState(1);

  async function onSubmit(values: any) {
    setIsSubmitting(true);
    //! CLICK NỨT SUBNIT Ở CHA THÌ VALIDATE Ở CON
    // SAU KHI MOVE ONSUBMIT RA NGOÀI
    //? HOẶC CÁCH KHÁC LÀ CHA CLICK NÚT ĐĂNG VÀ THẰNG CON CHẠY SUBMIT (KH CẦN TRUYỀN VÀO CON)

    try {
      // make an async call to your API -> create a question
      // contain all form data

      console.log({
        title: values.title,
        description: values.description,
        file: selectedFiles,
        target: selectedGradeColumn,
        path: pathName,
      });

      // naviate to home page
      router.push("/");

      toast({
        title: "Tạo thông báo thành công.",
        description: `Thông báo đã được gửi đến lớp ${
          selectedCourses.length > 0
            ? `và các lớp ${selectedCourses.join(", ")}`
            : ""
        }`,
        variant: "success",
        duration: 3000,
      });
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex gap-4 items-center relative">
        <BackToPrev
          text={"Quay lại danh sách thông báo"}
          onClickPrev={handleClick}
        />

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Icon Step và Title */}
              <div
                className={`w-8 h-8 ml-4 flex items-center justify-center rounded-full ${
                  currentStep > step.id
                    ? "bg-blue-500 text-blue-500" // Màu nền và màu chữ cho bước hoàn thành
                    : currentStep === step.id
                    ? "bg-blue-500 text-white" // Màu nền cho bước hiện tại
                    : "bg-gray-200 text-gray-500" // Màu nền cho bước chưa hoàn thành
                }`}
              >
                {currentStep > step.id ? (
                  <Image
                    src="/assets/icons/check-white.svg"
                    alt="check icon"
                    width={14}
                    height={14}
                    className="cursor-pointer"
                  />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Tiêu đề và mô tả bên cạnh */}
              <div className="ml-4 flex flex-col pr-4">
                <span className="text-sm font-medium">{step.desc}</span>
                {/* <span className="text-xs text-gray-500">{step.desc}</span> */}
              </div>

              {/* Divider */}
              {index < steps.length - 1 && (
                <div
                  className={`h-[3px] ${
                    currentStep > step.id ? "bg-blue-500" : "bg-gray-200"
                  }`}
                  style={{ width: "200px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Step Content */}
        <>
          {currentStep === 1 && (
            <div>
              <h2 className="text-lg font-semibold">Nội dung Bước 2</h2>
              <p>Đây là nội dung của bước 2.</p>

              <IconButton
                text="Tiếp tục"
                onClick={goToNextStep}
                otherClasses="bg-blue-500 "
              />
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <FormProvider {...methods}>
                <div>
                  <ReportInfo
                     onSubmit={methods.handleSubmit(onSubmit)}
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    selectedGradeColumn={selectedGradeColumn}
                    setSelectedGradeColumn={setSelectedGradeColumn}
                    selectedCourses={selectedCourses}
                    setSelectedCourses={setSelectedCourses}
                  />
                  <div className="flex mt-12 gap-2">
                    <IconButton
                      text="Quay về trước"
                      onClick={goToPrevStep}
                      otherClasses="bg-blue-500 "
                    />
                    <SubmitButton text="Đăng" otherClasses="w-fit" onClick={methods.handleSubmit(onSubmit)}/>
                    <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
                    <IconButton
                      text="Hủy"
                      red
                      otherClasses="w-fit"
                      onClick={handleClick}
                    />
                  </div>
                </div>
              </FormProvider>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CreateReport;
