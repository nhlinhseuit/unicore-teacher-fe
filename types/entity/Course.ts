export enum CourseType {
  //? NOR, LT, HT1, HT2, DA, TTTN, KLTN, NHD: nhóm hướng dẫn
  RegularCourseWithProject = "NOR",
  InternCourse = "TTTN",
  ProjectCourse = "DA",
  ThesisCourse = "KLTN",
}

export interface CourseDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: CourseData;
}

export interface CourseData {
  "Mã môn học": string;
  "Mã lớp": string;
  "Tên môn học": string;
  "Mã GV": string[];
  "Tên GV": string[];
  // "Sĩ số": string;
  "Số TC": string;
  HTGD: string;
  "Khoa quản lý": boolean;
  "Ngày BĐ": string;
  "Ngày KT": string;
  "Học kỳ": number;
  "Năm học": number;
}

export interface ICourseResponseData {
  id: string;
  code: string;
  semester: number;
  year: number;
  type: string;
  subclasses: ISubCourseResponseData[];
  organization_id: string;
  subject_code: string;
  org_managed: boolean;
  subject_metadata: ISubjectMetada;
}
export interface ISubCourseResponseData {
  code: string;
  credits: number;
  type: string;
  note: string;
  teacher_code: string[];
  teacher_assistant_code: string[];
  start_date: string;
  end_date: string;
  max_size: number;
  current_size: number;
}

interface ISubjectMetada {
  id: string;
  name: string;
  semester?: number;
  year?: number;
  midterm_format?: string;
  practical_format: string;
  final_format: string;
  coursework_weight: number;
  practical_weight: number;
  final_weight: number;
  midterm_weight: number;
  midterm_time: string;
  final_time: string;
}
