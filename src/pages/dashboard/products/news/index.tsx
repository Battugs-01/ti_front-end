import { useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { exportFromTable } from "utils/export";
import {
  ProductColumnDateProgress,
  ProductColumnDates,
  ProductColumnHost,
  ProductColumnName,
  ProductColumnPrice,
  ProductColumnStatus,
  ProductColumnTotalPrice,
} from "../column";
import { atomProductForm } from "../store";
import { CreateNews } from "./create";
import { DetailNews } from "./detail";
import { UpdateNews } from "./update";

const NewsTab: FC = () => {
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
      type: ProductType.news,
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
                ["News Products"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        columns={[
          ProductColumnName,
          ProductColumnHost,
          ProductColumnStatus,
          ...ProductColumnDates,
          ProductColumnDateProgress,
          ProductColumnPrice,
          ProductColumnTotalPrice,
        ]}
        CreateComponent={CreateNews}
        UpdateComponent={UpdateNews}
        RemoveModelConfig={{
          action: product.remove,
          config: (record) => ({
            title: "Remove",
            uniqueKey: record?.id ?? 0,
            display: record?.name,
            body: record,
          }),
        }}
        DetailComponent={DetailNews}
      />
    </>
  );
};

export default NewsTab;
