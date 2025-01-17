import { ITopicResponseData } from "./Topic";

export enum WeightType {
  COURSEWORK = "COURSEWORK",
  PRACTICAL = "PRACTICAL",
  MIDTERM = "MIDTERM",
  FINAL_TERM = "FINAL_TERM",
}

export const getWeightType = (type: WeightType) => {
  switch (type) {
    case WeightType.COURSEWORK:
      return "Lý thuyết";
    case WeightType.PRACTICAL:
      return "Thực hành";
    case WeightType.MIDTERM:
      return "Giữa kỳ";
    case WeightType.FINAL_TERM:
      return "Cuối kỳ";
  }
};

export interface ITProjectResponseData {
  id: string;
  weight: number;
  name: string;
  description: string;
  topics: ITopicResponseData[];
  eventType: string;
  created_date: string; // ISO date string
  modified_date: string | null;
  created_by: string;
  modified_by: string | null;
  in_group: boolean;
  weight_type: WeightType;
  class_id: string;
  subclass_code: string;
  allow_grade_review: boolean;
  review_times: number;
  start_date: string | null;
  allow_topic_suggestion: boolean;
}
