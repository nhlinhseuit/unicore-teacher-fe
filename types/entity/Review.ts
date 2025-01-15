export enum ReviewType {
  TURNED_DOWN = "TURNED_DOWN",
  UNPROCESSED = "UNPROCESSED",
  REVIEWED = "REVIEWED",
}

export const getReviewType = (type: any) => {
  switch (type) {
    case ReviewType.TURNED_DOWN:
      return "Đã từ chối";
    case ReviewType.UNPROCESSED:
      return "Chưa phúc khảo";
    case ReviewType.REVIEWED:
      return "Đã phúc khảo";
    default:
      return "Không xác định";
  }
};

export const convertToDataTableReviewsViKeys = (
  data: IReviewResponseData[]
): GradingReviewDataItem[] => {
  return data.map((item, index) => {
    const requiredFields: GradingReviewData = {
      "Trạng thái": getReviewType(item.status),
      Lớp: item.subclass_code,
      "Bài tập": item.event_name || "ĐỢI BACKEND CẬP NHẬT", // Nếu `event_name` null, gán "N/A"
      "Bài nộp": item.submission_id,
      Điểm: item.grades,
      MSSV: item.submitter_id,
      "Họ và tên": item.submitter_name,
    };

    return {
      STT: (index + 1).toString(), // STT bắt đầu từ 1
      type: "topic",
      isDeleted: false, // Mặc định là false
      data: requiredFields,
    };
  });
};

export const convertReviewToPostData = (
  review: IReviewResponseData
): PostDataGradingReviewItem => {
  return {
    id: review.id,
    creator: review.created_by,
    createdAt: review.created_date,
    title: review.event_name || "ĐỢI BACKEND CẬP NHẬT", // Nếu `event_name` null, dùng giá trị mặc định
    fileName: review.submission_id,
    scoreDetail: {
      "Bài nộp": review.submission_id,
      historyGrade: review.grades,
      historyFeedback: review.feedbacks,
    },
  };
};

export interface GradingReviewDataItem {
  STT: string;
  isDeleted: boolean;
  data: GradingReviewData;
}

export interface GradingReviewData {
  "Trạng thái": string;
  Lớp?: string;
  "Bài tập": string;
  "Bài nộp": string;
  Điểm: number[];
  MSSV: string;
  "Họ và tên": string;
}

export interface PostDataGradingReviewItem {
  id: string;
  creator: string;
  createdAt: string;
  title: string;
  fileName: string;
  scoreDetail: DataGradingReviewItem;
}

export interface DataGradingReviewItem {
  "Bài nộp": string;
  historyGrade: number[];
  historyFeedback: string[];
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
