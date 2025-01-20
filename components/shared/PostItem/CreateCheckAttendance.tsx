"use client";
import RenderCourse from "@/components/courses/RenderCourse";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import PickFileImageButton from "@/components/shared/Annoucements/PickFileImageButton";
import RenderFile from "@/components/shared/Annoucements/RenderFile";
import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import RadioboxComponent from "@/components/shared/RadioboxComponent";
import TableSearch from "@/components/shared/Search/TableSearch";
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
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILE_VALUE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { mockCoursesList } from "@/mocks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemIndicator } from "@radix-ui/react-menubar";
import { Editor } from "@tinymce/tinymce-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Dropdown } from "flowbite-react";
import { Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ! CẬP NHẬT
const type: any = "create";

// TODO: Search debouce tìm kiếm lớp nếu cần

const CreateCheckAttendance = () => {
  const mockCheckAttendaceAnswer = {
    question: "Bài tập hôm nay thế nào?",
    answer: [
      { id: 1, text: "Tuyệt vời" },
      { id: 2, text: "Hay" },
      { id: 3, text: "Xuất sắc" },
      { id: 4, text: "10 điểm" },
    ],
  };

  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(1);
  const [date, setDate] = React.useState<Date>();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [timeCheckAttendance, setTimeCheckAttendance] = useState<string>("");
  const [selectedCheckAttendance, setSelectedCheckAttendance] = useState(2);
  const [dateCloseCheckAttendance, setDateCloseCheckAttendance] =
    React.useState<Date>();
  const handleChangeTimeCheckAttendance = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeCheckAttendance(e.target.value);
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
      multipleCourses: z.number().optional(),
      date: z.date().optional(),
      dateCloseCheckAttendance: z.date().optional(),
    })
    .refine(
      (data) =>
        timeCheckAttendance !== "" && !isNaN(parseInt(timeCheckAttendance)),
      {
        message: "Thời gian điểm danh phải là chữ số và không được để trống",
        path: ["timeCheckAttendance"],
      }
    )
    .refine(
      (data) =>
        selectedCheckAttendance === 2
          ? !(dateCloseCheckAttendance === undefined)
          : true,

      {
        message: "Bạn phải chọn thời gian đóng form điểm danh",
        path: ["dateCloseCheckAttendance"],
      }
    )
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
      multipleCourses: undefined,
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
        target: selectedCourses,
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
    <div className="flex-1 mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex px-6 gap-12">
            {/* //TODO: SECTION 1 */}

            {/* NAME ANNOUCEMENT */}
            <div className="flex w-[70%] flex-col gap-10">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tên form điểm danh <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <Input
                        {...field}
                        placeholder="Nhập tên..."
                        className="
                            no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      />
                    </FormControl>
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
                      Nội dung chi tiết của form điểm danh{" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Thông tin chi tiết chứa tối thiểu 20 kí tự. Nhấn tổ hợp
                      Ctrl + V để chèn hình ảnh.
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

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* //TODO: SECTION 2 */}

            <div className="flex w-[30%] flex-col gap-10">
              {/*  THỜI GIAN ĐIỂM DANH */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Thời gian điểm danh (giây){" "}
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <Input
                        value={timeCheckAttendance}
                        onChange={handleChangeTimeCheckAttendance}
                        placeholder="Nhập tên..."
                        className="
                            no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/*  FORM ĐIỂM DANH */}
              <FormField
                control={form.control}
                name="multipleCourses"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Chọn câu trả lời cho form điểm danh
                    </FormLabel>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Sinh viên sẽ phải chọn câu trả lời điểm danh trong khoảng
                      thời gian nhất định.
                    </FormDescription>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Có thể chỉnh sửa thời gian trả lời điểm danh trong cài đặt
                      lớp.
                    </FormDescription>
                    <FormControl>
                      <BorderContainer otherClasses="mt-3.5">
                        <div className="p-4 flex flex-col gap-10">
                          {mockCheckAttendaceAnswer.answer.map((item) => {
                            return (
                              <div className="inline-flex" key={item.id}>
                                <RadioboxComponent
                                  id={item.id}
                                  handleClick={() => {
                                    setSelectedCheckAttendance(item.id);
                                  }}
                                  value={selectedCheckAttendance}
                                  text={item.text}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </BorderContainer>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex mt-12 gap-2">
            <SubmitButton text="Đăng" otherClasses="w-fit" />

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
  );
};

export default CreateCheckAttendance;
