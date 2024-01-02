import { useRequest } from "ahooks";
import { Divider, Empty, Image, Tabs, notification } from "antd";
import DashboardCard from "components/dashboard_card";
import { IfCondition } from "components/index";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customer from "service/customers";
import file from "service/file";
import OrdersTab from "./order";
import ReviewsTab from "./review";

const CustomerDetailPage: FC = () => {
  const [tab, setTab] = useState("orders");
  const { data, run } = useRequest(customer.get, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const params = useParams();

  const parsedId = parseInt(params.id || "0");

  useEffect(() => {
    if (parsedId) run(parsedId);
  }, [parsedId]);

  const personalInfo = [
    {
      label: "Email",
      value: data?.email,
    },
    {
      label: "First Name",
      value: data?.first_name,
    },
    {
      label: "Date of Birth",
      value: dayjs(data?.birthday).format("DD/MM/YYYY"),
    },
    {
      label: "Current City",
      value: data?.current_city,
    },
  ];
  return (
    <>
      <div className="bg-white w-full space-y-8 p-5">
        <IfCondition
          condition={!params.id}
          whenTrue={<Empty />}
          whenFalse={
            <>
              <div className="flex  items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      data?.avatar
                        ? file.fileToUrl(data?.avatar)
                        : "/background/login.png"
                    }
                    height={70}
                    width={70}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium  text-base text-gray-900">
                      {data?.first_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="text-gray-600">{data?.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Divider className=" my-8" />
              <h3>Personal Info</h3>
              <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2">
                {personalInfo.map((item, key) => (
                  <div className="flex flex-col" key={"info-" + key}>
                    <p>{item.label}</p>
                    <p className="font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-3  gap-6">
                <DashboardCard label="Reviews" amount={data?.review_count} />
                <DashboardCard
                  label="Amount"
                  amount={data?.income_price}
                  isMoney
                />
                <DashboardCard label="Orders" amount={data?.order_count} />
              </div>
              <Tabs
                defaultValue={tab}
                onChange={(e) => setTab(e)}
                items={[
                  {
                    label: "Orders",
                    key: "orders",
                  },
                  {
                    label: "Reviews",
                    key: "reviews",
                  },
                ]}
              />
            </>
          }
        />
      </div>
      <IfCondition
        condition={tab === "orders"}
        whenTrue={<OrdersTab customerId={data?.id} />}
      />
      <IfCondition
        condition={tab === "reviews"}
        whenTrue={<ReviewsTab customerId={data?.id} />}
      />
    </>
  );
};

export default CustomerDetailPage;
