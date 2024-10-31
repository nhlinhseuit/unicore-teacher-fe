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
import PickFilePhotoButton from "@/components/shared/Table/Annoucements/PickFilePhotoButton";
import Category from "@/components/shared/Table/Annoucements/Category";
import PreviewPhoto from "@/components/shared/Table/Annoucements/PreviewPhoto";

const type: any = "create";

const CreateAnnouncement = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  // Tạo một reference để liên kết với thẻ input file
  const fileAnnoucementRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileAnnoucementRef.current?.click();
  };

  // TODO: HỆ THỐNG TỰ GHI NHẬN NGƯỜI ĐĂNG

  // 1. Define your form.
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      file: null as File | null,
      category: [],
      target: [],
      photo: null as File | null,
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
        content: values.explanation,
        category: values.category,
        author: JSON.parse("123123"),
        path: pathName,
      });

      router.push("/");

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

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "category") {
      e.preventDefault();

      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("category", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
      }

      if (!field.value.includes(tagValue as never)) {
        // @ts-ignore
        form.setValue("category", [...field.value, tagValue]);
        tagInput.value = "";
        form.clearErrors("category");
      } else {
        form.trigger();
      }
    }
  };

  const tinymceKey = process.env.NEXT_PUBLIC_TINYMCE_EDITOR_API_KEY;

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

              {/* TAGS */}
              {/* <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel className="text-dark400_light800  text-[14px] font-semibold leading-[20.8px]">
                      Category <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl className="mt-3.5 ">
                      <>
                        <Input
                          onKeyDown={(e) => handleInputKeyDown(e, field)}
                          placeholder="Thêm category..."
                          className="
                              no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                        />
  
                        {field.value.length > 0 && (
                          <div className="flex-start mt-2.5 gap-2.5">
                            {field.value.map((tag: any) => {
                              return (
                                <Badge
                                  key={tag}
                                  onClick={() => handleTagRemove(tag, field)}
                                  className="
                                      subtle-medium 
                                      background-light800_dark300 
                                      text-light400_light500
                                      flex
                                      items-center
                                      justify-center
                                      gap-2
                                      rounded-md
                                      border-none px-4 py-2 capitalize"
                                >
                                  {tag}
                                  <Image
                                    src="/assets/icons/close.svg"
                                    alt="Close icon"
                                    width={12}
                                    height={12}
                                    className="cursor-pointer object-contain invert-0 dark:invert"
                                  />
                                </Badge>
                              );
                            })}
                          </div>
                        )}
                      </>
                    </FormControl>
                    <FormDescription className="body-regular mt-2.5 text-light-500">
                      Có thể gắn tới 3 category để miêu tả loại của thông báo này. Bạn
                      cần ấn Enter để nhập một tag.
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              /> */}

              {/* CHOOSE FILE */}
              <div>
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <div className="flex items-center">
                        <span className="mr-4 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                          File đính kèm
                        </span>
                        <>
                          <input
                            ref={fileAnnoucementRef}
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={() => {}}
                            style={{ display: "none" }}
                          />

                          <PickFilePhotoButton
                            handleButtonClick={handleButtonClick}
                            icon={"/assets/icons/attach_file.svg"}
                            alt={"file"}
                            text="Chọn file"
                          />
                        </>
                      </div>
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
                      <Category />
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

              {/* CHOOSE PHOTO */}
              <div>
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-6">
                      <div>
                        <div className="flex items-center">
                          <span className="mr-4 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                            Ảnh bìa <span className="text-red-600">*</span>
                          </span>
                          <>
                            <input
                              ref={fileAnnoucementRef}
                              type="file"
                              accept=".xlsx, .xls"
                              onChange={() => {}}
                              style={{ display: "none" }}
                            />

                            <PickFilePhotoButton
                              handleButtonClick={handleButtonClick}
                              icon={"/assets/icons/photo.svg"}
                              alt={"file"}
                              text="Chọn ảnh"
                            />
                          </>
                        </div>
                        <p className="body-regular mt-2.5 text-light-500">
                          File đính kèm có thể ở các định dạng: docx, pdf, pptx,
                          xlsx, txt... Tối đa 25MB.
                        </p>
                      </div>

                      <div className="w-full">
                        <PreviewPhoto
                          icon={"/assets/images/department-annoucement.svg"}
                          alt={"previewPhoto"}
                        />
                      </div>

                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-12 gap-2">
            <IconButton text="Đăng" otherClasses="w-fit" />
            <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
            <IconButton text="Hủy" red otherClasses="w-fit" />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateAnnouncement;
