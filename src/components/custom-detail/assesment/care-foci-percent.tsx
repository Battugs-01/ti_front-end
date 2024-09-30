import { Pie } from "@ant-design/plots";
import { PageLoading } from "@ant-design/pro-layout";
import { useMemo } from "react";
import { CareFociPercent as CareFociPercentType } from "service/screening_list/type";

interface CareFociPercentProps {
  data: CareFociPercentType[] | undefined;
}

const CareFociPercent: React.FC<CareFociPercentProps> = ({ data }) => {
  const config = {
    height: 160,
    autoFit: true,
    limitInPlot: true,
    angleField: "percent",
    colorField: "name",
    radius: 1,
    legend: false,
    innerRadius: 0.8,
    annotations: [
      {
        type: "text",
        style: {
          text: "Care Foci",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 16,
          fontStyle: "bold",
        },
      },
    ],
    scale: {
      color: {
        palette: "custom",
        range: ["#165DFF", "#14C9C9", "#F7BA1E", "#722ED1"],
      },
    },
  };

  const dataColors = (colors: number) => {
    if (colors === 0) {
      return "#165DFF";
    }
    if (colors === 1) {
      return "#14C9C9";
    }
    if (colors === 2) {
      return "#F7BA1E";
    }
    if (colors === 3) {
      return "#722ED1";
    }
    return "#333333";
  };

  const statusData = useMemo(() => {
    return {
      list: data?.map((item, index) => {
        return {
          type: item.name,
          value: item.percent,
          color: dataColors(index),
        };
      }),
    };
  }, [data]);

  if (!data) {
    return <PageLoading />;
  }
  return (
    <>
      <Pie
        {...config}
        className="flex items-center justify-center"
        data={data}
      />
      <div className="flex flex-col gap-2 mb-2">
        {statusData.list?.map((data, index) => (
          <>
            <div className="flex justify-between items-center ml-4">
              <div key={index} className="flex items-center gap-1">
                <div
                  style={{
                    height: "12px",
                    background: data?.color,
                    width: "3px",
                  }}
                ></div>
                <span className="text-xs font-normal text-[#4E5969] ">
                  {data.type}
                </span>
              </div>
              <div className="text-xs font-medium text-[#1D2129]">
                {`${data.value}%`}
              </div>
            </div>
            {index !== 3 && (
              <div className="h-[1px] w-full bg-[#E8E8E8] ml-3 p-0 mx-0" />
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default CareFociPercent;
