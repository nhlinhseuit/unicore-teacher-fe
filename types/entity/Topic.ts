export interface TopicDataItem {
  STT: string;
  type: string;
  isDeleted: boolean;
  data: TopicData;
}

export interface TopicData {
  "GV phụ trách"?: string;

  "Mã đề tài": string;
  "Tên đề tài tiếng Việt": string;
  "Tên đề tài tiếng Anh": string;
  "Mô tả": string;
  "Mã nhóm": string;
  MSSV: string[];
  SĐT: string[];
  "Họ và tên": string[];
}

export interface ITopicResponseData {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  limit: number;
  official: boolean;
  status: string;
  feedback: string;
  selectors: string[];
  evaluatorCode: string;
  teacher_codes: string[];
  teacher_names: string[];
}
