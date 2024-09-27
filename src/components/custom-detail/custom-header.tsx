import { ProFormRadio } from "@ant-design/pro-form";
import { PageLoading } from "@ant-design/pro-layout";
import { Button, Pagination, Select, Tabs } from "antd";
import RefreshIcon from "assets/img/refresh.svg";
import LevelBadge from "components/badge/level";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { AssessmentListType } from "service/screening_list/type";
import {
  ArrowNarrowLeft,
  ArrowNarrowRight,
  DownloadCloud02,
  Printer,
} from "untitledui-js-base";
import { useLevelContext } from "./selected-level";
import { LeftCircleOutlined } from "@ant-design/icons";
import { BiRightArrow } from "react-icons/bi";
import { set } from "lodash";

interface CustomHeaderProps {
  data: AssessmentListType[];
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ data }) => {
  const { selectedLevel, setSelectedLevel } = useLevelContext();
  const [tab, setTab] = useState(data[0]?.id || null);

  const initialData = data.slice(0, 3);
  const extraItems = data.slice(3);
  const segmentedData = initialData?.map((item) => ({
    label: (
      <div className="flex items-center gap-2 text-[16px] justify-center  text-[#144E5A] font-semibold">
        {dayjs(item?.date).format("YYYY-MM-DD")}
        <LevelBadge status={item.level} OneNone={true} />
      </div>
    ),
    value: item?.id,
  }));

  const extraOptions = extraItems?.map((item) => ({
    value: item.id,
    label: (
      <div className="flex items-center gap-2 text-[16px] justify-center text-[#144E5A] font-semibold">
        {dayjs(item?.date).format("YYYY-MM-DD")}
        <LevelBadge status={item.level} OneNone={true} />
      </div>
    ),
  }));

  useEffect(() => {
    if (tab === null) {
      setTab(data[0]?.id || null);
    }
    const level = data?.find((entry) => entry?.id === tab);
    if (level) {
      setSelectedLevel(level);
    }
  }, [data, tab]);

  if (!selectedLevel) {
    return <PageLoading />;
  }

  return (
    <>
      <div>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
          <div className="lg:w-[75%] w-full flex">
            <ProFormRadio.Group
              className="flex items-center gap-2"
              radioType="button"
              options={segmentedData || []}
              fieldProps={{
                size: "large",
                value: tab,
                className: "custom-select",
                onChange: (e) => {
                  setTab(e.target.value);
                  const level = data?.find((entry) => entry?.id === tab);
                  if (level) {
                    setSelectedLevel(level);
                  }
                },
              }}
            />
            {extraItems.length > 0 && (
              <Select
                style={{ width: 210 }}
                size="large"
                className="custom-select rounded-r-lg custom-selected-level"
                placeholder={<FormattedMessage id="select" />}
                options={extraOptions}
                onChange={(value) => {
                  setTab(value);
                  const level = data?.find((entry) => entry?.id === value);
                  if (level) {
                    setSelectedLevel(level);
                  }
                }}
              />
            )}
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
    </>
  );
};

export default CustomHeader;
