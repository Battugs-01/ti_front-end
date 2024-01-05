import { Pie } from "@ant-design/charts";
import { Card, Progress, Tooltip } from "antd";
import { FC } from "react";

const TopReviews: FC = () => {
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
      { type: "81-100", value: 27 },
      { type: "61-80", value: 25 },
      { type: "41-60", value: 18 },
      { type: "21-40", value: 15 },
      { type: "0-20", value: 10 },
    ],
    angleField: "value",
    colorField: "type",
    innerRadius: 0.6,
    label: {
      style: { fill: "#000", fontSize: 0 },
    },
    legend: {
      color: {
        position: "right",
        rowPadding: 10,
      },
      textStyle: {
        fontSize: 14,
        color: "blue",
      },
    },
  };
  return (
    <>
      <Card
        className="h-full"
        title={
          <span className="text-base font-semibold">
            Асруулагчдын насны ангилал
          </span>
        }
      >
        <Pie
          {...config}
          height={200}
          className="mb-5"
          scale={{
            color: {
              range: ["#144E5A", "#416D74", "#A0B6BA", "#CFDADC", "#E7EDEE"],
            },
          }}
        />
        <div className="flex flex-col gap-12">
          <div className="flex flex-row  justify-between">
            <div className="flex flex-col">
              <span className="text-[#475467] text-sm font-normal">
                {"Эрэгтэй"}
              </span>
              <span className="text-[#144E5A] text-2xl font-bold">{60}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#475467] text-sm font-normal">
                Эмэгтэй
              </span>
              <span>
                <span className="text-[#144E5A] text-2xl font-bold">46</span>
              </span>
            </div>
          </div>
        </div>
        <Tooltip>
          <Progress
            percent={60}
            success={{ percent: 30, strokeColor: "#144E5A" }}
            strokeColor={"#A0B6BA"}
            strokeWidth={20}
            type="line"
            showInfo={false}
            strokeLinecap="butt"
            // trailColor={"#E5E5E5"}
          />
        </Tooltip>
        {/* <Progress
            className="tw-ml-auto"
            width={40}
            strokeWidth={12}
            strokeColor={{
              '0%': colors.secondary.green,
              '100%': colors.primary.light,
            }}
            type="circle"
            percent={Math.round((numberifier(current) / numberifier(limit) || 0) * 100)}
            status="active"
          />  */}
      </Card>
    </>
  );
};

export default TopReviews;
