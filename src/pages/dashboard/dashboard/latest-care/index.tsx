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

  const config = {
    data: [
      { type: "分类一", value: 27 },
      { type: "分类二", value: 25 },
      { type: "分类三", value: 18 },
      { type: "分类四", value: 15 },
      { type: "分类五", value: 10 },
      { type: "其他", value: 5 },
    ],
    angleField: "value",
    paddingRight: 80,
    colorField: "type",
    innerRadius: 0.6,
    label: {
      style: { fill: "#000", fontSize: 0 },
    },
    legend: {
      color: {
        position: "right",
        color: [
          "#FF5733",
          "#FFC300",
          "#33FF57",
          "#3380FF",
          "#FF33D1",
          "#A3DDD7",
        ],
        rowPadding: 10,
      },
    },
  };
  return (
    <>
      <Card
        className="h-full"
        title={
          <div className="flex justify-between">
            <span className="text-lg font-semibold">
              Сүүлд ирсэн асруулагчид
            </span>
            <div className="">
              <span className="text-lg font-semibold mr-2">Бүгд</span>
              <img src={ArrowIcon} width={20} height={20} />
            </div>
          </div>
        }
      ></Card>
    </>
  );
};

export default LatestCare;
