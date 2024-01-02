import { atom } from "jotai";
import { FilterDeadline } from "types";

export interface FilterFormType {
  deadline?: FilterDeadline;
  search?: string;
  name?: string;
  phoneNumber?: string;
  operationType?: string;
  is_tourist_friendly?: string;
  timeTable?: string;
  tab?: string;
  status?: string;
  full_date?: string[];
  page: number;
  limit: number;
  is_relation_product: true;
}

export const atomServiceProductForm = atom<FilterFormType>({
  is_relation_product: true,
  page: 0,
  limit: 20,
});
