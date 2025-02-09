import { WeightType } from "./Project";

export enum ExerciseType {
  HOMEWORK = "HOMEWORK",
  REPORT = "REPORT",
  PROJECT = "PROJECT",
  TEST = "TEST",
}
export enum SubmissionType {
  FILE = "FILE",
  DRIVE = "DRIVE",
  NONE = "NONE",
}

// const gradeColumn = [
//   { id: 1, type: "COURSEWORK", value: "Quá trình" },
//   { id: 2, type: "PRACTICAL", value: "Thực hành" },
//   { id: 3, type: "MIDTERM", value: "Giữa kỳ" },
//   { id: 4, type: "FINAL_TERM", value: "Cuối kỳ" },
// ];

export interface ITExerciseResponseData {
  id: string;
  weight: number;
  name: string;
  description: string;
  start_date: string; // ISO 8601 date string
  end_date: string; // ISO 8601 date string
  eventType: ExerciseType; // e.g., "HOMEWORK"
  created_date: string; // ISO 8601 date string
  modified_date: string | null; // Nullable
  created_by: string;
  modified_by: string | null; // Nullable
  in_group: boolean;
  weight_type: WeightType; // e.g., "COURSEWORK"
  class_id: string;
  subclass_code: string; // Single string
  allow_grade_review: boolean;
  review_times: number;
  project_id: string;
  publish_date: string; // ISO 8601 date string
  submission_option: SubmissionType; // e.g., "FILE"
  remind_grading_date: string; // ISO 8601 date string
  close_submission_date: string; // ISO 8601 date string
  attachment_url: string;
}

