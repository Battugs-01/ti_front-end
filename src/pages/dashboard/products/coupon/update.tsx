import { ActionComponentProps } from "types";
import { Update } from "../modal/update";
import { Product, ProductType } from "service/product/type";

export const UpdateCoupon = ({ ...rest }: ActionComponentProps<Product>) => {
  return <Update {...rest} type={ProductType.coupon} />;
};
