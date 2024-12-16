import IconButton from "@/components/shared/Button/IconButton";
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
import { mockDbStudent } from "@/mocks";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BorderContainer from "@/components/shared/BorderContainer";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import StudentItem from "@/components/shared/StudentItem";
import { maxStudentPerGroup, minStudentPerGroup } from "@/constants";
import Student from "@/types/entity/Student";
import { usePathname } from "next/navigation";
import TextAreaComponent from "@/components/shared/TextAreaComponent";

interface Props {
  isCreateNew: boolean;
  handleSetCreateNew: (value: boolean) => void;
}

const AlertCreateNewTopic = (params: Props) => {
  const pathName = usePathname();
  const courseId = pathName.split("/")[2];
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [description, setDescription] = useState("");
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

  const AnnoucementSchema = z
    .object({
      titleVi: z
        .string()
        .min(5, { message: "Tên đề tài phải chứa ít nhất 5 ký tự" })
        .max(130),
      titleEn: z
        .string()
        .min(5, { message: "Tên đề tài phải chứa ít nhất 5 ký tự" })
        .max(130),
      description: z.string().optional(),
      studentList: z.string().optional(),
    })
    .refine(() => description.length >= 20, {
      message: `Nội dung đề tài phải chứa ít nhất 20 ký tự`,
      path: ["description"],
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
      titleVi: "",
      titleEn: "",
      description: "",
    },
  });

  const { reset } = form;

  async function onSubmit(values: any) {
    try {
      console.log({
        titleVi: values.titleVi,
        titleEn: values.titleEn,
        description: description,
      });

      // naviate to home page
      // router.push("/");

      toast({
        title: "Đăng đề tài mới thành công.",
        variant: "success",
        duration: 3000,
      });

      params.handleSetCreateNew(false);
      reset({
        titleVi: "",
        titleEn: "",
        description: "",
      });
    } catch {
    } finally {
    }
  }

  return (
    <AlertDialog open={params.isCreateNew}>
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
                name="titleVi"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tên đề tài tiếng Việt<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <Input
                        {...field}
                        placeholder="Nhập tên đề tài tiếng Việt..."
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
                name="titleEn"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Tên đề tài tiếng Anh<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <Input
                        {...field}
                        placeholder="Nhập tên đề tài tiếng Anh..."
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
                      <TextAreaComponent
                        value={description}
                        placeholder="Nhập mô tả..."
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
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
                        Hoặc thành viên nhóm có thể là sinh viên khác lớp, nhưng
                        phải cùng giảng viên giảng dạy và cùng môn học.
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
                                            selectedStudents={selectedStudents}
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
              <IconButton
                cancel
                text={"Hủy"}
                onClick={() => {
                  params.handleSetCreateNew(false);
                }}
              />
              <SubmitButton text={"Đồng ý"} />
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCreateNewTopic;
