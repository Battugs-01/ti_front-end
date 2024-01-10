export interface CardInterface {
  orphanName: String;
  status: number;
  emplopyees: number;
  plan: number;
  bedNumber: number;
  bedNumberMax: number;
  report: number;
  reportMax: number;
  donation: number;
  id: number;
  date?: any;
  name: String;
}

export enum TabType {
  employees = "Employees",
  care = "Caregivers",
  report = "Report",
  form = "Registraion form",
}

export enum RadioType {
  care = "Caregiver",
  migration = "Migration",
  salary = "Salary",
  dcare = "Died carer",
}

export enum RadioFormType {
  ba1a = "Б-АС-1.1А",
  ba1b = "Б-АС-1.1Б",
  ba12 = "Б-АС-1.2",
}
