import { SidebarLink } from "@/types";
import { CustomFlowbiteTheme } from "flowbite-react";

export const itemsPerPage = 30;
export const maxStudentPerGroup = 2;
export const minStudentPerGroup = 1;
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


export const tableTheme: CustomFlowbiteTheme["table"] = {
  root: {
    base: "min-w-full text-center rounded-lg text-sm text-secondary-500",
    shadow:
      "absolute bg-background-secondary dark:bg-black w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
    wrapper: "relative ",
  },
  body: {
    base: "group/body bg-background-secondary",
    cell: {
      base: `text-center group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg p-2 sm:p-3 md:p-4 font-normal text-secondary-900 `,
    },
  },
  head: {
    base: " text-center group/head bg-background-secondary text-xs border-b-2 border-secondary-200 uppercase text-secondary-700",
    cell: {
      base: "text-center  group-first/head:first:rounded-tl-lg border-b-[1px] border-secondary-200  group-first/head:last:rounded-tr-lg p-2 sm:p-3 md:p-4 sm:p-2 md:p-4",
    },
  },
  row: {
    base: "text-center group/row bg-background-secondary",
    hovered: "hover:bg-light-800",
    striped: "odd:bg-background-secondary even:bg-background-secondary ",
  },
};


// TODO: NAVBAR TAB
export const TeacherAnnouncementsTabItems = [
  { value: "listAnnouncements", label: "Danh sách thông báo", route: "/" },
];

export const TeacherCoursesTabItems = [
  { value: "listCourses", label: "Danh sách lớp học", route: "/courses" },
];

export const TeacherSettingTabItems = [
  { value: "settingNoti", label: "Tin tức - thông báo", route: "/setting" },
];

export const TeacherScoreReportTabItems = [
  { value: "scoreThesisReport", label: "Hội đồng phản biện Khóa luận", route: "/score-report/thesis-report" },
  { value: "scoreInternReport", label: "Hội đồng chấm điểm Thực tập", route: "/score-report/intern-report" },
];

export const TeacherSubjectsTabItems = [
  { value: "listSubjects", label: "Danh sách môn học", route: "/subjects" },
  { value: "subjectTypes", label: "Loại môn học", route: "/subjects/types" },
];

export const TeacherCourseTabItems = [
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
    value: "events",
    label: "Sự kiện",
    route: "/events",
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
    value: "reviews",
    label: "Phúc khảo",
    route: "/reviews",
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
export const TeacherNotRegularCourseTabItems = [
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
    value: "reviews",
    label: "Phúc khảo",
    route: "/reviews",
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
    value: "reviews",
    label: "Phúc khảo",
    route: "/reviews",
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

// TODO: OTHERS
export const AnnouncementTypes = [
  { route: "/create-announcement", label: "Tạo thông báo" },
  { route: "/create-exercise", label: "Tạo bài tập" },
  { route: "/create-report", label: "Tạo báo cáo đồ án" },
];
export const AnnouncementTypesNotRegularCourse = [
  { route: "/create-announcement", label: "Tạo thông báo" },
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

export enum CourseType {
  RegularCourseWithProject = "regularCourseWithProject",
  InternCourse = "internCourse",
  ThesisCourse = "thesisCourse",
}

export const ListCourseColors = [
  { type: CourseType.RegularCourseWithProject, color: "#e8f7ff" },
  { type: CourseType.InternCourse, color: "#fef5e5" },
  { type: CourseType.ThesisCourse, color: "#ecf2ff" },
];

export enum DetailFilter {
  Semester,
  Year,
  Subject,
}

export enum DetailFilterScore {
  Semester,
  Year,
  Subject,
  Course,
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
export const sidebarTeacherLinks: SidebarLink[] = [
  {
    id: "1",
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Trang chủ",
  },
  {
    id: "2",
    imgURL: "/assets/icons/courses.svg",
    route: "/courses",
    label: "Lớp học",
  },
  {
    id: "3",
    imgURL: "/assets/icons/score-transcript.svg",
    route: "/score-transcript",
    label: "Bảng điểm",
  },
  {
    id: "4",
    imgURL: "/assets/icons/timetable.svg",
    route: "/timetable",
    label: "Lịch biểu",
  },
  {
    id: "5",
    imgURL: "/assets/icons/messageIc.svg",
    route: "/messages",
    label: "Tin nhắn",
  },
  {
    id: "6",
    imgURL: "/assets/icons/reward.svg",
    route: "/score-report",
    label: "Chấm điểm báo cáo",
  },
  {
    id: "7",
    imgURL: "/assets/icons/bookmarks.svg",
    route: "/bookmarks",
    label: "Dấu trang",
  },
  {
    id: "8",
    imgURL: "/assets/icons/subjects.svg",
    route: "/reviews",
    label: "Phúc khảo",
  },
  {
    id: "9",
    imgURL: "/assets/icons/setting.svg",
    route: "/setting",
    label: "Cài đặt",
  },
];
