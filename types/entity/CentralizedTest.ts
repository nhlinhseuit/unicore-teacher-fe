import { WeightType } from "./Project";

export interface ICentralizedTestResponseData {
  id: string; // ID của bài thi
  weight: number; // Trọng số của bài thi
  name: string; // Tên bài thi
  description: string; // Mô tả bài thi (bao gồm ngày thi, ca thi, phòng)
  place: string; // Phòng thi
  date: string; // Ngày thi (định dạng ISO: YYYY-MM-DD)
  eventType: string; // Loại sự kiện, ví dụ: "TEST"
  created_date: string; // Ngày tạo (định dạng ISO 8601)
  modified_date: string; // Ngày chỉnh sửa (định dạng ISO 8601)
  created_by: string; // Người tạo
  modified_by: string; // Người chỉnh sửa
  in_group: boolean; // Có thuộc nhóm hay không
  weight_type: WeightType; // Loại trọng số bài thi (FINAL_TERM, ...)
  class_id: string; // ID lớp học
  subclass_code: string; // Mã lớp con
  allow_grade_review: boolean; // Có cho phép phúc khảo điểm hay không
  review_times: number; // Số lần phúc khảo được phép
}
