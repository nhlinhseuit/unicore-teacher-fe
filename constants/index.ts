import { SidebarLink } from "@/types";

export const itemsPerPage = 30;

export const DepartmentCoursesTabItems = [
  { value: "listCourses", label: "Danh sách lớp học", route: "/courses" },
  { value: "createCourse", label: "Tạo lớp học", route: "/courses/create" },
  {
    value: "joinedCourses",
    label: "Lớp học đã tham gia",
    route: "/courses/joined",
  },
];
export const DepartmentSubjectsTabItems = [
  { value: "listSubjects", label: "Danh sách môn học", route: "/subjects" },
  { value: "subjectTypes", label: "Loại môn học", route: "/subjects/types" },
];

export enum DataTableType {
  Course = "Lớp học",
  Subject = "Môn học",
  Student = "Sinh viên",
  Teacher = "Giảng viên",
}

export enum FilterType {
  SortNewer,
  SortOlder,
  DetailFilter,
  None,
}

export enum DetailFilter {
  Semester,
  Year,
  Subject,
  Teacher,
}

export const FilterTable = [
  { type: "sort" },
  {
    type: "detailFilter",
    data: [
      { type: "semester" },
      { type: "year" },
      { type: "subject" },
      { type: "teacher" },
    ],
  },
];

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const TableDataMoreComponentItems = [
  { value: "edit", label: "Chỉnh sửa" },
  { value: "delete", label: "Xóa" },
];

// SIDEBAR
export const sidebarDepartmentLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/teachers",
    label: "Giảng viên",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/students",
    label: "Sinh viên",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/subjects",
    label: "Môn học",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarTeacherLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Lịch biểu",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarStudentLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Thời khóa biểu",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];
