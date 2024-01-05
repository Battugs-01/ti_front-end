import { LineConfig } from "@ant-design/charts";
import { Line } from "@ant-design/plots";
import { useRequest } from "ahooks";
import { Button, Card, notification } from "antd";
import { useAtom } from "jotai";
import { FC, useEffect, useMemo } from "react";
import dashboard from "service/dashboard";
import { StatInput } from "service/dashboard/types";
import {
  getDateByDeadline,
  getDeadlineByRangeDate,
  getTitleByDeadline,
  moneyFormat,
} from "utils/index";
import { atomFormDashboard } from "../store";
import Title from "antd/es/skeleton/Title";
import { Area } from "@ant-design/plots";

const Graph: FC = () => {
  const { data, run, loading } = useRequest(dashboard.stats, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const [form] = useAtom(atomFormDashboard);

  const fetch = () => {
    if (form.full_date) {
      const filter: StatInput = {
        start_date: form.full_date?.[0],
        end_date: form.full_date?.[1],
        pre_start_date: form.pre_full_date?.[0],
        pre_end_date: form.pre_full_date?.[1],
        type: form.type,
      };
      run(filter);
    }
  };

  useEffect(() => {
    fetch();
  }, [form]);

  // const deadline = form.deadline ?? getDeadlineByRangeDate(form.full_date);

  // const currentData = useMemo(() => {
  //   const tmp =
  //     data?.map((item) => ({
  //       x: item.xdata,
  //       y: item.ydata,
  //       seriesField: getTitleByDeadline(deadline, true),
  //     })) || [];

  //   //remove duplicate
  //   const result = tmp.reduce((acc, current) => {
  //     const x = acc.find((item) => item.x === current.x);
  //     if (!x) {
  //       return acc.concat([current]);
  //     } else {
  //       return acc;
  //     }
  //   }, [] as any[]);
  //   return result;
  // }, [data]);

  // const config: LineConfig = {
  //   data: [...currentData],
  //   xField: "x",
  //   yField: "y",
  //   seriesField: "seriesField",
  // };

  const dataSource = [
    {
      date: "2006",
      close: 93.24,
    },
    {
      date: "2007",
      close: 95.35,
    },
    {
      date: "2008",
      close: 98.84,
    },
    {
      date: "2009",
      close: 99.92,
    },
    {
      date: "2010",
      close: 99.8,
    },
  ];

  const config = {
    data: dataSource || [],
    xField: "date",
    yField: "close",

    yAxis: {
      visible: true,
      //   min: 0,
      //   max: 100,
      step: 50,
      // label: {
      //   formatter: (text: string) => {
      //     return moneyFormatWithCurrency(Number(text), currency);
      //   },
      // },
    },
    // seriesField: "type",
    xAxis: {
      range: [0, 1],
      tickCount: 5,
    },
    areaStyle: () => {
      return {
        fill: "l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff",
      };
    },
    smooth: true,
    height: 290,
  };

  return (
    <Card
      className="h-full"
      title={
        <span className="text-base font-semibold">Нийт асруулагчдын тоо</span>
      }
    >
      <Area
        {...(config as any)}
        // xAxis={{
        //   range: [0, 1],
        //   tickCount: 5,
        //   label: {
        //     formatter: (text: string) => {
        //       return moneyFormatWithCurrency(Number(text), currency);
        //     },
        //   },
        // }}
        height={280}
        tooltip={{
          formatter: (datum: any) => {
            return {
              name: "Usage",
              value: "close",
            };
          },
        }}
      />
    </Card>
  );
};

export default Graph;
