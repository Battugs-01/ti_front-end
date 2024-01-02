import { User } from "firebase/auth";
import { Product } from "service/product/type";

export interface Offer {
  category: OfferCategory;
  created_at: string;
  created_user: User;
  created_user_id: number;
  id: number;
  list_order: number;
  product: Product;
  product_id: number;
  service: Product;
  service_id: number;
  type: string;
  updated_at: string;
  updated_user: User;
  updated_user_id: number;
}

export enum OfferType {
  FOR_YOU = "foryou",
  TOP_TEN = "topten",
}

export enum OfferCategory {
  PRODUCT = "product",
  SERVICE = "service",
}

export const OfferTypeArray = [
  {
    label: "For you",
    value: "foryou",
  },
  {
    label: "Top 10",
    value: "topten",
  },
];

export const OfferCategoryArray = [
  {
    label: "Product",
    value: "product",
  },
  {
    label: "Merchant",
    value: "service",
  },
];
