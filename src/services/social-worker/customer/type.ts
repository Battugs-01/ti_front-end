export enum RequestType {
  all = "all",
  saved = "saved",
  putOnHold = "putOnHold",
  returned = "returned",
  requestSend = "requestSend",
}
export interface ListData {
  id?: number;
  image?: string;
  name?: string;
  surname?: string;
  registrationNumber?: string;
  state?: Number;
  date?: any;
}
