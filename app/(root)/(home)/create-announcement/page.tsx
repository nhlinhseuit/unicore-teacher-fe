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
import PreviewImage from "@/components/shared/Annoucements/PreviewImage";
import RenderFile from "@/components/shared/Annoucements/RenderFile";
import ClosedButton from "@/components/shared/Annoucements/ClosedButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import CategoryItem from "@/components/shared/Annoucements/CategoryItem";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
  MAX_CATEGORIES,
  MAX_FILE_VALUE,
} from "@/constants";
import { useToast } from "@/hooks/use-toast";

// ! CẬP NHẬT
const type: any = "create";

const targetList = [
  { id: 1, value: "Giảng viên" },
  { id: 2, value: "Sinh viên" },
  { id: 3, value: "Tất cả" },
];

const categoryList = [
  {
    id: 1,
    value: "Thông báo - tin tức Thông báo - tin tức Thông báo - tin tức",
  },
  { id: 2, value: "Khoa học - Công nghệ" },
  { id: 3, value: "Sự kiện nổi bật" },
  { id: 4, value: "Thông báo - tin tức" },
  { id: 5, value: "Khoa học - Công nghệ" },
  { id: 6, value: "Sự kiện nổi bật" },
  { id: 7, value: "Thông báo - tin tức" },
  { id: 8, value: "Khoa học - Công nghệ" },
  { id: 9, value: "Sự kiện nổi bật" },
];

const CreateAnnouncement = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const [previewImage, setPreviewImage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [checkedCategory, setCheckedCategory] = useState<number[]>([]);
  const [selectedTarget, setSelectedTarget] = useState(1);

  const toggleCategory = (id: number) => {
    setCheckedCategory(
      (prevChecked) =>
        prevChecked.includes(id)
          ? prevChecked.filter((catId) => catId !== id) // Bỏ nếu đã có
          : [...prevChecked, id] // Thêm nếu chưa có
    );
  };

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      if (image.size > MAX_FILE_SIZE) {
        toast({
          title: `Kích thước ảnh vượt quá ${MAX_FILE_VALUE}MB.`,
          description: "Vui lòng chọn file nhỏ hơn.",
          variant: "error",
          duration: 3000,
        });
        return;
      }

      if (image.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(image);
        setPreviewImage(imageURL);
      } else {
        alert("Vui lòng chọn một file ảnh (png, jpg, jpeg, ...)");
      }
    }
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

  // ! MÔ PHỎNG UPLOAD FILES
  const uploadFiles = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    // Mô phỏng gọi API
    try {
      const response = await fetch("https://api.example.com/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        console.log("Files uploaded successfully");
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  // Tạo một reference để liên kết với thẻ input file
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleFileButtonClick = () => {
    fileRef.current?.click();
  };

  const imageRef = useRef<HTMLInputElement | null>(null);
  const handleImageButtonClick = () => {
    imageRef.current?.click();
  };

  // TODO: HỆ THỐNG TỰ GHI NHẬN NGƯỜI ĐĂNG

  const VALID_CATEGORY_IDS = checkedCategory.map((item) => item.toString());

  const AnnoucementSchema = z
    .object({
      title: z
        .string()
        .min(5, { message: "Tiêu đề phải chứa ít nhất 5 ký tự" })
        .max(130),
      description: z
        .string()
        .min(20, { message: "Nội dung thông báo phải chứa ít nhất 20 ký tự" }),
      image: z.any(),
      file: z.any(),
      category: z.any(),
      target: z.number().optional(),
    })
    .refine(
      (data) => {
        checkedCategory.length > 0 && checkedCategory.length <= 3;
      },
      {
        message: "Bạn phải chọn ít nhất 1 danh mục và không quá 3 danh mục",
        path: ["category"],
      }
    )
    .refine((data) => previewImage !== "", {
      message: `Trường ảnh bìa là bắt buộc. File phải có định dạng ảnh (jpg, png, svg) và kích thước tối đa ${MAX_FILE_VALUE}MB`,
      path: ["image"],
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
      image: undefined,
      file: undefined,
      category: [],
      target: undefined,
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

        image: previewImage,
        file: selectedFiles,
        category: checkedCategory,
        target: selectedTarget,
        path: pathName,
      });

      // naviate to home page
      router.push("/");

      toast({
        title: "Tạo thông báo thành công.",
        description: `Thông báo đã được gửi đến ${
          targetList.find((item) => item.id === selectedTarget)?.value
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
                      Thông tin chi tiết của thông báo. Tối thiểu 20 kí tự. Nhấn
                      tổ hợp Ctrl + V để chèn hình ảnh.
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
              {/* CATEGORY */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Danh mục <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <div className="w-full rounded-[10px] no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border">
                        <div className="flex flex-wrap w-full gap-4 p-4">
                          {categoryList.map((item) => (
                            <CategoryItem
                              key={item.id}
                              item={item}
                              checked={checkedCategory.includes(item.id)}
                              onClick={() => toggleCategory(item.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Có thể gắn tối đa 5 danh mục để miêu tả loại của thông báo
                      này.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* TARGET */}
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                      Chọn đối tượng <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      {/* <Input
                        {...field}
                        placeholder="Nhập tên thông báo..."
                        className="
                          no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      /> */}
                      <Dropdown
                        className="z-30 rounded-lg"
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <div>
                            <IconButton
                              text="Đối tượng"
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
                          {targetList.map((target, index) => (
                            <Dropdown.Item
                              key={`${target}_${index}`}
                              onClick={() => {
                                setSelectedTarget(target.id);
                              }}
                            >
                              <div className="flex justify-between w-full">
                                <p className="w-[80%] text-left line-clamp-1">
                                  {target.value}
                                </p>
                                {selectedTarget === target.id ? (
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
                      Chọn đối tượng mà thông báo này hướng đến, có thể là giảng
                      viên, sinh viên, tất cả...
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              {/* CHOOSE image */}
              <div>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-6">
                      <div>
                        <div className="flex items-center">
                          <span className="mr-4 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Ảnh bìa <span className="text-red-600">*</span>
                          </span>
                          <>
                            <input
                              ref={imageRef}
                              type="file"
                              accept="image/*"
                              onChange={handleChooseImage}
                              style={{ display: "none" }}
                            />

                            <PickFileImageButton
                              handleButtonClick={handleImageButtonClick}
                              icon={"/assets/icons/photo.svg"}
                              alt={"file"}
                              text="Chọn ảnh"
                            />
                          </>
                        </div>
                        <p className="body-regular mt-2.5 text-light-500">
                          Ảnh có thể là định dạng jpg, png, svg... Tối đa{" "}
                          {MAX_FILE_VALUE}MB.
                        </p>
                      </div>

                      <div className="w-full">
                        {/* Hiển thị ảnh xem trước nếu có */}
                        {previewImage ? (
                          <PreviewImage
                            icon={previewImage}
                            alt={"previewImage"}
                          />
                        ) : (
                          <PreviewImage
                            icon={"/assets/images/upload.svg"}
                            alt={"previewImage"}
                          />
                        )}
                      </div>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-12 gap-2">
            <SubmitButton text="Đăng" otherClasses="w-fit" />
            <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
            <IconButton text="Hủy" red otherClasses="w-fit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAnnouncement;
