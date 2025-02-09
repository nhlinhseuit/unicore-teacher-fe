export interface IAnnouncementResponseData {
  id: string;
  name: string;
  description: string;
  type: string;
  categories: string[] | null;
  source_id: string;
  created_date: string; // ISO date string
  modified_date: string | null;
  create_by: string;
  create_email: string;
  modified_by: string | null;
}
