import { useRequest } from "ahooks";
import { Button, Card, notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import { Avatar } from "antd";
import { atomProductForm } from "../products/store";
import { divIcon } from "leaflet";
import { UpdateService } from "./update";
import { DetailService } from "./detail";
import { CreateService } from "./create";
// import { CreateEvent } from "./create";
// import { UpdateEVent } from "./update";

const CareInformation: FC = () => {
  const [form] = useAtom(atomProductForm);
  const [data, setData] = useState<any>();
  // const list = useRequest(product.list, {
  //   manual: true,
  //   onError: (err) =>
  //     notification.error({
  //       message: err.message,
  //     }),
  // });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   run();
  // }, [form]);

  // const run = (values?: any) => {
  //   list.run({
  //     ...form,
  //     type: ProductType.event,
  //     created_at: form.full_date,
  //     ...values,
  //   });
  // };

  return (
    <>
      <ITable<any>
        total={data?.total}
        // loading={list.loading}
        dataSource={data?.products ?? []}
        // refresh={(values) =>
        //   list.run({ ...form, created_at: form.full_date, ...values })
        // }
        // UpdateComponent={UpdateService}
        columns={[
          {
            dataIndex: "title",
            title: "Овог",
            align: "left",
            render: (_, record) => (
              <div className="flex">
                <Avatar
                  shape="circle"
                  style={{ backgroundColor: "" }}
                  size={25}
                  src={record.images[0]}
                >
                  {/* {record.images[0]} */}
                </Avatar>
                <span className="">{record.title}</span>
              </div>
            ),
          },
          {
            dataIndex: "category",
            title: "Нэр",
            render: (_, record) => <span className="">{record.category}</span>,
          },
          {
            dataIndex: "email",
            title: "Email",
            render: (_, record) => (
              <span className="text-md text-gray-900 font-medium">
                {record.email}
              </span>
            ),
          },
          {
            dataIndex: "phone",
            title: "Phone",
            render: (_, record) => (
              <span className="text-md text-gray-900 font-medium">
                {record.phone}
              </span>
            ),
          },
        ]}
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Асруулагчдын дэлгэрэнгүй мэдээлэл"],
                  window.document.getElementById("main-table") as HTMLElement,
                  window
                );
              }}
            />
          </div>
        }
        DetailComponent={DetailService}
        CreateComponent={CreateService}
        // UpdateComponent={UpdateMerchant}
        // RemoveModelConfig={{
        //   action: merchant.remove,
        //   config: (record) => ({
        //     uniqueKey: record?.id,
        //     display: record?.full_name,
        //     title: "Remove",
        //   }),
        // }}
        // hideAction
        customHeaderTitle="Асруулагчдын дэлгэрэнгүй мэдээлэл"
        hideToggle
      />
    </>
  );
};

export default CareInformation;
