import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
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
    route: "/classes",
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
    route: "/classes",
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
    route: "/classes",
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

// 
export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
