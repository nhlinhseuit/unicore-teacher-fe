"use client";
import PickFileImageButton from "@/components/shared/Annoucements/PickFileImageButton";
import IconButton from "@/components/shared/Button/IconButton";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useToast } from "@/hooks/use-toast";
import { mockGradeColumnList } from "@/mocks";
import { TopicDataItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Dropdown } from "flowbite-react";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { z } from "zod";
import BorderContainer from "../BorderContainer";
import SubmitButton from "../Button/SubmitButton";
import ErrorComponent from "../Status/ErrorComponent";
import TableSkeleton from "../Table/components/TableSkeleton";
import TopicGroupTable from "../Table/TableTopic/TopicDataTable";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

interface DateTimeState {
  date: Date | undefined;
  time: string;
}

interface DateTimeFields {
  start: DateTimeState;
  end: DateTimeState;
  late: DateTimeState;
  close: DateTimeState;
}

const CreateBigExercise = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedRecheckOption, setSelectedRecheckOption] = useState(1);
  const [selectedSuggestOption, setSelectedSuggestOption] = useState(1);
  const [numberOfRecheck, setNumberOfRecheck] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedSubmitOption, setSelectedSubmitOption] = useState<number[]>([
    1,
  ]);

  const [dateStart, setDateStart] = React.useState<Date>();

  const [selectedGradeColumn, setSelectedGradeColumn] = useState<number>(-1);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [dataTable, setDataTable] = useState<TopicDataItem[]>([]);

  const handleChangeNumberOfRecheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumberOfRecheck(e.target.value);
  };

  const handleTopicsFileUpload = (e: any) => {
    setIsLoading(true);
    setErrorMessages([]);
    setDataTable([]);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target?.result || [];
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      // Bỏ 1 dòng đầu của tên file
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        range: 1, // Chỉ số 1 đại diện cho hàng 2 (vì index bắt đầu từ 0)
        defval: "",
      });

      let errorMessages: string[] = [];

      const transformedData = parsedData.map((item: any, index: number) => {
        // Kiểm tra các trường quan trọng (required fields)
        const requiredFields = {
          "Tên đề tài": item["Tên đề tài"],
          "Mô tả": item["Mô tả"],
          "GV phụ trách": item["GV phụ trách"],
        };

        // Lặp qua các trường để kiểm tra nếu có giá trị undefined
        if (index === 0) {
          Object.entries(requiredFields).forEach(([fieldName, value]) => {
            if (value === undefined) {
              errorMessages.push(`Trường "${fieldName}" bị thiếu hoặc lỗi.`);
            }
          });
        }

        return {
          type: "topic",
          STT: item.STT,
          isDeleted: false,
          data: {
            "Tên đề tài": item["Tên đề tài"],
            "Mô tả": item["Mô tả"],
            "GV phụ trách": item["GV phụ trách"],
          },
        };
      });

      if (errorMessages.length > 0) {
        setErrorMessages(errorMessages);
      } else {
        setDataTable(transformedData as []);
      }

      setIsLoading(false);
    };
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
      dateStart: z.date().optional(),
      dateLate: z.date().optional(),
      dateClose: z.date().optional(),
      multipleCourses: z.number().optional(),
      groupOption: z.any().optional(),
      submitOption: z.any().optional(),
      gradeColumn: z.any().optional(),
      date: z.date().optional(),
      maxRecheck: z.number().optional(),
    })
    .refine((data) => !(dateStart === undefined), {
      message: "Bạn phải chọn ngày bắt đầu",
      path: ["dateStart"],
    })
    .refine((data) => selectedGradeColumn !== -1, {
      message: "Bạn phải chọn cột điểm cho bài tập lớn",
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

  const tinymceKey = process.env.NEXT_PUBLIC_TINYMCE_EDITOR_API_KEY;

  const { toast } = useToast();

  const handleClick = () => {
    const newPath = pathName.substring(0, pathName.lastIndexOf("/"));
    router.push(newPath);
  };

  return (
    <div>
      {errorMessages.length > 0 && (
        <div className="mb-6">
          {errorMessages.map((item, index) => (
            <ErrorComponent
              key={`${item}_${index}`}
              text={item}
              onClickClose={() => {
                setErrorMessages((prevErrors) =>
                  prevErrors.filter((_, i) => i !== index)
                );
              }}
            />
          ))}
        </div>
      )}

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
                        Tên bài tập lớn<span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          placeholder="Nhập tên bài tập lớn..."
                          className="
                            no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Tên bài tập lớn nên cụ thể, dễ hiểu để người đọc dễ dàng
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
                        Mô tả bài tập lớn{" "}
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
              </div>

              {/* //TODO: SECTION 2 */}

              <div className="flex w-[30%] flex-col gap-10">
                {/* NGÀY BẮT ĐẦU*/}
                <FormField
                  control={form.control}
                  name="dateStart"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Ngày bắt đầu <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={` flex items-center text-center font-normal ${
                                !dateStart && "text-muted-foreground"
                              } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                            >
                              <span
                                className={`flex-grow text-center ${
                                  !dateStart && "text-muted-foreground"
                                }`}
                              >
                                {dateStart
                                  ? format(dateStart, "dd/MM/yyyy")
                                  : "Chọn ngày"}
                              </span>
                              <CalendarIcon className="ml-2 h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateStart}
                              onSelect={setDateStart}
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

                {/* CỘT ĐIỂM */}
                <FormField
                  control={form.control}
                  name="gradeColumn"
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
                                border
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

                {/* ĐỀ XUẤT ĐỀ TÀI*/}
                <div>
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                    Đề xuất đề tài <span className="text-red-600">*</span>
                  </label>

                  <BorderContainer otherClasses="mt-3.5">
                    <div className="p-4 flex flex-col gap-10">
                      <RadioboxComponent
                        id={1}
                        handleClick={() => {
                          setSelectedSuggestOption(1);
                        }}
                        value={selectedSuggestOption}
                        text="Không cho phép đề xuất"
                      />
                      <RadioboxComponent
                        id={2}
                        handleClick={() => {
                          setSelectedSuggestOption(2);
                        }}
                        value={selectedSuggestOption}
                        text="Cho phép sinh viên đề xuất đề tài"
                      />
                    </div>
                  </BorderContainer>
                </div>
              </div>
            </div>

            {/* CHOOSE FILE */}
            <div className="mt-12 mb-4 px-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-2">
                    <>
                      <div className="flex items-center">
                        <span className="mr-4 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                          Import danh sách đề tài
                        </span>
                        <>
                          <input
                            ref={fileRef}
                            type="file"
                            accept=".xlsx, .xls"
                            multiple
                            onChange={handleTopicsFileUpload}
                            style={{ display: "none" }}
                          />

                          <PickFileImageButton
                            handleButtonClick={handleFileButtonClick}
                            icon={"/assets/icons/attach_file.svg"}
                            alt={"file"}
                            text="Chọn file"
                          />

                          <a
                            href="/assets/KTLN - template import ds đề tài.xlsx"
                            download
                            className="ml-4 text-blue-500 underline text-base italic"
                          >
                            Tải xuống template file import danh sách đề tài
                          </a>
                        </>
                      </div>
                    </>
                    <FormDescription className="body-regular text-light-500">
                      Không bắt buộc. Có thể import danh sách đề tài trong Bài
                      tập lớn.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {isLoading ? (
              <TableSkeleton />
            ) : dataTable.length > 0 ? (
              <TopicGroupTable
                isEditTable={false}
                isMultipleDelete={false}
                dataTable={dataTable}
              />
            ) : (
              <></>
            )}

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

export default CreateBigExercise;
