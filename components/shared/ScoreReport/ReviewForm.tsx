"use client";

import BorderContainer from "@/components/shared/BorderContainer";
import IconButton from "@/components/shared/Button/IconButton";
import SubmitButton from "@/components/shared/Button/SubmitButton";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import GeneralOfReport from "./GeneralOfReport";
import InputForm from "./InputForm";
import SubGeneralOfReport from "./SubGeneralOfReport";
import TableForm from "./TableForm";

interface Props {
  isReviewer: boolean;
}

const ReviewForm = (params: Props) => {
  const [formData, setFormData] = useState({
    topicTitle: "",
    student1Name: "",
    student1ID: "",
    student2Name: "",
    student2ID: "",
    reviewerName: "",
    totalPages: "",
    totalChapters: "",
    totalFigures: "",
    totalTables: "",
    totalReferences: "",
    overviewComment: "",
    researchContentComment: "",
    applicationProgramComment: "",
    studentAttitudeComment: "",
    otherComments: "",

    acknowledgements: false,
    overviewVN: false,
    overviewEN: false,
    abbreviations: false,
    tableOfContents: false,
  });

  const [selectedThesisStatus, setSelectedThesisStatus] = useState(-1);
  const [selectedThesisRating, setSelectedThesisRating] = useState(-1);

  const statusThesis = [
    { id: 1, value: "Đạt" },
    { id: 2, value: "Không đạt" },
  ];
  const ratingThesis = [
    { id: 1, value: "Xuất sắc" },
    { id: 2, value: "Giỏi" },
    { id: 3, value: "Khá" },
    { id: 4, value: "Trung bình" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, checked } = target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <BorderContainer otherClasses="py-10 px-10">
      <form onSubmit={handleSubmit} className="review-form">
        {/* HEADER */}

        <div className="mb-10 flex justify-between gap-4 text-center">
          <div>
            <p className="base-regular">ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH</p>
            <p className="base-semibold">TRƯỜNG ĐẠI HỌC</p>
            <p className="base-semibold">CÔNG NGHỆ THÔNG TIN</p>
          </div>

          <div>
            <p className="base-semibold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p className="base-semibold">Độc Lập - Tự Do - Hạnh Phúc</p>
            <p className="base-regular">TP. HCM, ngày 8 tháng 12 năm 2024</p>
          </div>
        </div>

        <div className="text-center flex flex-col gap-4">
          <p className="paragraph-semibold">NHẬN XÉT KHÓA LUẬN TỐT NGHIỆP</p>
          {params.isReviewer ? (
            <p className="paragraph-semibold">CỦA CÁN BỘ PHẢN BIỆN</p>
          ) : (
            <p className="paragraph-semibold">CỦA CÁN BỘ HƯỚNG DẪN</p>
          )}
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {/*  //TODO: TÊN ĐỀ TÀI */}
          <div className=" flex items-center gap-4">
            <label className="base-semibold">Tên đề tài: </label>
            <label className="base-regular">
              Ứng dụng quản lý lớp học - Class Management System
            </label>
          </div>

          {/*  //TODO: THÔNG TIN SV, CÁN BỘ */}
          <div className="flex gap-10">
            <div className="w-[60%]">
              <label className="base-semibold">Sinh viên thực hiện: </label>

              {/*  SINH VIÊN 1 */}
              <div className="mt-2 flex items-center gap-4">
                <label className="base-regular">
                  1. Nguyễn Hoàng Linh - 21522289
                </label>
              </div>

              {/*  SINH VIÊN 2 */}
              <div className="mt-2 flex items-center gap-4">
                <label className="base-regular">
                  2. Lê Thành Lộc - 21521087
                </label>
              </div>
            </div>

            {/*  CÁN BỘ */}
            <div className="w-[40%]">
              <label className="base-semibold">Cán bộ phản biện: </label>
              <div className="mt-2 flex items-center gap-4">
                <label className="base-regular">Huỳnh Hồ Thị Mộng Trinh</label>
              </div>
            </div>
          </div>

          {/* //TODO: ĐÁNH GIÁ KHÓA LUẬN */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="base-semibold">Đánh giá khóa luận: </label>
            </div>

            {/* //? Tổng quan về cuốn báo cáo: */}

            <div className="flex flex-col gap-4">
              <div>
                <label className="pt-6 base-semibold">
                  1. Tổng quan về cuốn báo cáo:
                </label>
              </div>

              {params.isReviewer ? (
                <GeneralOfReport
                  totalPages={formData.totalPages}
                  totalChapters={formData.totalChapters}
                  totalFigures={formData.totalFigures}
                  totalTables={formData.totalTables}
                  totalReferences={formData.totalReferences}
                  overviewComment={formData.overviewComment}
                  handleChange={handleChange}
                />
              ) : (
                <div className="flex gap-20">
                  <div className="w-[60%]">
                    <GeneralOfReport
                      totalPages={formData.totalPages}
                      totalChapters={formData.totalChapters}
                      totalFigures={formData.totalFigures}
                      totalTables={formData.totalTables}
                      totalReferences={formData.totalReferences}
                      overviewComment={formData.overviewComment}
                      handleChange={handleChange}
                    />
                  </div>
                  <div className="w-[30%]">
                    <SubGeneralOfReport
                      acknowledgements={formData.acknowledgements}
                      overviewVN={formData.overviewVN}
                      overviewEN={formData.overviewEN}
                      abbreviations={formData.abbreviations}
                      tableOfContents={formData.tableOfContents}
                      handleClick={handleClick}
                    />
                  </div>
                </div>
              )}

              <label className="base-regular italic">
                &lt;nhận xét về định dạng, cách thức viết báo cáo, văn phong,
                phân bố nội dung, chương mục có hợp lý không&gt;
              </label>
              <div className="flex-grow">
                <InputForm
                  placeholder="Nhận xét"
                  name="overviewComment"
                  value={formData.overviewComment}
                  onChange={handleChange}
                  otherClassess="w-full"
                  isLongText
                />
              </div>
            </div>

            {/* //? Nhận xét chung */}
            <div className="flex flex-col gap-4">
              <div>
                <label className=" base-semibold">2. Nhận xét chung:</label>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <label className="base-regular underline">
                  a. Về nội dung nghiên cứu:
                </label>
                <label className="base-regular italic">
                  &lt;nhận xét về kiến thức, phương pháp mà sinh viên đã tìm
                  hiểu, nghiên cứu nhận xét ưu điểm và hạn chế&gt;
                </label>
                <div className="flex-grow">
                  <InputForm
                    placeholder="Nhận xét"
                    name="researchContentComment"
                    value={formData.researchContentComment}
                    onChange={handleChange}
                    otherClassess="w-full"
                    isLongText
                  />
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <label className="base-regular underline">
                  b. Về chương trình ứng dụng:
                </label>
                <label className="base-regular italic">
                  &lt;nhận xét về việc xây dựng ứng dụng demo, nhận xét ưu điểm
                  và hạn chế&gt;
                </label>
                <div className="flex-grow">
                  <InputForm
                    placeholder="Nhận xét"
                    name="applicationProgramComment"
                    value={formData.applicationProgramComment}
                    onChange={handleChange}
                    otherClassess="w-full"
                    isLongText
                  />
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <label className="base-regular underline">
                  c. Về thái độ làm việc của sinh viên:
                </label>
                <label className="base-regular italic">
                  &lt;nhận xét về thái độ, ưu khuyết điểm của từng sinh viên
                  tham gia&gt;
                </label>
                <div className="flex-grow">
                  <InputForm
                    placeholder="Nhận xét"
                    name="studentAttitudeComment"
                    value={formData.studentAttitudeComment}
                    onChange={handleChange}
                    otherClassess="w-full"
                    isLongText
                  />
                </div>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <label className="base-regular underline">
                  d. Ý kiến khác:
                </label>
                <label className="base-regular italic">
                  &lt;nhận xét ưu điểm khác hoặc hạn chế, điểm cần bổ sung,
                  chỉnh sửa của khóa luận tốt nghiệp hoặc câu hỏi liên quan cần
                  được làm rõ&gt;
                </label>
                <div className="flex-grow">
                  <InputForm
                    placeholder="Nhận xét"
                    name="otherComments"
                    value={formData.otherComments}
                    onChange={handleChange}
                    otherClassess="w-full"
                    isLongText
                  />
                </div>
              </div>
            </div>

            {/* //? Phần chấm điểm của cán bộ hướng dẫn */}
            <div className="flex flex-col gap-4">
              <div>
                <label className=" base-semibold">
                  3. Phần chấm điểm của cán bộ hướng dẫn:
                </label>
              </div>

              <div className="ml-4 flex flex-col gap-2">
                <TableForm />
              </div>
            </div>

            {/* //? Phần chấm điểm của cán bộ hướng dẫn */}
            <div className="flex flex-col gap-4">
              <div>
                <label className=" base-semibold">4. Đánh giá chung:</label>
              </div>

              <div className="ml-4 flex gap-4 items-center">
                <span className="base-regular">- Kết quả: </span>

                <Dropdown
                  className="z-30 rounded-lg"
                  label=""
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <div>
                      <IconButton
                        text={`${
                          selectedThesisStatus !== -1
                            ? statusThesis[selectedThesisStatus - 1].value
                            : "Chọn kết quả"
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
                    {statusThesis.map((course: any, index) => (
                      <Dropdown.Item
                        key={`${course}_${index}`}
                        onClick={() => {
                          if (selectedThesisStatus === course.id) {
                            setSelectedThesisStatus(-1);
                          } else {
                            setSelectedThesisStatus(course.id);
                          }
                        }}
                      >
                        <div className="flex justify-between w-full gap-4">
                          <p className="text-left line-clamp-1">
                            {course.value}
                          </p>
                          {selectedThesisStatus === course.id ? (
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

                <span className="base-regular">
                  yêu cầu của Khóa luận tốt nghiệp.
                </span>
              </div>

              <div className="ml-4 flex gap-4 items-center">
                <span className="base-regular">- Xếp loại:</span>

                <Dropdown
                  className="z-30 rounded-lg"
                  label=""
                  dismissOnClick={true}
                  renderTrigger={() => (
                    <div>
                      <IconButton
                        text={`${
                          selectedThesisRating !== -1
                            ? ratingThesis[selectedThesisRating - 1].value
                            : "Chọn xếp loại"
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
                    {ratingThesis.map((course: any, index) => (
                      <Dropdown.Item
                        key={`${course}_${index}`}
                        onClick={() => {
                          if (selectedThesisRating === course.id) {
                            setSelectedThesisRating(-1);
                          } else {
                            setSelectedThesisRating(course.id);
                          }
                        }}
                      >
                        <div className="flex justify-between w-full gap-4">
                          <p className="text-left line-clamp-1">
                            {course.value}
                          </p>
                          {selectedThesisRating === course.id ? (
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
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-20 gap-2">
          <SubmitButton text="Lưu" otherClasses="w-fit" />
          <IconButton text="Tạm lưu" temp otherClasses="w-fit" />
          <IconButton text="Hủy" red otherClasses="w-fit" onClick={() => {}} />
        </div>
      </form>
    </BorderContainer>
  );
};

export default ReviewForm;
