"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "@/components/ui/input";
import { Dropdown } from "flowbite-react";
import IconButton from "@/components/shared/Button/IconButton";
import PickFileImageButton from "@/components/shared/Annoucements/PickFileImageButton";
import RenderFile from "@/components/shared/Annoucements/RenderFile";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILE_VALUE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TimeCalendar } from "@/components/ui/custom-time-calendar";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import TableSearch from "@/components/shared/Search/TableSearch";
import RenderCourse from "@/components/courses/RenderCourse";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import BackToPrev from "@/components/shared/BackToPrev";
import BorderContainer from "@/components/shared/BorderContainer";
import CheckboxComponent from "@/components/shared/CheckboxComponent";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

const mockCoursesList = [
  { id: 1, value: "SE114.N21.PMCL.1" },
  { id: 2, value: "SE114.N21.PMCL.2" },
  { id: 3, value: "SE100.N23.PMCL.1" },
  { id: 4, value: "SE100.N23.PMCL.2" },
];

const mockGradeColumnList = [
  { id: 1, value: "Quá trình - 20%" },
  { id: 2, value: "Giữa kỳ - 30%" },
  { id: 3, value: "Cuối kỳ - 50%" },
];

const mockTeacherGradingList = [
  { id: 1, value: "Huỳnh Hồ Thị Mộng Trinh" },
  { id: 2, value: "Nguyễn Thị Thanh Trúc" },
  { id: 3, value: "Đặng Việt Dũng" },
];

const CreateExercise = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(1);
  const [selectedRecheckOption, setSelectedRecheckOption] = useState(1);
  const [numberOfRecheck, setNumberOfRecheck] = useState<string>();
  const [selectedGroupOption, setSelectedGroupOption] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSubmitOption, setSelectedSubmitOption] = useState<number[]>([
    1,
  ]);
  const [datePost, setDatePost] = React.useState<Date>();
  const [dateStart, setDateStart] = React.useState<Date>();
  const [dateEnd, setDateEnd] = React.useState<Date>();
  const [dateLate, setDateLate] = React.useState<Date>();
  const [dateClose, setDateClose] = React.useState<Date>();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedGradeColumn, setSelectedGradeColumn] = useState<number>(-1);
  const [selectedTeacherGrading, setSelectedTeacherGrading] = useState(1);

  const handleChangeNumberOfRecheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfRecheck(e.target.value);
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
      multipleCourses: z.number().optional(),
      file: z.any(),
      groupOption: z.any(),
      teacherGrading: z.any(),
      submitOption: z.number().optional(),
      date: z.date().optional(),
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
    );

  // 1. Define your form.
  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
      file: undefined,
      submitOption: undefined,
      date: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    setIsSubmitting(true);

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
        description: `Thông báo đã được gửi đến ${mockCoursesList.join(", ")}`,
        variant: "success",
        duration: 3000,
      });
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  const tinymceKey = process.env.NEXT_PUBLIC_TINYMCE_EDITOR_API_KEY;

  const { toast } = useToast();

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <div>
      <BackToPrev
        text={"Quay lại danh sách thông báo"}
        onClickPrev={handleClick}
      />

      <div className="flex-1 mt-10">
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
                        Tên bài tập nên cụ thể, dễ hiểu để người đọc dễ dàng
                        nhận biết nội dung chính của bài tập.
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
                          initialValue=""
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
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Thông tin chi tiết của thông báo. Tối thiểu 20 kí tự.
                        Nhấn tổ hợp Ctrl + V để chèn hình ảnh.
                      </FormDescription>
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
                    Thời gian nộp bài <span className="text-red-600">*</span>
                  </label>

                  <BorderContainer otherClasses="mt-3.5">
                    <div className="p-4 flex flex-col gap-10">
                      <FormField
                        control={form.control}
                        name="date"
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
                                            !dateStart &&
                                            "text-muted-foreground"
                                          }`}
                                        >
                                          {dateStart
                                            ? format(dateStart, "dd/MM/yyyy")
                                            : "Chọn ngày & giờ"}
                                        </span>
                                        <CalendarIcon className="ml-2 h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <TimeCalendar
                                        mode="single"
                                        selected={dateStart}
                                        onSelect={setDateStart}
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
                                          {dateEnd
                                            ? format(dateEnd, "dd/MM/yyyy")
                                            : "Chọn ngày & giờ"}
                                        </span>
                                        <CalendarIcon className="ml-2 h-4 w-4" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                      <TimeCalendar
                                        mode="single"
                                        selected={dateEnd}
                                        onSelect={setDateEnd}
                                        initialFocus
                                        locale={vi}
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex w-full flex-col">
                            <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                              Cho phép nộp trễ
                            </FormLabel>
                            <FormControl className="mt-3.5">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full flex items-center text-center font-normal ${
                                      !dateLate && "text-muted-foreground"
                                    } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                                  >
                                    <span
                                      className={`flex-grow text-center ${
                                        !dateLate && "text-muted-foreground"
                                      }`}
                                    >
                                      {dateLate
                                        ? format(dateLate, "dd/MM/yyyy")
                                        : "Chọn ngày & giờ"}
                                    </span>
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <TimeCalendar
                                    mode="single"
                                    selected={dateLate}
                                    onSelect={setDateLate}
                                    initialFocus
                                    locale={vi}
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="date"
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
                                      {dateClose
                                        ? format(dateClose, "dd/MM/yyyy")
                                        : "Chọn ngày & giờ"}
                                    </span>
                                    <CalendarIcon className="ml-2 h-4 w-4" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <TimeCalendar
                                    mode="single"
                                    selected={dateClose}
                                    onSelect={setDateClose}
                                    initialFocus
                                    locale={vi}
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormControl>
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
                {/* ĐĂNG NHIỀU LỚP */}
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
                                otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
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
                  name="groupOption"
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

                {/* CỘT ĐIỂM */}
                <FormField
                  control={form.control}
                  name="submitOption"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Cột điểm <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Dropdown
                          className="z-30 rounded-lg"
                          label=""
                          dismissOnClick={true}
                          renderTrigger={() => (
                            <div>
                              <IconButton
                                text={`${
                                  selectedGradeColumn === -1
                                    ? "Chọn cột điểm"
                                    : mockGradeColumnList[
                                        selectedGradeColumn - 1
                                      ].value
                                }`}
                                onClick={() => {}}
                                iconRight={"/assets/icons/chevron-down.svg"}
                                bgColor="bg-white"
                                textColor="text-black"
                                otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                              />
                            </div>
                          )}
                        >
                          <div className="scroll-container scroll-container-dropdown-content">
                            {mockGradeColumnList.map((gradeColumn, index) => (
                              <Dropdown.Item
                                key={`${gradeColumn.id}_${index}`}
                                onClick={() => {
                                  if (selectedGradeColumn === gradeColumn.id) {
                                    setSelectedGradeColumn(-1);
                                  } else {
                                    setSelectedGradeColumn(gradeColumn.id);
                                  }
                                }}
                              >
                                <div className="flex justify-between w-full">
                                  <p className="w-[80%] text-left line-clamp-1">
                                    {gradeColumn.value}
                                  </p>
                                  {selectedGradeColumn === gradeColumn.id ? (
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
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Bài tập được sẽ được tính là 1 bài trong cột điểm này.
                      </FormDescription>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* NGƯỜI CHẤM */}
                <FormField
                  control={form.control}
                  name="teacherGrading"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Người chấm <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Dropdown
                          className="z-30 rounded-lg"
                          label=""
                          dismissOnClick={true}
                          renderTrigger={() => (
                            <div>
                              <IconButton
                                text={`${
                                  mockTeacherGradingList[
                                    selectedTeacherGrading - 1
                                  ].value
                                }`}
                                onClick={() => {}}
                                iconRight={"/assets/icons/chevron-down.svg"}
                                bgColor="bg-white"
                                textColor="text-black"
                                otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                              />
                            </div>
                          )}
                        >
                          <div className="scroll-container scroll-container-dropdown-content">
                            {mockTeacherGradingList.map((teacher, index) => (
                              <Dropdown.Item
                                key={`${teacher.id}_${index}`}
                                onClick={() => {
                                  if (selectedTeacherGrading === teacher.id) {
                                    setSelectedTeacherGrading(1);
                                  } else {
                                    setSelectedTeacherGrading(teacher.id);
                                  }
                                }}
                              >
                                <div className="flex justify-between w-full">
                                  <p className="w-[80%] text-left line-clamp-1">
                                    {teacher.value}
                                  </p>
                                  {selectedTeacherGrading === teacher.id ? (
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
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Giảng viên sẽ chấm điểm cho bài tập.
                      </FormDescription>
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
                          name="date"
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
                          name="date"
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
                                Thông báo sẽ được lên lịch để đăng vào ngày này
                                mà bạn chọn.
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
              <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
              <IconButton
                text="Hủy"
                red
                otherClasses="w-fit"
                onClick={handleClick}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateExercise;
