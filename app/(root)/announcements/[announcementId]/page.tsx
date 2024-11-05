"use client";

import AnnouncementDetail from "@/components/announcements/AnnouncementDetail";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const announcements = [
  {
    _id: "1",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "2",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
      { _id: "2", name: "Khoa học" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
  {
    _id: "3",
    title: "Đăng ký đề tài đồ án 1 và đồ án 2 học kỳ 1 năm học 2024 - 2025",
    description: `Khoa Công nghệ Phần mềm thông báo các sinh viên đăng ký học phần thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025 lớp SE501.P11 và SE501.P11.PMCL cập nhật thông tin thực tập doanh nghiệp vào các file sau từ nay đến ngày 15/09/2024.
      Lớp SE501.P11 
      Lớp SE501.P11.PMCL
      Lưu ý: Sinh viên nào chưa liên hệ được nơi thực tập thì cập nhật vào cột "Nơi thực tập" là "Chưa có".
      Để nắm được các thông tin chi tiết về việc thực tập doanh nghiệp học kỳ 1 năm học 2024 - 2025, đề nghị toàn bộ các sinh viên lớp SE501.P11 và SE501.P11.PMCL tham dự SEMINAR HƯỚNG DẪN THỰC TẬP DOANH NGHIỆP KHOA CÔNG NGHỆ PHẦN MỀM cụ thể như sau:
      1. Thời gian: 15h00 thứ sáu ngày 13/09/2024
      2. Hình thức: online trên MS Team với Passcode : r96y1rg
      3. Người trình bày: ThS. Lê Thanh Trọng_Phó Trưởng khoa Công nghệ Phần mềm`,
    tags: [
      { _id: "1", name: "Thông báo học vụ" },
      { _id: "2", name: "Khoa học - công nghệ" },
    ],
    files: [
      { _id: "1", name: "thong_bao_dinh_kem.docx" },
      { _id: "2", name: "thong_bao_dinh_kem.docx" },
    ],
    author: {
      _id: "2",
      name: "Trần Hạnh Xuân",
      picture: "jane-smith.jpg",
    },
    createdAt: "T2, 22/07/2024 - 09:45",
  },
];

const page = () => {
  const router = useRouter();

  // ! Get ID từ param, muốn truyền cả object qua route mới thì sd Context / Redux
  const params = useParams() as { announcementId: string };
  const { announcementId } = params;
  const question: any = announcements[parseInt(announcementId) - 1];

  return (
    <>
      <div
        className="flex justify-start mt-4 mb-6 text-sm cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src="/assets/icons/chevron-left-table.svg"
          alt="previous"
          width={21}
          height={21}
          className="cursor-pointer mr-2"
        />
        <p>Quay lại danh sách thông báo</p>
      </div>

      <AnnouncementDetail
        key={question._id}
        _id={question._id}
        title={question.title}
        description={question.description}
        tags={question.tags}
        files={question.files}
        author={question.author}
        createdAt={question.createdAt}
      />
    </>
  );
};

export default page;
