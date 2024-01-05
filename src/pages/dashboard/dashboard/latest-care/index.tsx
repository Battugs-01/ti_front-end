import { StarFilled } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { Card, Progress, Tooltip, notification } from "antd";
import { ITable } from "components/table";
import { useAtom } from "jotai";
import { FC, useEffect } from "react";
import dashboard from "service/dashboard";
import { tableCellFixed } from "utils/index";
import { atomFormDashboard } from "../store";
import { Pie } from "@ant-design/charts";
import { TbFlagSearch } from "react-icons/tb";
import DashboardAccessCard from "components/access-card";
import ArrowIcon from "assets/icons/arrow-right.svg";
import CustomerLine from "components/customer_line";

const LatestCare: FC = () => {
  // const api = useRequest(dashboard.reviews, {
  //   manual: true,
  //   onError: (err) =>
  //     notification.error({
  //       message: err.message,
  //     }),
  // });

  // const [form] = useAtom(atomFormDashboard);

  // const fetch = (values?: any) => {
  //   api.run({
  //     ...values,
  //     ...form,
  //     created_at: form.full_date,
  //   });
  // };

  // useEffect(() => {
  //   fetch();
  // }, [form]);

  return (
    <>
      <Card
        className="h-full"
        title={
          <div className="flex justify-between">
            <span className="text-lg font-semibold">
              Сүүлд ирсэн асруулагчид
            </span>
            <div className="flex">
              <span className="text-lg font-semibold mr-2">Бүгд</span>
              <img src={ArrowIcon} />
            </div>
          </div>
        }
      >
        <CustomerLine
          name="Баттөгс"
          img="BA"
          status="cancelled"
          date="12/31/2023"
        />
        <CustomerLine
          name="Хайр"
          img="XA"
          status="inprogress"
          date="12/31/2023"
        />
      </Card>
    </>
  );
};

export default LatestCare;
