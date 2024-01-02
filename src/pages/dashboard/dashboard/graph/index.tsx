import { LineConfig } from "@ant-design/charts";
import { Line } from "@ant-design/plots";
import { useRequest } from "ahooks";
import { Card, notification } from "antd";
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

  const deadline = form.deadline ?? getDeadlineByRangeDate(form.full_date);

  const currentData = useMemo(() => {
    const tmp =
      data?.map((item) => ({
        x: item.xdata,
        y: item.ydata,
        seriesField: getTitleByDeadline(deadline, true),
      })) || [];

    //remove duplicate
    const result = tmp.reduce((acc, current) => {
      const x = acc.find((item) => item.x === current.x);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as any[]);
    return result;
  }, [data]);

  const config: LineConfig = {
    data: [...currentData],
    xField: "x",
    yField: "y",
    seriesField: "seriesField",
  };

  return (
    <Card className="h-full" title="Sales Statistics">
      <Line
        {...config}
        height={400}
        loading={loading}
        yAxis={{
          title: {
            text: "Total Revenue",
          },
        }}
        tooltip={{
          customContent: (title, data) => {
            return (
              <div className="py-5 flex items-center gap-2">
                <div>{getDateByDeadline(deadline, title)}</div>
                <div>{moneyFormat(data?.[0]?.value, "mnt")}</div>
              </div>
            );
          },
        }}
        xAxis={{
          label: {
            formatter: (value) => {
              return getDateByDeadline(deadline, value);
            },
          },
        }}
        color={({ seriesField }) => {
          const before =
            seriesField?.includes("Last") || seriesField?.includes("Yesterday");
          return before ? "#B692F6" : "#7F56D9";
        }}
        smooth
        lineStyle={({ seriesField }) => {
          const before =
            seriesField?.includes("Last") || seriesField?.includes("Yesterday");
          return {
            lineWidth: 2,
            shadowColor: before ? "#B692F6" : "#7F56D9",
            shadowBlur: before ? 0 : 4,
          };
        }}
        pattern={{
          type: "line",
          cfg: {
            strokeOpacity: 0.5,
          },
        }}
      />
    </Card>
  );
};

export default Graph;
