export default interface Student {
  id: string;
  name: string;
  class: string;
}

export interface IStudentResponseData {
  name: string;
  phone: string;
  class_id: string;
  subclass_code: string;
  student_code: string;
  group_name?: string;
}
