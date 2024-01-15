export type ItemProps = {
  id?: number;
  formName?: String;
  totalArrived?: number;
  totalFile?: number;
  newArrived?: number;
  description?: String;
};

export interface ItemInterface {
  orphanName: String;
  year: number;
  status: number;
  date: any;
}
export enum FilterTypeline {
  A13 = "A13", // AC-1.3
  A14 = "A14", // AC-1.4",
  A15 = "A15", // "AC-1.5",
  A16 = "A16", // "AC-1.6",
}

export interface FilterReportButton {
  value: FilterTypeline;
  label: string;
}
