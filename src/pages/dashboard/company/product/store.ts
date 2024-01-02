import { atom } from "jotai";
import { ProductType } from "service/product/type";

export interface ProductForm {
  tab: ProductType;
  serviceId?: number;
}

export const atomProductForm = atom<ProductForm>({
  tab: ProductType.event,
  serviceId: 0,
});
