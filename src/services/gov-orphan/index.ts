export interface DataType {
  items: CardInterface[];
  total: number;
}

export interface CardInterface {
  id?: number;
  capacity: number;
  reserved: number;
  name: String;
  logo: Logo;
}

export interface Logo {
  id: number;
  created_at: Date;
  updated_at: Date;
  file_name: String;
  original_name: String;
  physical_path: String;
  extention: String;
  file_size: number;
}

export interface UserInterface {
  first_name: String;
  last_name: String;
  position: String;
  phone: String;
}
export interface PaymentInterface {
  bank_name: String;
  account_number: String;
  reciever_name: String;
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
