import { useRequest } from "ahooks";
import { Button, Card, notification } from "antd";
import { ExportButton, FilterForm, ITable } from "components/index";
import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import { Avatar } from "antd";
import { atomProductForm } from "../products/store";
import { divIcon } from "leaflet";
import { UpdateService } from "./actions/update";
import { DetailService } from "./actions/detail";
import { CreateService } from "./actions/create";
import InitTableHeader from "components/table-header";
import List from "./grid";
import CustomPagination from "components/pagination";
// import { CreateEvent } from "./create";
// import { UpdateEVent } from "./update";

const CareInformation: FC = () => {
  const [form] = useAtom(atomProductForm);
  const [data, setData] = useState<any>();
  const [selectedToggle, setSelectedToggle] = useState<string>("grid");
  const [create, setCreate] = useState<boolean>(false);
  const handleToggle = (value: string) => {
    setSelectedToggle(value);
  };
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
        setData(jsonData?.products);
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
    <div className="flex flex-col gap-4">
      <FilterForm
        initialValues={{
          ...form,
        }}
        hideFilter
        hideSearch
      />
      <Card>
        <InitTableHeader
          handleToggle={handleToggle}
          selectedToggle={selectedToggle}
          customHeaderTitle="Асруулагчдын дэлгэрэнгүй мэдээлэл"
          hideToggle
          setCreate={setCreate}
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
        />
        {selectedToggle === "list" ? (
          <ITable<any>
            total={data?.length}
            // loading={list.loading}
            dataSource={data ?? []}
            // refresh={(values) =>
            //   list.run({ ...form, created_at: form.full_date, ...values })
            // }
            UpdateComponent={UpdateService}
            columns={[
              {
                dataIndex: "title",
                title: "Овог",
                align: "left",
                render: (_, record) => (
                  <div className="flex gap-2">
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
                render: (_, record) => (
                  <span className="">{record.category}</span>
                ),
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
            DetailComponent={DetailService}
            CreateComponent={CreateService}
            create={create as boolean}
            setCreate={setCreate}
            // UpdateComponent={UpdateMerchant}
            RemoveModelConfig={{
              // action: merchant.remove,
              config: (record) => ({
                uniqueKey: record?.id,
                display: record?.full_name,
                title: "Remove",
              }),
            }}
            // hideAction
          />
        ) : (
          <>
            <div className="flex gap-5">
              <div className="grid xl:grid-cols-7 lg:grid-cols-5 gap-4 md:grid-cols-4 grid-cols-1">
                {data?.map(
                  (el: { images: any[][]; title: string; brand: string }) => (
                    <List
                      image={el.images[0]}
                      name={el?.title}
                      brand={el.brand}
                    />
                  )
                )}
              </div>
              <CustomPagination />
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default CareInformation;
