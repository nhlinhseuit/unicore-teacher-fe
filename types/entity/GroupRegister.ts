import { PostDataGradingReviewItem } from "./Review";

export interface IGroupRegisterResponseData {
  id: string;
  groups: IGroup[];
  start_register_date: string; // ISO format date string
  end_register_date: string; // ISO format date string
  max_size: number;
  min_size: number;
}

export interface IGroup {
  id: string;
  index: number | null; // index có thể null
  name: string;
  members: IMember[];
  grouping_id: string;
}

export interface IMember {
  name: string;
  phone: string;
  class_id: string;
  subclass_code: string;
  student_code: string;
  group_name: string;
}

export interface RegisterGroupDataItem {
  STT: string;
  isDeleted: boolean;
  data: RegisterGroupData;
}

// nếu giữ như này thì phải đổi lại tên vì đây là data của 1 student
export interface RegisterGroupData {
  "Mã nhóm": string;
  MSSV: string[];
  SĐT: string[];
  "Họ và tên": string[];
}

export const convertGroupDataToRegisterGroupDataItem = (
  groups: IGroup[]
): RegisterGroupDataItem[] => {
  return groups.map((group, index) => ({
    STT: (index + 1).toString(),
    isDeleted: false,
    data: {
      "Mã nhóm": group.id, // ID nhóm
      MSSV: group.members.map((member) => member.student_code),
      SĐT: group.members.map((member) => member.phone),
      "Họ và tên": group.members.map((member) => member.name),
    },
  }));
};
