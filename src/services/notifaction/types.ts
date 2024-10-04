export interface ListType {
  id: number;
  created_at: Date;
  updated_at: Date;
  notification_id: number;
  notification: Notification;
  employee_id: number;
  is_read: boolean;
}

export interface Notification {
  id: number;
  created_at: Date;
  updated_at: Date;
  title: string;
  date: Date;
  description: string;
  link: string;
  from_employee_id: number;
  assessment_id: null;
  customer_id: number;
}
