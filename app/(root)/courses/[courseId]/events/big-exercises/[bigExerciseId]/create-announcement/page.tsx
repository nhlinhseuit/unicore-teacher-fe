"use client";
import RenderCourse from "@/components/courses/RenderCourse";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import PickFileImageButton from "@/components/shared/Annoucements/PickFileImageButton";
import RenderFile from "@/components/shared/Annoucements/RenderFile";
import BackToPrev from "@/components/shared/BackToPrev";
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

const CreateAnnouncement = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [selectedScheduleOption, setSelectedScheduleOption] = useState(1);
  const [date, setDate] = React.useState<Date>();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

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

              {/* NAME ANNOUCEMENT */}
              <div className="flex w-[70%] flex-col gap-10">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Tên thông báo <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
                          placeholder="Nhập tên thông báo..."
                          className="
                            no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
                      </FormControl>
                      <FormDescription className="body-regular mt-2.5 text-light-500">
                        Tên thông báo nên cụ thể, dễ hiểu để người đọc dễ dàng
                        nhận biết nội dung chính của thông báo.
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
                        Nội dung chi tiết của thông báo{" "}
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

                {/* TẠO LỊCH ĐĂNG THÔNG BÁO */}
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
                {/* DATE */}
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
                                  !date && "text-muted-foreground"
                                } hover:bg-transparent active:bg-transparent rounded-lg shadow-none`}
                              >
                                <span
                                  className={`flex-grow text-center ${
                                    !date && "text-muted-foreground"
                                  }`}
                                >
                                  {date
                                    ? format(date, "dd/MM/yyyy")
                                    : "Chọn ngày"}
                                </span>
                                <CalendarIcon className="ml-2 h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                locale={vi}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormDescription className="body-regular mt-2.5 text-light-500">
                          Thông báo sẽ được lên lịch để đăng vào ngày này mà bạn
                          chọn.
                        </FormDescription>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                ) : (
                  <></>
                )}
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

export default CreateAnnouncement;
