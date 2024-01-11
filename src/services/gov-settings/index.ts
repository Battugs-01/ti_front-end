export enum RadioType {
  settings = "Right settings",
  forms = "List of forms",
}

export interface ItemInterface {
  orphanName?: String;
  firstName?: String;
  lastName?: String;
  position?: String;
  phone?: String;
  mail?: String;
  company?: String;
  bankName?: String;
  bankNumber?: String;
  id?: number;
}
