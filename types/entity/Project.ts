import { ITTopicResponseData } from "./Topic";

export enum ProjectType {
  COURSEWORK = "COURSEWORK",
  PRACTICAL = "PRACTICAL",
  MIDTERM = "MIDTERM",
  FINAL_TERM = "FINAL_TERM",
}

export interface ITProjectResponseData {
  id: string;
  weight: number;

  name: string;

  description: string;
  topics: ITTopicResponseData[];
  eventType: string;

  created_date: string; // ISO date string

  modified_date: string | null;

  created_by: string;

  modified_by: string | null;
  in_group: boolean;
  weight_type: string;
  class_id: string;
  subclass_code: string;
  allow_grade_review: boolean;
  review_times: number;
  start_date: string | null;
  allow_topic_suggestion: boolean;
}
