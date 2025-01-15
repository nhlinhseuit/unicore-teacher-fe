//? Data lấy về ở dạng ICourseResponseData, cần convert sang TopicDataItem

import { ITopicResponseData, TopicDataItem } from "@/types/entity/Topic";

export const convertToDataTableTopicsViKeys = (
  data: ITopicResponseData[]
): TopicDataItem[] => {
  return data.map((item, index) => {
    return {
      STT: (index + 1).toString(), // Gán số thứ tự theo thứ tự trong mảng
      type: "topic",
      isDeleted: false,
      data: {
        "GV phụ trách": item.teacher_names.join(", ") || "Không có", // Ghép tên GV hoặc để "Không có"
        "Mã đề tài": item.id,
        "Tên đề tài tiếng Việt": item.name,
        "Tên đề tài tiếng Anh": item.nameEn,
        "Mô tả": item.description,
        "Mã nhóm": item.evaluatorCode,
        MSSV: item.selectors, // Sử dụng selectors cho danh sách MSSV
        SĐT: [], // Thêm dữ liệu nếu cần từ nguồn khác
        "Họ và tên": item.teacher_names, // Dùng teacher_names để làm ví dụ
      },
    };
  });
};

//! LÀ PARAMS LUÔN
//? Data import vào ở dạng TopicDataItem, cần convert sang ICourseResponseData
export const convertToAPIDataTableTopics = ({
  data,
}: {
  data: TopicDataItem[];
}) => {
  const classesData = data.map((item, index) => {
    return {
      name: item.data["Tên đề tài tiếng Việt"],
      nameEn: item.data["Tên đề tài tiếng Anh"],
      description: item.data["Mô tả"],
      limit: 1,
      teacher_names: [item.data["GV phụ trách"]],
    };
  });

  return {
    topics: classesData,
  };
};
