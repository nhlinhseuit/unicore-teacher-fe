import { SidebarLink } from "@/types";

export const itemsPerPage = 30;
export const MAX_FILE_VALUE = 25; // 25MB
export const MAX_FILE_SIZE = MAX_FILE_VALUE * 1024 * 1024; // 25MB
export const ALLOWED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/pdf", // .pdf
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
  "text/plain", // .txt
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];
export const MAX_CATEGORIES = 5; // Số danh mục tối đa chọn khi đăng thông báo

// TODO: BORDER CONTAINER TAB
export const AnnouncementTabs = [
  { value: "postedAnnouncement", label: "Thông báo đã đăng" },
  { value: "createdAnnouncement", label: "Thông báo đã tạo" },
  { value: "hidedAnnouncement", label: "Thông báo đã ẩn" },
];

// TODO: NAVBAR TAB
export const DepartmentAnnouncementsTabItems = [
  { value: "listAnnouncements", label: "Danh sách thông báo", route: "/" },
  {
    value: "createAnnouncement",
    label: "Tạo thông báo",
    route: "/create-announcement",
  },
];

export const DepartmentCoursesTabItems = [
  { value: "listCourses", label: "Danh sách lớp học", route: "/courses" },
  {
    value: "joinedCourses",
    label: "Lớp học đã tham gia",
    route: "/courses/joined",
  },
  { value: "createCourse", label: "Tạo lớp học", route: "/courses/create" },
];

export const DepartmentSubjectsTabItems = [
  { value: "listSubjects", label: "Danh sách môn học", route: "/subjects" },
  { value: "subjectTypes", label: "Loại môn học", route: "/subjects/types" },
];

export const DepartmentCourseTabItems = [
  { value: "generalPost", label: "Thông báo chung", route: "/" },
  {
    value: "exercises",
    label: "Bài tập",
    route: "/exercises",
  },
  {
    value: "bigExercises",
    label: "Bài tập lớn",
    route: "/big-exercises",
  },
  {
    value: "scoreTranscript",
    label: "Bảng điểm",
    route: "/score-transcript",
  },
  {
    value: "timeTable",
    label: "Thời khóa biểu",
    route: "/time-table",
  },
  {
    value: "files",
    label: "Lưu trữ",
    route: "/files",
  },
  {
    value: "setting",
    label: "Cài đặt",
    route: "/setting",
  },
  // {
  //   value: "setting1",
  //   label: "Cài đặt1",
  //   route: "/setting1",
  // },
  // {
  //   value: "setting2",
  //   label: "Cài đặt2",
  //   route: "/setting2",
  // },
  // {
  //   value: "setting3",
  //   label: "Cài đặt3",
  //   route: "/setting3",
  // },
];

// TODO: OTHERS
export const AnnouncementTypes = [
  { route: "/create-announcement", label: "Tạo thông báo" },
  { route: "/create-exercise", label: "Tạo bài tập" },
  { route: "/create-report", label: "Tạo báo cáo đồ án" },
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

export const CourseItemMoreComponentItems = [
  { value: "edit", label: "Chỉnh sửa" },
  { value: "hide", label: "Ẩn" },
  { value: "archive", label: "Lưu trữ" },
];

// TODO: SIDEBAR
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
