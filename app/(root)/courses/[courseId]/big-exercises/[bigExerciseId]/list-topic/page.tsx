"use client";

import BackToPrev from "@/components/shared/BackToPrev";
import IconButton from "@/components/shared/Button/IconButton";
import ErrorComponent from "@/components/shared/Status/ErrorComponent";
import NoResult from "@/components/shared/Status/NoResult";
import TableSkeleton from "@/components/shared/Table/components/TableSkeleton";
import TopicGroupTable from "@/components/shared/Table/TableTopic/TopicDataTable";
import {
  AlertDialog,
AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { mockDbStudent, mockTopicDataTable } from "@/mocks";
import { TopicDataItem } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { z } from "zod";

import BorderContainer from "@/components/shared/BorderContainer";
import StudentItem from "@/components/shared/StudentItem";
import {
  maxStudentPerGroup,
  minStudentPerGroup
} from "@/constants";
import Student from "@/types/entity/Student";
import { usePathname } from "next/navigation";

const ListTopic = () => {
  // Update biến: Danh sách thành viên nhóm
  const pathName = usePathname();
  const courseId = pathName.split("/")[2];
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const studentIdRef = useRef<HTMLInputElement>(null);
  const updateStudentId = (value: string) => {
    if (studentIdRef.current) {
      studentIdRef.current.value = value;
    }
  };
  const [suggestion, setSuggestion] = useState(false);
  const [placeholder, setPlaceholder] = useState("Nhập mã số sinh viên");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  //!: API trả về có kq
  const isHasStudentInDb = () => {
    if (studentIdRef.current) {
      return mockDbStudent.find(
        (item) => item.id === studentIdRef.current!.value
      );
    }
  };
  //!: API check xem sinh viên có thỏa điều kiện sinh viên khác lớp, nhưng phải cùng giảng viên giảng dạy và cùng môn học?
  const isStudentAbleToBeMemberGroup = () => {
    for (const student of selectedStudents) {
      if (student.class === "SE502.N25") return false;
    }
    return true;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateStudentId(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (isHasStudentInDb()) {
        setSuggestion(true);
      } else {
        setSuggestion(false);
      }
    }, 300);
  };
  const handleSuggestionClick = () => {
    if (studentIdRef.current) {
      if (
        selectedStudents.some((item) => item.id === studentIdRef.current!.value)
      ) {
        setSuggestion(false);
        updateStudentId("");
        return;
      }
    }
    setSelectedStudents((prev) => [...prev, isHasStudentInDb()!]);
    setSuggestion(false);
    updateStudentId("");
  };
  const handleFocus = () => {
    if (isHasStudentInDb()) {
      setSuggestion(true); // Hiển thị gợi ý nếu khớp
    } else {
      setSuggestion(false); // Ẩn gợi ý nếu không khớp
    }
  };
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setSuggestion(false); // Tắt suggestion khi click ra ngoài
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [isImport, setIsImport] = useState(false);
  const [isCreateNew, setIsCreateNew] = useState(false);
  const [dataTable, setDataTable] = useState<TopicDataItem[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const AnnoucementSchema = z
    .object({
      title: z
        .string()
        .min(5, { message: "Tên đề tài phải chứa ít nhất 5 ký tự" })
        .max(130),
      description: z
        .string()
        .min(20, { message: "Nội dung đề tài phải chứa ít nhất 20 ký tự" }),
      studentList: z.string().optional(),
    })
    .refine(() => selectedStudents.length >= minStudentPerGroup, {
      message: `Nhóm phải có ít nhất ${minStudentPerGroup} thành viên.`,
      path: ["studentList"],
    })
    .refine(() => selectedStudents.length <= maxStudentPerGroup, {
      message: `Nhóm chỉ được phép tối đa ${maxStudentPerGroup} thành viên.`,
      path: ["studentList"],
    })
    .refine(() => isStudentAbleToBeMemberGroup(), {
      message: `Thành viên nhóm có thể là sinh viên khác lớp, nhưng phải cùng giảng viên giảng dạy và cùng môn học.`,
      path: ["studentList"],
    });

  const form = useForm<z.infer<typeof AnnoucementSchema>>({
    resolver: zodResolver(AnnoucementSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: any) {
    try {
      console.log({
        title: values.title,
        description: values.description,
      });

      // naviate to home page
      // router.push("/");

      toast({
        title: "Đăng đề tài mới thành công.",
        variant: "success",
        duration: 3000,
      });

      setIsCreateNew(false);
      reset({
        title: "",
        description: "",
      });
    } catch {
    } finally {
    }
  }

  return (
    <>
      {!isImport ? (
        <>
          <div className="flex justify-end mb-3 gap-2">
            <IconButton
              text="Import danh sách đề tài mới"
              onClick={() => {
                setIsImport(true);
              }}
              iconLeft={"/assets/icons/upload-white.svg"}
              iconWidth={16}
              iconHeight={16}
            />

            <IconButton
              text="Đăng đề tài mới"
              green
              onClick={() => {
                setIsCreateNew(true);
              }}
              iconLeft={"/assets/icons/add.svg"}
              iconWidth={16}
              iconHeight={16}
            />
          </div>

          <p className="flex justify-end pb-6 italic text-sm text-red-500">
            * Hiện tại kh làm chức năng chỉnh sửa ở đây, cần sửa thì import lại
            danh sách
          </p>

          <TopicGroupTable
            isEditTable={false}
            isMultipleDelete={false}
            // @ts-ignore
            dataTable={mockTopicDataTable}
          />
        </>
      ) : (
        <>
          <BackToPrev
            text={"Quay lại danh sách đề tài"}
            onClickPrev={() => {
              setIsImport(false);
            }}
          />
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

          <div className="mb-6">
            <div className="flex mb-2">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleTopicsFileUpload}
                  style={{ display: "none" }}
                />

                <IconButton
                  text="Import danh sách đề tài"
                  onClick={handleButtonClick}
                  iconLeft={"/assets/icons/upload-white.svg"}
                  iconWidth={16}
                  iconHeight={16}
                />
              </div>
              {dataTable.length > 0 && (
                <IconButton text="Lưu" onClick={() => {}} otherClasses="ml-2" />
              )}
            </div>

            <a
              href="/assets/KTLN - template import ds đề tài.xlsx"
              download
              className=" text-blue-500 underline text-base italic"
            >
              Tải xuống template file import danh sách đề tài
            </a>
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
            <NoResult
              title="Không có dữ liệu!"
              description="🚀 Import file danh sách để thấy được dữ liệu."
              linkTitle="Import danh sách đề tài"
              handleFileUpload={handleTopicsFileUpload}
            />
          )}
        </>
      )}

      <AlertDialog open={isCreateNew}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Đăng đề tài mới
            </AlertDialogTitle>
          </AlertDialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* NAME ANNOUCEMENT */}
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Tên đề tài <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <Input
                          {...field}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                        Mô tả đề tài <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl className="mt-3.5 ">
                        <textarea
                          {...field}
                          placeholder="Nhập mô tả..."
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

                <>
                  <FormField
                    control={form.control}
                    // @ts-ignore
                    name="studentList"
                    render={({ field }) => (
                      <FormItem className="flex w-full flex-col">
                        <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                          Danh sách thành viên nhóm{" "}
                          <span className="text-red-600">*</span>
                        </FormLabel>
                        <FormDescription className="body-regular mt-2.5 text-light-500">
                          Nhóm trưởng điền tên đầu tiên. Thành viên nhóm phải là
                          sinh viên của lớp hiện tại.
                        </FormDescription>
                        {/* //!: API setting của lớp học để hiển thị cái này */}
                        <FormDescription className="body-regular mt-2.5 text-light-500">
                          Hoặc thành viên nhóm có thể là sinh viên khác lớp,
                          nhưng phải cùng giảng viên giảng dạy và cùng môn học.
                        </FormDescription>
                        <FormControl className="mt-3.5 ">
                          <div className="mt-6">
                            <div>
                              <div className="relative" ref={ref}>
                                <Input
                                  ref={studentIdRef}
                                  onChange={handleChange}
                                  name="studentIdRef"
                                  placeholder={placeholder}
                                  onFocus={handleFocus}
                                  className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[46px] border"
                                />
                                {suggestion && (
                                  <div
                                    className="absolute left-0 z-50 w-full mt-1 bg-white cursor-pointer p-2 rounded-md border normal-regular no-focus text-dark300_light700 min-h-[46px] shadow-lg"
                                    onClick={handleSuggestionClick}
                                  >
                                    {isHasStudentInDb()?.id} -{" "}
                                    {isHasStudentInDb()?.name} -{" "}
                                    {isHasStudentInDb()?.class}
                                  </div>
                                )}
                              </div>
                              {selectedStudents.length > 0 ? (
                                <BorderContainer otherClasses="mt-3">
                                  <div className="my-4 ml-4">
                                    {selectedStudents && (
                                      <div className="flex flex-col gap-4">
                                        {selectedStudents.map((item, index) => (
                                          <div key={item.id}>
                                            <StudentItem
                                              item={item}
                                              index={index}
                                              courseId={courseId}
                                              selectedStudents={
                                                selectedStudents
                                              }
                                              setSelectedStudents={
                                                setSelectedStudents
                                              }
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </BorderContainer>
                              ) : null}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateNew(false);
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
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ListTopic;
