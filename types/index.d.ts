export interface ThesisReportCouncilDataItem {
  id: string;
  numberOfCompletedGradingTopic: number;
  numberOfTopic: number;
  council: string;
  councilInfo: string;
  president: string;
  secretary: string;
  member: string;
}

export interface ReviewTopicDataItem {
  id: string;
  isReviewd: int;
  nameTopic: string;
  supervisor: string[];
  studentIds: string[];
  studentNames: string[];
  council: string;
  councilInfo: string;
  reviewTeacher: string;
}
export interface InternReportCouncilDataItem {
  id: string;
  numberOfCompletedGradingForStudents: number;
  numberOfStudents: number;
  council: string;
  councilInfo: string;
  president: string;
  secretary: string;
  member: string;
  myRole: string;
}

// TODO: PAGE INTERFACE

interface ReportDataOption {
  id: number;
  dateSchedule: Date | undefined;
  timeSchedule: string;
  value: number;
}

// TODO: DATA INTERFACE
export interface SidebarLink {
  id: string;
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

export interface ThesisTopicGradeData {
  "Mã nhóm": string;
  MSSV: string[];
  "Họ và tên": string[];
  "Tên đề tài tiếng Việt": string;
  "Tên đề tài tiếng Anh": string;
  "Phản biện": string;
  "Hướng dẫn": string;
  "Chủ tịch": string;
  "Thư ký": string;
  "Ủy viên": string;
  "Điểm tổng": string;
}
export interface SupervisorThesisReviewTicketData {
  "Mã nhóm": string;
  MSSV: string[];
  "Họ và tên": string[];
  "Tên đề tài tiếng Việt": string;
  "Tên đề tài tiếng Anh": string;
  "Hướng dẫn": string;
}
export interface ReviewerThesisReviewTicketData {
  "Mã nhóm": string;
  MSSV: string[];
  "Họ và tên": string[];
  "Tên đề tài tiếng Việt": string;
  "Tên đề tài tiếng Anh": string;
  "Phản biện": string;
}

export interface TopicRegisterGroupData {
  MSSV: string;
  SĐT: string;
  "Họ và tên": string;
}

export interface FileData {
  "Tên file": string;
  "Ngày sửa đổi": string;
  "Người sửa đổi": string;
}

export interface GradingExerciseData {
  "Điểm danh"?: boolean;
  // 1 là có nhóm
  // 0 là cá nhân
  "Bài nộp": string;
  "Mã nhóm": string;
  "Trễ hạn": string;
  MSSV: string[];
  "Họ và tên": string[];
  Điểm: number[];
  "Góp ý": string;
}

export interface GradingReportData {
  "Điểm danh": boolean;
  "Trễ hạn": string;
  "Bài nộp": string;
  "Mã nhóm": string;
  MSSV: string[];
  "Họ và tên": string[];
  Điểm: number[];
  "Góp ý": string;
}

export interface ScoreTranscriptData {
  MSSV: string;
  "Họ và tên": string;
  'STT Nhóm': string;
  "Quá trình": DataColumnDetail;
  "Thực hành": DataColumnDetail;
  "Giữa kỳ": DataColumnDetail;
  "Cuối kỳ": DataColumnDetail;
  "Điểm trung bình": number;
}

export interface DataColumnDetail {
  ratio: number;
  score: number;
  detailPostId: string[];
  detailScore: number[];
  detailRatio: number[];
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

export interface StudentData {
  MSSV: string;
  "Tài khoản": string;
  "Mật khẩu": string;
  "Họ và tên": string;
  "Lớp sinh hoạt": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
}
export interface TeacherData {
  "Mã cán bộ": string;
  "Tài khoản": string;
  "Mật khẩu": string;
  "Họ và tên": string;
  "Học vị": string;
  "Hướng nghiên cứu": string;
  "Quan tâm tìm hiểu": string;
  Email: string;
  SDT: string;
  "Giới tính": string;
  "Địa chỉ": string;
  "Ngày sinh": string;
}

// export interface RegisterTopicDataItem {
//   STT: string;
//   isDeleted: boolean;
//   data: RegisterTopicData;
// }
// export interface RegisterTopicData {
//   "Mã đề tài": string;
//   "Tên đề tài tiếng Việt": string;
//   "Tên đề tài tiếng Anh": string;
//   "Mô tả": string;
//   "Mã nhóm": string;
//   MSSV: string[];
//   SĐT: string[];
//   "Họ và tên": string[];
// }

// export interface ApproveTopicDataItem {
//   STT: string;
//   isDeleted: boolean;
//   data: ApproveTopicData;
// }
// export interface ApproveTopicData {
//   "Trạng thái": string;
//   "Chỉnh sửa lần cuối"?: string;
//   "Tên đề tài tiếng Việt": string;
//   "Tên đề tài tiếng Anh": string;
//   "Mô tả": string;
//   "Mã nhóm": string;
//   MSSV: string[];
//   SĐT: string[];
//   "Họ và tên": string[];
// }

// export interface TopicDataItem {
//   STT: string;
//   isDeleted: boolean;
//   data: TopicData;
// }
// export interface TopicData {
//   "Tên đề tài tiếng Việt": string;
//   "Tên đề tài tiếng Anh": string;
//   "Mô tả": string;
// }
export interface ThesisTopicGradeDataItem {
  STT: string;
  data: ThesisTopicGradeData;
}
export interface SupervisorThesisReviewTicketDataItem {
  STT: string;
  data: SupervisorThesisReviewTicketData;
}
export interface ReviewerThesisReviewTicketDataItem {
  STT: string;
  data: ReviewerThesisReviewTicketData;
}

export interface TopicRegisterGroupDataItem {
  STT: string;
  data: TopicRegisterGroupData;
}

export interface FileDataItem {
  STT: string;
  isDeleted: boolean;
  data: FileData;
}

export interface GradingExerciseDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingExerciseData;
}

export interface PostDataGradingDetailItem {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  fileName: string;
  scoreDetail: DataGradingDetailItem;
}

export interface DataGradingDetailItem {
  "Bài nộp": string;
  Điểm: number;
  "Góp ý": string;
  "Tỉ lệ điểm": number;
}

export interface GradingReportDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingReportData;
}
export interface InternReviewDataItem {
  STT: string;
  data: InternReviewData;
}
export interface InternReviewData {
  MSSV: string;
  "Họ và tên": string;
  "Vị trí thực tập": string;
  "Công ty thực tập": string;
  "Chủ tịch": string;
  "Thư ký": string;
  "Ủy viên": string;
  "Điểm tổng": string;
}
export interface ScoreTranscriptDataItem {
  STT: string;
  isDeleted: boolean;
  data: ScoreTranscriptData;
}
export interface GradeColumnPercentDataItem {
  "Quá trình": number;
  "Giữa kỳ": number;
  "Thực hành": number;
  "Cuối kỳ": number;
}

export interface CourseDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: CourseData;
}

export interface SubjectDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: SubjectData;
}
export interface StudentDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: StudentData;
}
export interface TeacherDataItem {
  type: string;
  STT: string;
  isDeleted: boolean;
  data: TeacherData;
}

export interface OfficerPermissionData {
  activityTracking: boolean;
  createExercise: boolean;
  createAnnouncement: boolean;
  createBigExercise: boolean;
}

export interface OfficerPermissionDataItem {
  name: string;
  email: string;
  permissions: OfficerPermissionData;
}
