"use client";
import RenderCourse from "@/components/courses/RenderCourse";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import PickFileImageButton from "@/components/shared/Annoucements/PickFileImageButton";
import RenderFile from "@/components/shared/Annoucements/RenderFile";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import CheckboxComponent from "@/components/shared/CheckboxComponent";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import TableSearch from "@/components/shared/Search/TableSearch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { TimeCalendar } from "@/components/ui/custom-time-calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILE_VALUE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { mockCoursesList } from "@/mocks";
import {
  createExercise,
  editExercise,
  fetchDetailExercise,
} from "@/services/exerciseServices";
import { fetchCreationVariables } from "@/services/reportServices";
import { ITExerciseResponseData } from "@/types/entity/Exercise";
import { getWeightType } from "@/types/entity/Project";
import {
  ITCreationVariablesWeight,
  ITCreationVariablesWeightData,
} from "@/types/entity/Report";
import {
  formatDayToISO,
  formatDayToISODateWithDefaultTime,
  formatISOToDayDatatype,
  formatISOToTimeCalendarType,
} from "@/utils/dateTimeUtil";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Dropdown } from "flowbite-react";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingComponent from "../LoadingComponent";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

interface Props {
  isEdit?: boolean;
  exerciseId?: string;
}

const CreateExercise = (params: Props) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const gradeColumn = [
    { id: 1, type: "COURSEWORK", value: "Quá trình" },
    { id: 2, type: "PRACTICAL", value: "Thực hành" },
    { id: 3, type: "MIDTERM", value: "Giữa kỳ" },
    { id: 4, type: "FINAL_TERM", value: "Cuối kỳ" },
  ];

  //? API: Get detail exercise for EDIT

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [exercise, setExercise] = useState<ITExerciseResponseData>();
  const [listCreationVariables, setListCreationVariables] =
    useState<ITCreationVariablesWeightData[]>();

  const mockParamsSubclassCode = "SE113.O21.PMCL";
  const mockParamsClassId = "678e0290551a4b14f9d22bed";
  const mockTeacherCode = "80210"; //ứng với lớp mock trên

  console.log("listCreationVariables", listCreationVariables);

  useEffect(() => {
    //TODO: Fetch cột điểm, hệ số điểm còn lại
    const mockParams = {
      classId: mockParamsClassId,
      subclassCode: mockParamsSubclassCode,
      teacherCode: mockTeacherCode,
    };

    fetchCreationVariables(mockParams).then((data) => {
      if (data.data && data.data.weights.length > 0) {

        console.log('data fetchCreationVariables', data)

        setListCreationVariables(
          data.data.weights
            .filter(
              (item: ITCreationVariablesWeight) =>
                item.subclassCode === mockParamsSubclassCode
            )
            .flatMap((item: ITCreationVariablesWeight) => item.weights)
        );
      }
    });

    //TODO: Fetch detail exercise
    if (params.isEdit && params.exerciseId && params.exerciseId !== "") {
      setExercise(undefined);
      setIsLoading(true);

      fetchDetailExercise(params.exerciseId!)
        .then((data: any) => {
          console.log("fetchDetailExercise data", data);

          const res =
            gradeColumn.find((item) => {
              console.log("gradeColumn item", item);

              return item.type === data?.weight_type;
            })?.id || -1;

          console.log("res", res);

          setExercise(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (exercise) {
      setSelectedRecheckOption(exercise.allow_grade_review ? 2 : 1);
      setNumberOfRecheck(
        exercise.review_times ? exercise.review_times.toString() : ""
      );
      setSelectedGroupOption(exercise.in_group ? 2 : 1);
      setSelectedScheduleOption(exercise.publish_date !== "" ? 2 : 1);
      setDatePost(
        exercise.publish_date
          ? formatISOToDayDatatype(exercise.publish_date)
          : undefined
      );
      setDateStart(
        exercise.start_date
          ? formatISOToDayDatatype(exercise.start_date)
          : undefined
      );
      setTimeStart(
        exercise.start_date
          ? formatISOToTimeCalendarType(exercise.start_date)
          : ""
      );
      setDateEnd(
        exercise.end_date ? formatISOToDayDatatype(exercise.end_date) : undefined
      );
      setTimeEnd(
        exercise.end_date ? formatISOToTimeCalendarType(exercise.end_date) : ""
      );
      setDateRemindGrade(
        exercise.remind_grading_date
          ? formatISOToDayDatatype(exercise.remind_grading_date)
          : undefined
      );
      setTimeRemindGrade(
        exercise.remind_grading_date
          ? formatISOToTimeCalendarType(exercise.remind_grading_date)
          : ""
      );
      setDateClose(
        exercise.close_submission_date
          ? formatISOToDayDatatype(exercise.close_submission_date)
          : undefined
      );
      setTimeClose(
        exercise.close_submission_date
          ? formatISOToTimeCalendarType(exercise.close_submission_date)
          : ""
      );
      setRatio(exercise.weight ? exercise.weight.toString() : "");
      setSelectedGradeColumn(
        gradeColumn.find((item) => item.type === exercise.weight_type)?.id || -1
      );

      form.reset({
        title: exercise?.name,
        description: exercise?.description,
        file: exercise?.attachment_url,
        submitOption: exercise?.submission_option,
      });
    }
  }, [exercise]);

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(1);
  const [selectedRecheckOption, setSelectedRecheckOption] = useState(1);
  const [numberOfRecheck, setNumberOfRecheck] = useState<string>("");
  const [selectedGroupOption, setSelectedGroupOption] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const submissionOptions = [
    { id: 1, type: "FILE", value: "Quá trình" },
    { id: 2, type: "DRIVE", value: "Thực hành" },
  ];

  const [selectedSubmitOption, setSelectedSubmitOption] = useState<number[]>([
    1,
  ]);

  const getDisplayText = (date: any, time: any) => {
    return date
      ? `${format(date, "dd/MM/yyyy")} - ${time !== "" ? time : "Giờ"}`
      : "Chọn ngày & giờ";
  };
  // !

  const [datePost, setDatePost] = React.useState<Date>();

  const [dateStart, setDateStart] = React.useState<Date>();
  const [timeStart, setTimeStart] = React.useState("");

  const [dateEnd, setDateEnd] = React.useState<Date>();
  const [timeEnd, setTimeEnd] = React.useState("");

  const [dateRemindGrade, setDateRemindGrade] = React.useState<Date>();
  const [timeRemindGrade, setTimeRemindGrade] = React.useState("");

  const [dateClose, setDateClose] = React.useState<Date>();
  const [timeClose, setTimeClose] = React.useState("");

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedGradeColumn, setSelectedGradeColumn] = useState<number>(-1);

  const [ratio, setRatio] = useState<string>("");

  const handleChangeNumberOfRecheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfRecheck(e.target.value);
  };

  const handleChangeRatio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatio(e.target.value);
  };

  const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          toast({
            title: `Kích thước file vượt quá ${MAX_FILE_VALUE}MB.`,
            description: "Vui lòng chọn file nhỏ hơn.",
            variant: "error",
            duration: 3000,
          });
          return false;
        }
        return true;
      });

      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFileButtonClick = () => {
    fileRef.current?.click();
  };

  // TODO: HỆ THỐNG TỰ GHI NHẬN NGƯỜI ĐĂNG

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
      maxRecheck: z.number().optional(),
      gradeColumn: z.any().optional(),
      ratio: z.number().optional(),
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
      message: "Bạn phải chọn cột điểm cho bài tập",
      path: ["gradeColumn"],
    })
    .refine((data) => ratio !== "" && !isNaN(parseInt(ratio)), {
      message: "Hệ số phải là chữ số và không được để trống",
      path: ["ratio"],
    })
    .refine((data) => parseInt(ratio) > 0, {
      message: "Hệ số phải lớn hơn 0",
      path: ["ratio"],
    })
    .refine(
      (data) => {
        if (selectedGradeColumn !== -1 && listCreationVariables) {
          return (
            parseInt(ratio) <
            listCreationVariables[selectedGradeColumn].remaining
          );
        } else return true;
      },
      {
        message:
          selectedGradeColumn !== -1 && listCreationVariables
            ? `Hệ số phải nhỏ hơn hệ số còn lại của cột điểm (${
                listCreationVariables![selectedGradeColumn].remaining
              }%)`
            : "",
        path: ["ratio"],
      }
    )
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
  // 1. Define your form.
  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      submitOption: undefined,
    },
  });



  const createExerciseAPI = async (values: any) => {
    const mockParams = {
      class_id: mockParamsClassId,
      subclass_codes: [mockParamsSubclassCode, ...selectedCourses],
      name: values.title,
      description: values.description,
      weight: ratio,
      allow_grade_review: selectedRecheckOption === 2,
      review_times: numberOfRecheck === "" ? 0 : numberOfRecheck,
      weight_type: gradeColumn.find((item) => item.id === selectedGradeColumn)
        ?.type,
      publish_date: formatDayToISODateWithDefaultTime(datePost ?? new Date()),
      in_group: selectedGroupOption === 2,

      //TODO: get trong submissionOptions và chuyển thành mảng
      submission_option: "FILE",
      // submission_option: selectedSubmitOption
      //   .map(
      //     (item) => submissionOptions.find((option) => option.id === item)?.type
      //   )
      //   .filter(Boolean), // Loại bỏ giá trị undefined nếu không tìm thấy khớp
      //?

      start_date: formatDayToISO(dateStart ?? new Date(), timeStart),
      end_date: formatDayToISO(dateEnd ?? new Date(), timeEnd),
      remind_grading_date: formatDayToISO(
        dateRemindGrade ?? new Date(),
        timeRemindGrade
      ),
      close_submission_date: formatDayToISO(dateClose ?? new Date(), timeClose),
      attachment_url: "string",
    };

    console.log("mockParams createExerciseAPI:", mockParams);

    createExercise(mockParams).then((data) => {
      console.log("createExerciseAPI data:", data);

      handleClickBack();

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

      setIsSubmitting(false);
    });
  };

  const editExerciseAPI = async (values: any) => {
    const paramsAPI = {
      name: values.title,
      description: values.description,
      weight: ratio,
      allow_grade_review: selectedRecheckOption === 2,
      review_times: numberOfRecheck === "" ? 0 : numberOfRecheck,
      weight_type: gradeColumn.find((item) => item.id === selectedGradeColumn)
        ?.type,
      publish_date: formatDayToISODateWithDefaultTime(datePost ?? new Date()),
      in_group: true,

      //TODO: get trong submissionOptions và chuyển thành mảng
      submission_option: "FILE",
      start_date: formatDayToISO(dateStart ?? new Date(), timeStart),
      end_date: formatDayToISO(dateEnd ?? new Date(), timeEnd),
      remind_grading_date: formatDayToISO(
        dateRemindGrade ?? new Date(),
        timeRemindGrade
      ),
      close_submission_date: formatDayToISO(dateClose ?? new Date(), timeClose),
      attachment_url: "string",
    };

    console.log("paramsAPI editExerciseAPI:", paramsAPI); // Log paramsAPI sau khi khởi tạo

    editExercise(params.exerciseId ?? "", paramsAPI).then((data) => {
      console.log("createExerciseAPI data:", data);

      handleClickBack();

      toast({
        title: "Chỉnh sửa thông báo thành công.",
        variant: "success",
        duration: 3000,
      });

      setIsSubmitting(false);
    });
  };

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    try {
      setIsSubmitting(true);

      if (params.isEdit && params.exerciseId && params.exerciseId !== "") {
        editExerciseAPI(values);
      } else {
        createExerciseAPI(values);
      }
    } catch (error) {
    } finally {
    }
  }

  const tinymceKey = process.env.NEXT_PUBLIC_TINYMCE_EDITOR_API_KEY;

  const { toast } = useToast();

  const handleClickBack = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <div className="flex-1 mt-10">
      {isSubmitting ? <LoadingComponent /> : null}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex px-6 gap-12">
            {/* //TODO: SECTION 1 */}

            <div className="flex w-[70%] flex-col gap-10">
              {/* NAME ANNOUCEMENT */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tên bài tập <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <Input
                        {...field}
                        placeholder="Nhập tên bài tập..."
                        className="
                            no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      />
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Tên bài tập nên cụ thể, dễ hiểu để người đọc dễ dàng nhận
                      biết nội dung chính của bài tập.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION ANNOUCEMENT */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-3">
                    <FormLabel className="text-dark400_light800  text-[14px] font-semibold leading-[20.8px]">
                      Nội dung chi tiết của bài tập{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Thông tin chi tiết của thông báo. Tối thiểu 20 kí tự. Nhấn
                      tổ hợp Ctrl + V để chèn hình ảnh.
                    </FormDescription>
                    <FormControl className="mt-3.5 ">
                      {/* editor  */}
                      <Editor
                        apiKey={tinymceKey}
                        onInit={(_evt, editor) =>
                          // @ts-ignore
                          (editorRef.current = editor)
                        }
                        onBlur={field.onBlur}
                        onEditorChange={(content) => field.onChange(content)}
                        value={field.value || ""}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist",
                            "lists",
                            "link",
                            "image",
                            "preview",
                            "table",
                            "codesample",
                          ],
                          toolbar:
                            "undo redo | blocks | codesample | bold italic forecolor | " +
                            "alignleft aligncenter | alignright alignjustify | bullist numlist | link | " +
                            "table ",
                          content_style:
                            "body { font-family:Inter; font-size:16px }",
                          language: "vi",
                        }}
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* CHOOSE FILE */}
              <div>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-2">
                      <>
                        <div className="flex items-center">
                          <span className="mr-4 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            File đính kèm
                          </span>
                          <>
                            <input
                              ref={fileRef}
                              type="file"
                              accept=".docx, .pdf, .pptx, .xlsx, .xls, .txt, image/*"
                              multiple
                              onChange={handleChooseFile}
                              style={{ display: "none" }}
                            />

                            <PickFileImageButton
                              handleButtonClick={handleFileButtonClick}
                              icon={"/assets/icons/attach_file.svg"}
                              alt={"file"}
                              text="Chọn file"
                            />
                          </>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedFiles.map((file, index) => (
                            <ClosedButton
                              key={`${index}_${file.name}`}
                              _id={index}
                              onClose={(fileIndex) => {
                                setSelectedFiles((prevFiles) =>
                                  prevFiles.filter(
                                    (_, index) => index !== fileIndex
                                  )
                                );
                              }}
                            >
                              <RenderFile _id={index} name={file.name} />
                            </ClosedButton>
                          ))}
                        </div>
                      </>
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        File đính kèm có thể ở các định dạng: docx, pdf, pptx,
                        xlsx, txt... Tối đa {MAX_FILE_VALUE}MB.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/*  CUSTOM THỜI GIAN NỘP BÀI*/}
              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Thời gian nộp bài
                </label>

                <BorderContainer otherClasses="mt-3.5">
                  <div className="p-4 flex flex-col gap-10">
                    <FormField
                      control={form.control}
                      name="dateSubmit"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Nộp bài
                          </FormLabel>
                          <FormControl className="mt-3.5">
                            <div className="flex gap-2 items-center">
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
                                      onSelect={setDateStart}
                                      selectedTime={timeStart}
                                      setSelectTime={(time) => {
                                        setTimeStart(time);
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
                                      onSelect={setDateEnd}
                                      selectedTime={timeEnd}
                                      setSelectTime={(time) => {
                                        setTimeEnd(time);
                                      }}
                                      initialFocus
                                      locale={vi}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription className="body-regular mt-2.5 text-light-500">
                            Nếu không chọn thời gian nộp bài thì sinh viên sẽ
                            được nộp bài ngay lập tức và không giới hạn thời
                            gian.
                          </FormDescription>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateClose"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Đóng bài nộp
                          </FormLabel>
                          <FormControl className="mt-3.5">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={`w-full flex items-center text-center font-normal ${
                                    !dateClose && "text-muted-foreground"
                                  } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                >
                                  <span
                                    className={`flex-grow text-center ${
                                      !dateClose && "text-muted-foreground"
                                    }`}
                                  >
                                    {getDisplayText(dateClose, timeClose)}
                                  </span>
                                  <CalendarIcon className="ml-2 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <TimeCalendar
                                  mode="single"
                                  selected={dateClose}
                                  onSelect={setDateClose}
                                  selectedTime={timeClose}
                                  setSelectTime={(time) => {
                                    setTimeClose(time);
                                  }}
                                  initialFocus
                                  locale={vi}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription className="body-regular mt-2.5 text-light-500">
                            Khi bài tập tới hạn, vẫn cho phép sinh viên nộp bài
                            nhưng sẽ bị đánh dấu là nộp bài trễ. Sinh viên sẽ
                            không thể nộp bài tập khi quá ngày đóng bài nộp.
                          </FormDescription>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateRemindGrade"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Nhắc chấm bài
                          </FormLabel>
                          <FormControl className="mt-3.5">
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={`w-full flex items-center text-center font-normal ${
                                    !dateRemindGrade && "text-muted-foreground"
                                  } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                >
                                  <span
                                    className={`flex-grow text-center ${
                                      !dateRemindGrade &&
                                      "text-muted-foreground"
                                    }`}
                                  >
                                    {getDisplayText(
                                      dateRemindGrade,
                                      timeRemindGrade
                                    )}
                                  </span>
                                  <CalendarIcon className="ml-2 h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <TimeCalendar
                                  mode="single"
                                  selected={dateRemindGrade}
                                  onSelect={setDateRemindGrade}
                                  selectedTime={timeRemindGrade}
                                  setSelectTime={(time) => {
                                    setTimeRemindGrade(time);
                                  }}
                                  initialFocus
                                  locale={vi}
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormDescription className="body-regular mt-2.5 text-light-500">
                            Hệ thống sẽ gửi thông báo để nhắc bạn chấm bài vào
                            thời gian được chọn.
                          </FormDescription>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </BorderContainer>
              </div>
            </div>

            {/* //TODO: SECTION 2 */}

            <div className="flex w-[30%] flex-col gap-10">
              {/* CỘT ĐIỂM */}
              <FormField
                control={form.control}
                name="gradeColumn"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Cột điểm <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Bài tập được tạo sẽ là thành phần của cột điểm này.
                    </FormDescription>
                    <FormControl className="mt-3.5 ">
                      <Dropdown
                        className="z-30 rounded-lg"
                        label=""
                        dismissOnClick={true}
                        renderTrigger={() => (
                          <div>
                            <IconButton
                              text={`${
                                selectedGradeColumn === -1 ||
                                !listCreationVariables
                                  ? "Chọn cột điểm"
                                  : getWeightType(
                                      listCreationVariables[selectedGradeColumn]
                                        .type
                                    )
                              }`}
                              onClick={() => {}}
                              iconRight="/assets/icons/chevron-down.svg"
                              bgColor="bg-white"
                              textColor="text-black"
                              border
                              otherClasses="w-full"
                            />
                          </div>
                        )}
                      >
                        <div className="scroll-container scroll-container-dropdown-content">
                          {listCreationVariables?.map((weight, index) => (
                            <Dropdown.Item
                              key={`${weight.type}_${index}`}
                              onClick={() => {
                                if (selectedGradeColumn === index) {
                                  setSelectedGradeColumn(-1);
                                } else {
                                  setSelectedGradeColumn(index);
                                }
                              }}
                            >
                              <div className="flex justify-between w-full">
                                <p className="w-[80%] text-left line-clamp-1">
                                  {getWeightType(weight.type)} - Còn lại{" "}
                                  {weight.remaining}%
                                </p>
                                {selectedGradeColumn === index ? (
                                  <Image
                                    src="/assets/icons/check.svg"
                                    alt="check"
                                    width={21}
                                    height={21}
                                    className="cursor-pointer mr-2"
                                  />
                                ) : null}
                              </div>
                            </Dropdown.Item>
                          ))}
                        </div>
                      </Dropdown>
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* HỆ SỐ ĐIỂM */}
              <FormField
                control={form.control}
                name="ratio"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Hệ số điểm <span className="text-red-600">*</span>
                    </FormLabel>
                    {selectedGradeColumn !== -1 && listCreationVariables ? (
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Hệ số còn lại trong cột điểm{" "}
                        {getWeightType(
                          listCreationVariables[selectedGradeColumn].type
                        )}{" "}
                        để phân bổ là{" "}
                        {listCreationVariables[selectedGradeColumn].remaining}%
                      </FormDescription>
                    ) : null}
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Nếu không đặt hệ số, hệ thống sẽ tự động phân bổ điểm đều
                      giữa các thành phần trong cùng cột điểm.
                    </FormDescription>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Bạn có thể chỉnh sửa chi tiết hệ số của cột điểm tại cài
                      đặt lớp học.
                    </FormDescription>
                    <FormControl className="mt-3.5 ">
                      <Input
                        value={ratio}
                        onChange={handleChangeRatio}
                        name="ratio"
                        placeholder="Nhập hệ số..."
                        className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* ĐĂNG NHIỀU LỚP */}
              {params.isEdit ? null : (
                <FormField
                  control={form.control}
                  name="multipleCourses"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Đăng nhiều lớp
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Dropdown
                          className="z-30 rounded-lg"
                          label=""
                          dismissOnClick={true}
                          renderTrigger={() => (
                            <div>
                              <IconButton
                                text="Chọn lớp khác"
                                onClick={() => {}}
                                iconRight={"/assets/icons/chevron-down.svg"}
                                bgColor="bg-white"
                                textColor="text-black"
                                border
                                otherClasses="w-full"
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
                            {mockCoursesList.map((course: any, index) => (
                              <Dropdown.Item
                                key={`${course}_${index}`}
                                onClick={() => {
                                  setSelectedCourses((prev) =>
                                    prev.includes(course.value)
                                      ? prev.filter(
                                          (item) => item !== course.value
                                        )
                                      : [...prev, course.value]
                                  );
                                }}
                              >
                                <div className="flex justify-between w-full">
                                  <p className="w-[80%] text-left line-clamp-1">
                                    {course.value}
                                  </p>
                                  {selectedCourses.includes(course.value) ? (
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
                      </FormControl>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourses.map((item: any) => (
                          <ClosedButton
                            key={item}
                            iconHeight={16}
                            iconWidth={16}
                            onClose={() => {
                              setSelectedCourses((prev) =>
                                prev.filter((course) => course !== item)
                              );
                            }}
                          >
                            <RenderCourse _id={item} name={item} />
                          </ClosedButton>
                        ))}
                      </div>
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Thông báo này sẽ được đăng trong các lớp bạn chọn ngoài
                        lớp hiện tại.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )}

              {/* GROUP OPTION */}
              <FormField
                control={form.control}
                name="groupOption"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tùy chọn nhóm <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <BorderContainer otherClasses="mt-3.5">
                        <div className="p-4 flex flex-col gap-10">
                          <div className="inline-flex">
                            <RadioboxComponent
                              id={1}
                              handleClick={() => {
                                setSelectedGroupOption(1);
                              }}
                              value={selectedGroupOption}
                              text="Cá nhân"
                            />
                          </div>
                          <div className="inline-flex">
                            <RadioboxComponent
                              id={2}
                              handleClick={() => {
                                setSelectedGroupOption(2);
                              }}
                              value={selectedGroupOption}
                              text="Theo nhóm"
                            />
                          </div>
                        </div>
                      </BorderContainer>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* SUBMIT OPTION */}
              <FormField
                control={form.control}
                name="submitOption"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tùy chọn nộp bài <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <BorderContainer otherClasses="mt-3.5">
                        <div className="p-4 flex flex-col gap-10">
                          <div className="inline-flex">
                            <CheckboxComponent
                              handleClick={() => {
                                if (!selectedSubmitOption.includes(1)) {
                                  setSelectedSubmitOption((prev) => [
                                    ...prev,
                                    1,
                                  ]);
                                } else {
                                  setSelectedSubmitOption((prev) =>
                                    prev.filter((item) => item !== 1)
                                  );
                                }
                              }}
                              value={selectedSubmitOption.includes(1)}
                              text="Nộp file"
                            />
                          </div>
                          <div className="inline-flex">
                            <CheckboxComponent
                              handleClick={() => {
                                if (!selectedSubmitOption.includes(2)) {
                                  setSelectedSubmitOption((prev) => [
                                    ...prev,
                                    2,
                                  ]);
                                } else {
                                  setSelectedSubmitOption((prev) =>
                                    prev.filter((item) => item !== 2)
                                  );
                                }
                              }}
                              value={selectedSubmitOption.includes(2)}
                              text="Điền link drive"
                            />
                          </div>
                        </div>
                      </BorderContainer>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* PHÚC KHẢO*/}
              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Phúc khảo <span className="text-red-600">*</span>
                </label>

                <BorderContainer otherClasses="mt-3.5">
                  <div className="p-4 flex flex-col gap-10">
                    <RadioboxComponent
                      id={1}
                      handleClick={() => {
                        setSelectedRecheckOption(1);
                      }}
                      value={selectedRecheckOption}
                      text="Không cho phép phúc khảo"
                    />
                    <RadioboxComponent
                      id={2}
                      handleClick={() => {
                        setSelectedRecheckOption(2);
                      }}
                      value={selectedRecheckOption}
                      text="Cho phép phúc khảo"
                    />

                    {selectedRecheckOption === 2 ? (
                      <FormField
                        control={form.control}
                        name="maxRecheck"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                              Số lần tối đa
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Input
                                value={numberOfRecheck}
                                onChange={handleChangeNumberOfRecheck}
                                name="numberOfRecheck"
                                placeholder="Nhập số lượng..."
                                className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </BorderContainer>
              </div>

              {/*  CUSTOM ĐĂNG THÔNG BÁO*/}
              <div>
                <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                  Thời điểm đăng thông báo{" "}
                  <span className="text-red-600">*</span>
                </label>

                <BorderContainer otherClasses="mt-3.5">
                  <div className="p-4 flex flex-col gap-10">
                    <RadioboxComponent
                      id={1}
                      handleClick={() => {
                        setSelectedScheduleOption(1);
                      }}
                      value={selectedScheduleOption}
                      text="Đăng thông báo ngay bây giờ"
                    />
                    <RadioboxComponent
                      id={2}
                      handleClick={() => {
                        setSelectedScheduleOption(2);
                      }}
                      value={selectedScheduleOption}
                      text="Tạo lịch đăng thông báo"
                    />

                    {selectedScheduleOption === 2 ? (
                      <FormField
                        control={form.control}
                        name="datePost"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                              Chọn ngày
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={` flex items-center text-center font-normal ${
                                      !datePost && "text-muted-foreground"
                                    } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                  >
                                    <span
                                      className={`flex-grow text-center ${
                                        !datePost && "text-muted-foreground"
                                      }`}
                                    >
                                      {datePost
                                        ? format(datePost, "dd/MM/yyyy")
                                        : "Chọn ngày"}
                                    </span>
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={datePost}
                                    onSelect={setDatePost}
                                    initialFocus
                                    locale={vi}
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormDescription className="body-regular mt-2.5 text-light-500">
                              Thông báo sẽ được lên lịch để đăng vào ngày này mà
                              bạn chọn.
                            </FormDescription>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </BorderContainer>
              </div>
            </div>
          </div>

          <div className="flex mt-12 gap-2">
            <SubmitButton text="Đăng" otherClasses="w-fit" />

            <IconButton
              text="Hủy"
              red
              otherClasses="w-fit"
              onClick={handleClickBack}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateExercise;
