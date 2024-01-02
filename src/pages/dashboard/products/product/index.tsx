import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { exportFromTable } from "utils/export";
import {
  ProductColumnAmount,
  ProductColumnDates,
  ProductColumnDiscount,
  ProductColumnDiscountDates,
  ProductColumnDiscountDuration,
  ProductColumnHost,
  ProductColumnLimitation,
  ProductColumnName,
  ProductColumnPrice,
  ProductColumnStatus,
  ProductColumnUnitSold,
} from "../column";
import { atomProductForm } from "../store";
import { CreateProduct } from "./create";
import { DetailProduct } from "./detail";
import { UpdateProduct } from "./update";

const ProductTab: FC = () => {
  const [form] = useAtom(atomProductForm);
  const list = useRequest(product.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = (values?: any) => {
    list.run({
      ...form,
      type: ProductType.product,
      created_at: form.full_date,

      ...values,
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  return (
    <>
      <ITable<Product>
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => run(values)}
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Product Products"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        columns={[
          ProductColumnName,
          ProductColumnStatus,
          ProductColumnDiscountDuration,
          ProductColumnHost,
          ProductColumnLimitation,
          ProductColumnUnitSold,
          ProductColumnPrice,
          ProductColumnDiscount,
          ProductColumnAmount,
          ...ProductColumnDates,
          ...ProductColumnDiscountDates,
        ]}
        CreateComponent={CreateProduct}
        UpdateComponent={UpdateProduct}
        RemoveModelConfig={{
          action: product.remove,
          config: (record) => ({
            title: "Remove",
            uniqueKey: record?.id ?? 0,
            display: record?.name,
            body: record,
          }),
        }}
        DetailComponent={DetailProduct}
      />
    </>
  );
};

export default ProductTab;
