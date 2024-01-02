import { Product, ProductType } from "service/product/type";
import { ActionComponentProps } from "types";
import { CreateProduct } from "../modal/create";
export const CreateCoupon = ({ ...rest }: ActionComponentProps<Product>) => {
  return <CreateProduct {...rest} type={ProductType.coupon} />;
};
