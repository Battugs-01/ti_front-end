import { useRequest } from "ahooks";
import { Button, Card, notification } from "antd";
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
import { divIcon } from "leaflet";
// import { CreateEvent } from "./create";
// import { UpdateEVent } from "./update";

const CareInformation: FC = () => {
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
      <ITable<any>
        columns={[
          {
            dataIndex: "sda",
            key: "sda",
          },
        ]}
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Event & Tax Products"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </div>
        }
        customHeaderTitle="Асруулагчдын дэлгэрэнгүй мэдээлэл"
        hideToggle
      />
    </>
  );
};

export default CareInformation;
