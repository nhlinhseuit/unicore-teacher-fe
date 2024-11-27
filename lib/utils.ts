import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// TODO: Chuyển đổi các giá trị biến sang Label

export enum Permission {
  ActivityTracking = "activityTracking",
  CreateExercise = "createExercise",
  CreateAnnouncement = "createAnnouncement",
  CreateBigExercise = "createBigExercise",
}

export const getPermissionLabel = (key: string): string => {
  switch (key) {
    case Permission.ActivityTracking:
      return "Theo dõi hoạt động";
    case Permission.CreateExercise:
      return "Tạo bài tập";
    case Permission.CreateAnnouncement:
      return "Tạo thông báo";
    case Permission.CreateBigExercise:
      return "Tạo bài tập lớn";
    default:
      return "Quyền không xác định";
  }
};

//


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAvatarName = (name: string) => {
  const words = name.split(" ");
  if (words.length >= 2) {
    return words[0][0] + words[words.length - 1][0];
  }
  return name.slice(0, 2).toUpperCase();
};

export const normalizeSearchItem = (term: string | number) => {
  const lowerCaseTerm = term.toString().trim().toLowerCase();
  // Chuyển đổi ký tự có dấu thành không dấu
  const normalizedTerm = lowerCaseTerm
    .normalize("NFD") // Phân tách các ký tự có dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .replace(/đ/g, "d") // Thay thế "đ" thành "d"
    .replace(/Đ/g, "D"); // Thay thế "Đ" thành "D"

  // Giữ lại khoảng trắng và ký tự chữ và số
  return normalizedTerm.replace(/[^a-z0-9\s]/g, "");
};

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - createdAt.getTime()) / 1000); // difference in seconds

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    return `${diff} second${diff !== 1 ? "s" : ""} ago`;
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`; // for millions
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`; // for thousands
  } else {
    return num.toString(); // for numbers less than 1,000
  }
};
