"use client";

import TopicGroupTable from "@/components/shared/BigExercise/TableTopic/TopicDataTable";
import IconButton from "@/components/shared/Button/IconButton";
import * as XLSX from "xlsx";
import { TopicDataItem } from "@/types";
import React, { useRef, useState } from "react";
import NoResult from "@/components/shared/Status/NoResult";
import TableSkeleton from "@/components/shared/Table/components/TableSkeleton";
import ErrorComponent from "@/components/shared/Status/ErrorComponent";
import BackToPrev from "@/components/shared/BackToPrev";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TopicRegisterGroupDataTable from "@/components/shared/BigExercise/TableRegisterStudent/TopicRegisterGroupDataTable";
import MiniButton from "@/components/shared/Button/MiniButton";

const ListTopic = () => {
  const mockTopicDataTable = [
    {
      type: "topic",
      STT: 1,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng hẹn hò",
        "Mô tả":
          "Kết nối người dùng với những người có sở thích tương tự Nơi người dùng có thể đăng tải và chia sẻ hình ảnh Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 2,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chia sẻ hình ảnh",
        "Mô tả": "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 3,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt hàng và giao đồ ăn",
        "Mô tả":
          "Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 4,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nhà thông minh",
        "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 5,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học ngôn ngữ",
        "Mô tả":
          "Một nền tảng giúp người dùng học các ngôn ngữ mới thông qua bài tập và trò chơi",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 6,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng ghi chú",
        "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 7,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý tài chính cá nhân",
        "Mô tả": "Giúp người dùng theo dõi chi tiêu và lập kế hoạch ngân sách",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 8,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chia sẻ xe",
        "Mô tả":
          "Kết nối người dùng có nhu cầu di chuyển với các tài xế gần đó",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 9,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chăm sóc sức khỏe",
        "Mô tả":
          "Theo dõi các chỉ số sức khỏe và cung cấp các bài tập luyện tập cá nhân hóa",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 10,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nấu ăn",
        "Mô tả": "Chia sẻ công thức nấu ăn và gợi ý món ăn hàng ngày",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 11,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng kết nối bạn bè",
        "Mô tả":
          "Giúp người dùng tìm kiếm và kết nối với bạn bè có sở thích chung",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 12,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học tập trực tuyến",
        "Mô tả": "Cung cấp các khóa học trực tuyến về nhiều lĩnh vực khác nhau",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 13,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt phòng khách sạn",
        "Mô tả":
          "Đặt phòng khách sạn với giá ưu đãi và nhiều tùy chọn tiện ích",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 14,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng theo dõi thể dục",
        "Mô tả": "Giúp người dùng theo dõi các hoạt động thể dục và sức khỏe",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 15,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng thời tiết",
        "Mô tả": "Cập nhật thời tiết hiện tại và dự báo thời tiết trong tuần",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 16,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý dự án",
        "Mô tả":
          "Giúp nhóm lên kế hoạch và theo dõi tiến độ công việc của dự án",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 17,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nhắn tin tức thời",
        "Mô tả":
          "Cho phép người dùng gửi tin nhắn văn bản và gọi video miễn phí",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 18,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý tài liệu",
        "Mô tả": "Giúp người dùng lưu trữ, tìm kiếm và chia sẻ tài liệu",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 19,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng tìm việc làm",
        "Mô tả":
          "Cung cấp thông tin tuyển dụng và kết nối ứng viên với nhà tuyển dụng",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 20,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đọc sách điện tử",
        "Mô tả": "Một nền tảng để người dùng tải và đọc sách điện tử",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 21,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nghe nhạc trực tuyến",
        "Mô tả": "Cho phép người dùng nghe và chia sẻ nhạc trực tuyến",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 22,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng mua sắm trực tuyến",
        "Mô tả": "Cung cấp các sản phẩm đa dạng và giao hàng tận nơi",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 23,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt lịch khám bệnh",
        "Mô tả":
          "Đặt lịch hẹn với bác sĩ và quản lý thông tin sức khỏe cá nhân",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 24,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý thời gian",
        "Mô tả": "Giúp người dùng lập lịch và theo dõi các nhiệm vụ hàng ngày",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 25,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đồ họa",
        "Mô tả": "Một công cụ thiết kế cho người dùng tạo ảnh và video đồ họa",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 26,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng hẹn hò",
        "Mô tả": "Kết nối người dùng với những người có sở thích tương tự",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 27,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học lập trình",
        "Mô tả":
          "Hướng dẫn người dùng học các ngôn ngữ lập trình qua các bài tập thực hành",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 28,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng podcast",
        "Mô tả": "Cung cấp các kênh podcast đa dạng về nhiều chủ đề",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 29,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng từ điển trực tuyến",
        "Mô tả": "Cho phép người dùng tra từ điển và học từ mới",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 30,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng thực tế ảo",
        "Mô tả": "Giúp người dùng trải nghiệm các môi trường thực tế ảo",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 31,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý nhân sự",
        "Mô tả":
          "Quản lý thông tin và hiệu suất làm việc của nhân viên trong công ty",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 32,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đồ họa",
        "Mô tả": "Một công cụ thiết kế cho người dùng tạo ảnh và video đồ họa",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 33,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chia sẻ hình ảnh",
        "Mô tả": "Nơi người dùng có thể đăng tải và chia sẻ hình ảnh",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 34,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt hàng và giao đồ ăn",
        "Mô tả":
          "Một ứng dụng áp dụng phiếu giảm giá tự động để đảm bảo cung cấp phiếu giảm giá và giảm giá cho khách hàng",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 35,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nhà thông minh",
        "Mô tả": "Giúp người dùng xây dựng một ngôi nhà thông minh và tiện lợi",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 36,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học ngôn ngữ",
        "Mô tả":
          "Một nền tảng giúp người dùng học các ngôn ngữ mới thông qua bài tập và trò chơi",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 37,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng ghi chú",
        "Mô tả": "Giúp người dùng ghi lại và tổ chức các ghi chú của mình",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 38,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý tài chính cá nhân",
        "Mô tả": "Giúp người dùng theo dõi chi tiêu và lập kế hoạch ngân sách",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 39,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chia sẻ xe",
        "Mô tả":
          "Kết nối người dùng có nhu cầu di chuyển với các tài xế gần đó",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 40,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng chăm sóc sức khỏe",
        "Mô tả":
          "Theo dõi các chỉ số sức khỏe và cung cấp các bài tập luyện tập cá nhân hóa",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 41,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nấu ăn",
        "Mô tả": "Chia sẻ công thức nấu ăn và gợi ý món ăn hàng ngày",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 42,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng kết nối bạn bè",
        "Mô tả":
          "Giúp người dùng tìm kiếm và kết nối với bạn bè có sở thích chung",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 43,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng học tập trực tuyến",
        "Mô tả": "Cung cấp các khóa học trực tuyến về nhiều lĩnh vực khác nhau",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 44,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt phòng khách sạn",
        "Mô tả":
          "Đặt phòng khách sạn với giá ưu đãi và nhiều tùy chọn tiện ích",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 45,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng theo dõi thể dục",
        "Mô tả": "Giúp người dùng theo dõi các hoạt động thể dục và sức khỏe",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 46,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng thời tiết",
        "Mô tả": "Cập nhật thời tiết hiện tại và dự báo thời tiết trong tuần",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 47,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý dự án",
        "Mô tả":
          "Giúp nhóm lên kế hoạch và theo dõi tiến độ công việc của dự án",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 48,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nhắn tin tức thời",
        "Mô tả":
          "Cho phép người dùng gửi tin nhắn văn bản và gọi video miễn phí",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 49,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý tài liệu",
        "Mô tả": "Giúp người dùng lưu trữ, tìm kiếm và chia sẻ tài liệu",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 50,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng tìm việc làm",
        "Mô tả":
          "Cung cấp thông tin tuyển dụng và kết nối ứng viên với nhà tuyển dụng",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 51,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đọc sách điện tử",
        "Mô tả": "Một nền tảng để người dùng tải và đọc sách điện tử",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 52,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng nghe nhạc trực tuyến",
        "Mô tả": "Cho phép người dùng nghe và chia sẻ nhạc trực tuyến",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
    {
      type: "topic",
      STT: 53,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng mua sắm trực tuyến",
        "Mô tả": "Cung cấp các sản phẩm đa dạng và giao hàng tận nơi",
        "GV phụ trách": "Huỳnh Hồ Thị Mộng Trinh",
      },
    },
    {
      type: "topic",
      STT: 54,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng đặt lịch khám bệnh",
        "Mô tả":
          "Đặt lịch hẹn với bác sĩ và quản lý thông tin sức khỏe cá nhân",
        "GV phụ trách": "Huỳnh Tuấn Anh",
      },
    },
    {
      type: "topic",
      STT: 55,
      isDeleted: false,
      data: {
        "Tên đề tài": "Ứng dụng quản lý thời gian",
        "Mô tả": "Giúp người dùng lập lịch và theo dõi các nhiệm vụ hàng ngày",
        "GV phụ trách": "Nguyễn Thị Thanh Trúc",
      },
    },
  ];

  const mockTopicRegisterGroupDataTable = [
    {
      STT: "1",
      data: {
        MSSV: "",
        SĐT: "",
        "Họ và tên": "",
      },
    },
  ];

  // Tạo một reference để liên kết với thẻ input file
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const [mockDataState, setMockDataState] = useState(
    mockTopicRegisterGroupDataTable
  );
  const mockDataRef = useRef(mockDataState);
  const updateMockDataRef = (newData: any) => {
    mockDataRef.current = newData;
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

  const AnnoucementSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Tên đề tài phải chứa ít nhất 5 ký tự" })
      .max(130),
    description: z
      .string()
      .min(20, { message: "Nội dung đề tài phải chứa ít nhất 20 ký tự" }),
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
        data: mockDataRef,
      });

      setMockDataState(mockTopicRegisterGroupDataTable);

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
                  <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-red-900 text-dark400_light800 text-[14px] font-semibold leading-[20.8px]">
                    Danh sách nhóm (nếu đã có nhóm liên hệ trước)
                  </label>
                  <TopicRegisterGroupDataTable
                    isEditTable={false}
                    isMultipleDelete={false}
                    dataTable={mockDataState}
                    onChangeTable={(newValue) => {
                      updateMockDataRef(newValue);
                    }}
                  />
                </>
              </div>

              <div className="relative flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                {/* mt-4 cho nên translate 7 */}
                <div className="absolute left-[50%] -translate-y-7">
                  <MiniButton
                    key={1}
                    value={2}
                    icon={"/assets/icons/add.svg"}
                    bgColor="bg-primary-500"
                    onClick={(value) => {
                      // setSelectedMiniButton(value);

                      const newEntry = {
                        STT: (mockDataRef.current.length + 1).toString(),
                        data: {
                          MSSV: "",
                          SĐT: "",
                          "Họ và tên": "",
                        },
                      };

                      // Cập nhật mockDataRef mà không re-render `TopicRegisterGroupDataTable`
                      updateMockDataRef([...mockDataRef.current, newEntry]);

                      // Cập nhật mockDataState để re-render những phần khác trong UI
                      setMockDataState([...mockDataRef.current]);
                    }}
                    otherClasses={"w-[26px] h-[26px] mr-10"}
                  />
                </div>

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
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 h-9 px-4 py-2"
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
