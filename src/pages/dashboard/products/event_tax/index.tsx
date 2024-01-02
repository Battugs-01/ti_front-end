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
  ProductColumnDiscountDuration,
  ProductColumnHost,
  ProductColumnLimitation,
  ProductColumnName,
  ProductColumnPrice,
  ProductColumnStatus,
  ProductColumnTicket,
  ProductColumnType,
  ProductColumnUnitSold,
} from "../column";
import { DetailProduct } from "../modal/detail";
import { atomProductForm } from "../store";
import { CreateEvent } from "./create";
import { UpdateEVent } from "./update";

const EventTaxTab: FC = () => {
  const [form] = useAtom(atomProductForm);
  const list = useRequest(product.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    run();
  }, [form]);

  const run = (values?: any) => {
    list.run({
      ...form,
      type: ProductType.event,
      created_at: form.full_date,
      ...values,
    });
  };

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
                ["Event & Tax Products"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        columns={[
          ProductColumnName,
          ProductColumnStatus,
          ProductColumnType,
          ProductColumnHost,
          ProductColumnLimitation,
          ...ProductColumnDates,
          ProductColumnDiscountDuration,
          ProductColumnTicket,
          ProductColumnUnitSold,
          ProductColumnPrice,
          ProductColumnDiscount,
          ProductColumnAmount,
        ]}
        CreateComponent={CreateEvent}
        UpdateComponent={UpdateEVent}
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

export default EventTaxTab;
