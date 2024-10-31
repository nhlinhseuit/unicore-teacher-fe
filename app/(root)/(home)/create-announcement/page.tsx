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
import { Badge, Button, Dropdown } from "flowbite-react";
import IconButton from "@/components/shared/IconButton";
import PickFileImageButton from "@/components/shared/Table/Annoucements/PickFileImageButton";
import Category from "@/components/shared/Table/Annoucements/Category";
import PreviewImage from "@/components/shared/Table/Annoucements/PreviewImage";
import RenderFile from "@/components/shared/RenderFile";
import ClosedButton from "@/components/shared/Table/Annoucements/ClosedButton";
import SubmitButton from "@/components/shared/SubmitButton";

const type: any = "create";

const files = [
  { _id: "1", name: "thong_bao_dinh_kem.docx" },
  { _id: "2", name: "thong_bao_dinh_kem.docx" },
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

  const handleChooseImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      if (image.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(image);
        console.log("imageURL", imageURL);
        setPreviewImage(imageURL);
      } else {
        alert("Vui lòng chọn một file ảnh (png, jpg, jpeg, ...)");
      }
    }
  };

  const handleChooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChooseFile");
    const files = event.target.files;
    if (files) {
      console.log("setSelectedFiles", files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
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

  // 1. Define your form.
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null as File | null,
      file: [],
      category: [],
      target: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    console.log("here");

    setIsSubmitting(true);

    try {
      // make an async call to your API -> create a question
      // contain all form data

      console.log({
        title: values.title,
        description: values.description,
        image: values.image,
        file: values.file,
        category: values.category,
        target: values.target,
        path: pathName,
      });

      // ! PUSH
      // router.push("/");

      // naviate to home page
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("category", newTags);
  };

  const tinymceKey = process.env.NEXT_PUBLIC_TINYMCE_EDITOR_API_KEY;

  console.log("previewImage", previewImage);

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
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "codesample",
                          ],
                          toolbar:
                            "undo redo | blocks | " +
                            "codesample | bold italic forecolor | alignleft aligncenter |" +
                            "alignright alignjustify | bullist numlist ",
                          content_style:
                            "body { font-family:Inter; font-size:16px }",
                        }}
                      />
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Thông tin chi tiết của thông báo. Tối thiểu 20 kí tự.
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
                        xlsx, txt... Tối đa 25MB.
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
                      <Category categoryList={categoryList} />
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Có thể gắn tới 3 category để miêu tả loại của thông báo
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
                              otherClasses="w-full shadow-none no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 border "
                            />
                          </div>
                        )}
                      >
                        <Dropdown.Item>Giảng viên</Dropdown.Item>

                        <Dropdown.Item>Sinh viên</Dropdown.Item>

                        <Dropdown.Item>Tất cả</Dropdown.Item>
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
                          Ảnh có thể là định dạng jpg, png, svg... Tối đa 25MB.
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
                            icon={"/assets/images/department-annoucement.svg"}
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
