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
  class_id,
  subclass_code,
  projectId,
}: {
  data: TopicDataItem[];
  class_id: string;
  subclass_code: string;
  projectId: string;
}) => {
  const classesData = data.map((item, index) => {
    return {
      name: item.data["Tên đề tài tiếng Việt"],
      description: item.data["Mô tả"],
      note: "",
      nameEn: item.data["Tên đề tài tiếng Anh"],
      projectId: projectId,
      groupRequest: {
        // "name": "string",
        members: item.data.MSSV.map((studentCode, index) => {
          return {
            name: item.data["Họ và tên"][index],
            phone: item.data.SĐT[index],
            student_code: studentCode,
            class_id: class_id,
            subclass_code: subclass_code,
          };
        }),

        // [
        //   {
        //     "name": "string",
        //     "phone": "string",
        //     "student_code": "string",
        //     // "class_id": "string",
        //     // "subclass_code": "string",
        //     // "group_name": "string"
        //   }
        // ]
      },
      teacher_mails: [item.data["Email giảng viên"]],
      teacher_codes: [item.data["Mã giảng viên"]],
      teacher_names: [item.data["GV phụ trách"]],
      // "student_id": "string"
    };
  });

  return {
    topics: classesData,
  };
};
