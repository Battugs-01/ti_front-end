export enum RadioType {
  settings = "Right settings",
  forms = "List of forms",
}

export interface UserApi {
  data?: {
    body?: UserList[];
  };
}

export interface UserListApi {
  total?: number;
  items?: UserList[];
}

export interface UserList {
  createdAt?: Date;
  email?: String;
  first_name?: String;
  id?: number;
  isActive?: boolean;
  last_name?: String;
  phone?: String;
  position?: String;
  updatedAt?: Date;
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
  amount?: number;
}

export interface FormInterface {
  formTitle?: String;
  formNo?: String;
  id?: number;
}

export interface FormDetailInterface {
  formTitle?: String;
  formNo?: String;
  id?: number;
  lastUpdated?: any;
  clauseList?: ClauseInterface[];
}

export interface ClauseInterface {
  clauseId: number;
  clauseDescription: String;
  clauseContent: String;
}
