export enum CourseType {
  TURNED_DOWN = "TURNED_DOWN",
  UNPROCESSED = "UNPROCESSED",
  REVIEWED = "REVIEWED",
}

export interface IReviewResponseData {
  id: string;
  attempt: number;
  grades: number[]; // Mảng chứa các số (điểm)
  feedbacks: string[]; // Mảng chứa các chuỗi (phản hồi)
  status: string; // Trạng thái bài làm (VD: "REVIEWED")
  event_id: string | null; // Có thể là chuỗi hoặc null
  event_name: string | null; // Có thể là chuỗi hoặc null
  submission_id: string; // ID bài nộp
  submitter_id: string; // ID người nộp
  submitter_name: string; // Tên người nộp
  class_id: string; // ID lớp học
  subclass_code: string; // Mã lớp con
  feedback_date: string[]; // Mảng các chuỗi (ngày phản hồi ở dạng ISO 8601)
  reviewer_id: string; // ID của người đánh giá
  turn_down_reason: string | null; // Lý do từ chối (nếu có)
  created_date: string; // Ngày tạo (dạng ISO 8601)
  created_by: string; // Người tạo
  modified_date: string | null; // Ngày chỉnh sửa (nếu có)
  modified_by: string | null; // Người chỉnh sửa (nếu có)
}
