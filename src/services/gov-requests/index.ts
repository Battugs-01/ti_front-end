export enum RequestType {
  decide = "decide",
  saved = "saved",
  putOnHold = "putOnHold",
  migration = "migration",
  decided = "decided",
}

export type ListProps = {
  image?: string;
  name?: string;
  surname?: string;
  registrationNumber?: string;
  state?: Number;
  date?: any;
};

export type RightContentType = {
  state?: Number;
  date?: any;
};
