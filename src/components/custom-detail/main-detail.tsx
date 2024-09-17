import { ProFormRadio } from "@ant-design/pro-form";
import { Button } from "antd";
import RefreshIcon from "assets/img/refresh.svg";
import LevelBadge from "components/badge/level";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AssessmentListType } from "service/screening_list/type";
import { DownloadCloud02, Printer } from "untitledui-js-base";
import QuistionHistory from "./quistion-history";

interface MainDetailProps {
  data: AssessmentListType[];
}

const MainDetail: React.FC<MainDetailProps> = ({ data }) => {
  const segmentedData = data?.map((item) => ({
    label: (
      <div className="flex items-center gap-2 text-[16px] justify-center  text-[#144E5A]">
        {dayjs(item.date).format("YYYY-MM-DD")}
        <LevelBadge status={item.level} OneNone={true} />
        {/* <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium truncate bg-[#F2F4F7] text-[#344054] `}
        >
          {item.level}
        </span> */}
      </div>
    ),
    value: item.id,
  }));

  const [tab, setTab] = useState(data[0]?.id || null);

  useEffect(() => {
    if (data) {
      setTab(data[0]?.id);
    }
  }, [data]);

  return (
    <>
      <div>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
          <div className="w-[75%]">
            <ProFormRadio.Group
              className="flex items-center gap-2"
              radioType="button"
              options={segmentedData || []}
              fieldProps={{
                size: "large",
                value: tab,
                onChange: (e) => {
                  setTab(e.target.value);
                },
              }}
            />
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            <Button
              size="large"
              type="default"
              icon={<DownloadCloud02 />}
              className="flex items-center gap-2"
            >
              <FormattedMessage id="download" />
            </Button>
            <Button
              size="large"
              type="default"
              icon={<Printer />}
              className="flex items-center gap-2"
            >
              <FormattedMessage id="print" />
            </Button>
            <img
              src={RefreshIcon}
              className="flex items-center gap-2 hover:scale-75"
            />
          </div>
        </div>
      </div>
      <QuistionHistory data={data ?? []} tab={tab ?? 0} />
    </>
  );
};

export default MainDetail;
