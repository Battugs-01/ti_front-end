import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { exportFromTable } from "utils/export";
import { tableCellFixed } from "utils/index";
import {
  ProductColumnAmount,
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
import { CreateCoupon } from "./create";
import { UpdateCoupon } from "./update";

const CouponTab: FC = () => {
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
      type: ProductType.coupon,
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
                ["Coupon products"],
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
          ProductColumnLimitation,
          ProductColumnHost,
          {
            ...tableCellFixed(200),
            dataIndex: "duration_of_use",
            title: "Duration of use",
            render: (_, record) =>
              `${dayjs(record.start_date).format("D MMM, HH:mm") || "-"} - ${`${dayjs(record.end_date).format("D MMM, HH:mm") || "-"
              }`}`,
          },
          ProductColumnDiscountDuration,
          ProductColumnTicket,
          ProductColumnUnitSold,
          ProductColumnPrice,
          ProductColumnDiscount,
          ProductColumnAmount,
        ]}
        CreateComponent={CreateCoupon}
        UpdateComponent={UpdateCoupon}
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

export default CouponTab;
