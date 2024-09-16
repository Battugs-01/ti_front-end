export interface ResponseType {
  id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  code: string;
  name: string;
  is_active: boolean;
}

export interface ManagementReportType {
  id: number;
  first_name: string;
  level1: number;
  level2: number;
  level3: number;
  role: string;
  rate: number;
}

export interface StatisticalReportType {
  year: number;
  month: number;
  level_1: number;
  level_2: number;
  level_3: number;
}
