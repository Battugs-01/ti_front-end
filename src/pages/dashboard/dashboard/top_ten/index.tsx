import { ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Tag, notification } from "antd";
import { ITag, RenderProductStatus } from "components/index";
import { ITable } from "components/table";
import { SERVICE_OPERATION_TYPES } from "config";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboard from "service/dashboard";
import {
  fillDollar,
  moneyFormat,
  renderEnDate,
  tableCellFixed,
} from "utils/index";
import { atomFormDashboard, atomSelectedProduct } from "../store";

const buttons = [
  {
    label: "Top 10 Products",
    value: "product",
  },
  {
    label: "Top 10 Merchants",
    value: "merchant",
  },
];

const TopTen: FC = () => {
  const topTenMerchants = useRequest(dashboard.topTenMerchants, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const topTenProducts = useRequest(dashboard.topTenProducts, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [form] = useAtom(atomFormDashboard);
  const [tab, setTab] = useState<"product" | "merchant">("product");

  const fetch = (values?: any) => {
    if (tab === "product") {
      topTenProducts.run({
        ...values,
        ...form,
        created_at: form.full_date,
      });
      return;
    }
    topTenMerchants.run({
      ...values,
      ...form,
      created_at: form.full_date,
    });
  };

  useEffect(() => {
    fetch();
  }, [form, tab]);

  const navigate = useNavigate();

  return (
    <>
      {tab === "product" ? (
        <ITable<any>
          noShadow
          hideCreateButton
          loading={topTenProducts.loading}
          dataSource={topTenProducts.data?.items || []}
          refresh={(values) => fetch({ ...form, ...values })}
          rowClassName={" cursor-pointer"}
          customHeaderTitle={
            <ProFormRadio.Group
              noStyle
              name={"deadline"}
              radioType="button"
              options={buttons?.map((el) => ({ ...el }))}
              fieldProps={{
                className: "text-md font-semibold",
                value: tab,
                onChange: (e) => {
                  setTab(e.target.value);
                },
              }}
            />
          }

          pagination={{
            pageSize: 6,
          }}
          columns={[
            {
              ...tableCellFixed(230),
              dataIndex: "name",
              title: "Product Name",

              render: (_, record) => (
                <div className="flex flex-col">
                  <span className="text-md text-gray-600 font-medium">
                    {record.name}
                  </span>
                  <span className="text-sm">
                    {renderEnDate(record.start_date)} -{" "}
                    {renderEnDate(record.end_date)}
                  </span>
                </div>
              ),
            },
            {
              dataIndex: "service_name",
              valueType: "string",
              title: "Merchant",
            },
            {
              dataIndex: "status",
              title: "Status",
              render: (_, record) => (
                <RenderProductStatus status={record.status} />
              ),
            },
            {
              dataIndex: "regular_price",
              title: "Price",
              render: (_, record) =>
                `${moneyFormat(record.regular_price, "mnt")}`,
            },
            {
              dataIndex: "discount_price",
              title: "Discount Price",
              render: (_, record) =>
                `${moneyFormat(
                  (record.discount_percentage * record.regular_price) / 100,
                  "mnt"
                )} (-${record.discount_percentage ? record.discount_percentage : 0
                }%)`,
            },
            {
              dataIndex: "total_sold",
              title: "Units Sold",
            },

            {
              dataIndex: "total_income",
              title: "Income",
              render: (_, record) =>
                `${moneyFormat(record.total_income, "mnt")}`,
            },
            {
              dataIndex: "total_click",
              title: "Clicks",
            },
          ]}
        />
      ) : (
        <ITable<any>
          hideCreateButton
          noShadow
          loading={topTenMerchants.loading}
          dataSource={topTenMerchants.data?.items || []}
          refresh={(values) => fetch({ ...values, ...form })}
          customHeaderTitle={
            <ProFormRadio.Group
              name={"deadline"}
              radioType="button"
              options={buttons?.map((el) => ({ ...el }))}
              fieldProps={{
                className: "text-md font-semibold -mb-8",
                value: tab,
                onChange: (e) => {
                  setTab(e.target.value);
                },
              }}
            />
          }
          pagination={{
            pageSize: 6,
          }}
          onRow={(record) => {
            return {
              onClick: () => navigate(`/dashboard/company/${record.id}`),
            };
          }}
          rowClassName={" cursor-pointer"}
          columns={[
            {
              ...tableCellFixed(230),
              dataIndex: "name",
              title: "Merchant Name",
              render: (_, record) => (
                <div className="flex flex-col">
                  <span className="text-md text-gray-600 font-medium">
                    {record.name}
                  </span>
                  <span className="text-sm">{record.phone}</span>
                </div>
              ),
            },
            {
              dataIndex: "total_product",
              valueType: "string",
              title: "Product",
            },
            {
              title: "Operation Type",
              render: (_, record) =>
                record.operation_types?.map((type: any, index: number) => (
                  <ITag
                    value={
                      SERVICE_OPERATION_TYPES.find((el) => el.value === type)
                        ?.label
                    }
                    key={"operation-type-" + index}
                  />
                )),
            },
            {
              dataIndex: "is_tourist_friendly",
              title: "Tourist Friendly",
              render: (_, record) => (
                <Tag
                  className="rounded-full"
                  color={record.is_tourist_friendly ? "green" : "silver"}
                >
                  {record.is_tourist_friendly ? "Yes" : "No"}
                </Tag>
              ),
            },
            {
              dataIndex: "price",
              valueType: "number",
              title: "Price",
              render: (_, record) => (
                <ITag value={fillDollar(record.price_range)} />
              ),
            },
            {
              dataIndex: "total_income",
              title: "Income",
              render: (_, record) =>
                `${moneyFormat(record.total_income, "mnt")}`,
            },
            {
              dataIndex: "total_click",
              title: "Clicks",
            },
          ]}
        />
      )}
    </>
  );
};

export default TopTen;
