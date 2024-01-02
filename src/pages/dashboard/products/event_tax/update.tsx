import { ActionComponentProps } from "types";
import { Update } from "../modal/update";
import { Product, ProductType } from "service/product/type";

export const UpdateEVent = ({ ...rest }: ActionComponentProps<Product>) => {
  return <Update {...rest} type={ProductType.event} />;
};
