import { BADGE_CRITERIA } from "@/constants";

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface CourseData {
    "Mã môn học": string;
    "Mã lớp": string;
    "Tên môn học": string;
    "Mã GV": string;
    "Tên GV": string;
    "Sĩ số": string;
    "Số TC": string;
    HTGD: string;
    "Khoa quản lý": boolean;
    "Ngày BĐ": string;
    "Ngày KT": string;
    "Học kỳ": number;
    "Năm học": number;
}

export interface SubjectData {
    "Khoa QL": string;
    "Mã MH": string;
    "Hình thức thi LT GIỮA KỲ": string;
    "Thời gian thi LT GIỮA KỲ": number;
    "Hình thức thi LT CUỐI KỲ": string;
    "Thời gian thi CUỐI KỲ": number;
    "Hình thức thi THỰC HÀNH CUỐI KỲ": string;
    "Trọng số QUÁ TRÌNH": number;
    "Trọng số THỰC HÀNH": number;
    "Trọng số GIỮA KỲ": number;
    "Trọng số CUỐI KỲ": number;
    "Hệ ĐT": string;
    "Lớp CDIO": string;
    "Học kỳ": number;
    "Năm học": number;
    "Tên môn học": string;
}

export interface CourseDataItem {
  type: string,
  STT: string;
  data: CourseData
}


export interface SubjectDataItem {
  type: string,
  STT: string;
  data: SubjectData
}
