import { CourseDataItem, ICourseResponseData } from "@/types/entity/Course";

//? Data lấy về ở dạng ICourseResponseData, cần convert sang CourseDataItem

export const convertToDataTableCoursesViKeys = (
  data: ICourseResponseData[]
): CourseDataItem[] => {
  return data
    .flatMap((item) => {
      return item.subclasses.map((subclass) => {
        const requiredFields = {
          "Mã môn học": item.subject_code,
          "Mã lớp": subclass.code,
          "Tên môn học": item.subject_metadata.name ?? "",
          "Mã GV": subclass.teacher_code,
          "Tên GV": [], // Nếu cần tên GV, có thể sửa lại để lấy thông tin từ nguồn khác
          HTGD: subclass.type,
          "Số TC": subclass.credits.toString(),
          "Khoa quản lý": item.org_managed,
          "Ngày BĐ": subclass.start_date,
          "Ngày KT": subclass.end_date,
          "Học kỳ": item.semester,
          "Năm học": item.year,
        };

        return {
          type: "course",
          STT: "", // Tạm thời để trống, sẽ gán sau khi sắp xếp
          isDeleted: false,
          data: requiredFields,
        };
      });
    })
    .sort((a, b) => {
      const codeA = a.data["Mã lớp"];
      const codeB = b.data["Mã lớp"];
      // So sánh mã lớp với xử lý số thứ tự
      return codeA.localeCompare(codeB, undefined, { numeric: true });
    })
    .map((item, index) => {
      // Gán số thứ tự sau khi sắp xếp
      return { ...item, STT: (index + 1).toString() };
    });
};

//? Data import vào ở dạng ICourseResponseData, cần convert sang ICourseResponseData
export const convertToAPIDataTableCourses = ({
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
