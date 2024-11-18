import { SidebarLink } from "@/types";

export const itemsPerPage = 30;
export const itemsPerPageRegisterTable = 10;
export const itemsPerPageTopicTable = 20;
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
    value: "manageGroup",
    label: "Quản lý nhóm",
    route: "/manage-group",
  },
  {
    value: "bigExercise",
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
];
export const BigExerciseTabItems = [
  { value: "generalPost", label: "Thông báo chung", route: "/" },
  {
    value: "happeningEvent",
    label: "Hoạt động đang diễn ra",
    route: "/happening-event",
  },
  {
    value: "listTopic",
    label: "Danh sách đề tài",
    route: "/list-topic",
  },
  {
    value: "registerTopic",
    label: "Đăng ký đề tài",
    route: "/register-topic",
  },
  {
    value: "approveTopic",
    label: "Duyệt đề xuất đề tài",
    route: "/approve-topic",
  },
  {
    value: "files",
    label: "Lưu trữ",
    route: "/files",
  },
];

// TODO: OTHERS
export const AnnouncementTypes = [
  { route: "/create-announcement", label: "Tạo thông báo" },
  { route: "/create-exercise", label: "Tạo bài tập" },
  { route: "/create-report", label: "Tạo báo cáo đồ án" },
];

export enum RegisterTopicTableType {
  registerTopic,
  approveTopic,
  // !: GỘP SAU:
  registerGroup,
}

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

export const FileTableDataMoreComponentItems = [
  { value: "rename", label: "Đổi tên" },
  { value: "download", label: "Tải xuống" },
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
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/users.svg",
    route: "/teachers",
    label: "Giảng viên",
  },
  {
    id: "3",
    imgURL: "/assets/icons/star.svg",
    route: "/students",
    label: "Sinh viên",
  },
  {
    id: "4",
    imgURL: "/assets/icons/suitcase.svg",
    route: "/subjects",
    label: "Môn học",
  },
  {
    id: "5",
    imgURL: "/assets/icons/tag.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "6",
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarTeacherLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "3",
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Lịch biểu",
  },
  {
    id: "4",
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    id: "5",
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    id: "6",
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];

export const sidebarStudentLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/users.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "3",
    imgURL: "/assets/icons/star.svg",
    route: "/timetable",
    label: "Thời khóa biểu",
  },
  {
    id: "4",
    imgURL: "/assets/icons/suitcase.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    id: "5",
    imgURL: "/assets/icons/user.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    id: "6",
    imgURL: "/assets/icons/user.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];
