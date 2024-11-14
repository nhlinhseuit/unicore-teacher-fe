"use client";

import React from "react";
import RegisterTopicTable from "@/components/shared/Table/TableRegisterTopic/RegisterTopicTable";
import IconButton from "@/components/shared/Button/IconButton";
import { RegisterTopicTableType } from "@/constants";

const ApproveTopic = () => {
  const mockDataStudentRegisterTopic = [
    {
      // TODO: Kh cần stt của sv ở đây
      // TODO: Hiện tại chỉ dùng làm key
      // * FIX: STT count ++ cho row leader

      STT: "1",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng hẹn hò",
        "Mô tả":
          "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
        "Mã nhóm": "1",
        "Tên nhóm": "Figma",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Hoàng Linh",
      },
    },
    {
      STT: "2",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chia sẻ hình ảnh",
        "Mô tả":
          "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
        "GV phụ trách": "Huỳnh Tuấn Anh",
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Lê Thành Lộc",
      },
    },
    {
      STT: "3",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt hàng và giao đồ ăn",
        "Mô tả":
          "Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
        "Mã nhóm": "2",
        "Tên nhóm": "STYLLE",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      STT: "4",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nhà thông minh",
        "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Tiến Vĩ",
      },
    },
    {
      STT: "5",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học ngôn ngữ",
        "Mô tả":
          "Một nền tảng giúp người dùng học các ngôn ngữ mới thông qua bài tập và trò chơi",
        "GV phụ trách": "Huỳnh Tuấn Anh",
        "Mã nhóm": "3",
        "Tên nhóm": "MERN",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Nguyễn Thị Thanh Tuyền",
      },
    },
    {
      STT: "6",
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng ghi chú",
        "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
        "Mã nhóm": "4",
        "Tên nhóm": "Đom đóm",
        MSSV: "21522289",
        SĐT: "0378060972",
        "Họ và tên": "Võ Hữu Xike",
      },
    },
  ];

  return (
    <>
      <RegisterTopicTable
        type={RegisterTopicTableType.approveTopic}
        isEditTable={false}
        isMultipleDelete={false}
        dataTable={mockDataStudentRegisterTopic}
      />

      
    </>
  );
};

export default ApproveTopic;
