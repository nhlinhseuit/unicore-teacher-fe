import { CourseDataItem, ICourseResponseData } from "@/types/entity/Course";


export const convertToAPIHomeworkParams = ({
  data,
  organizationId,
}: {
  data: CourseDataItem[];
  organizationId: string;
}) => {
  const classesData = data.map((item, index) => {
    return {
      code: item.data["Mã lớp"],
      subject_code: item.data["Mã môn học"],
      // name: item.data["Tên môn học"],
      is_org_managed:
        item.data["Tên GV"].length === 0 ||
        (item.data["Tên GV"].length === 1 && item.data["Tên GV"][0] === ""),
      teacher_code: item.data["Mã GV"],
      teacher_name: item.data["Tên GV"],
      type: item.data["HTGD"],
      credits: parseInt(item.data["Số TC"], 10) || 0, // Chuyển số tín chỉ về số nguyên
      start_date: item.data["Ngày BĐ"],
      end_date: item.data["Ngày KT"],
      semester: item.data["Học kỳ"],
      year: item.data["Năm học"],
      // note: "", // Không có trường tương ứng trong model
    };
  });

  return {
    classes: classesData,
    organization_id: organizationId,
  };
};
