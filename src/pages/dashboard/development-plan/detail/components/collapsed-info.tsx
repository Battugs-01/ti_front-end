import { Badge, Button, Card, Collapse, Divider } from "antd";
import { agencyArray } from "config";
import dayjs from "dayjs";
import { FormattedMessage } from "react-intl";
import { AssessmentListType } from "service/screening_list/type";
import { ChevronDown, ChevronUp, DotsVertical } from "untitledui-js-base";

interface InfoProps {
  title: React.ReactNode | string;
  children?: React.ReactNode;
  className?: string;
  data?: AssessmentListType;
}

export const Info: React.FC<InfoProps> = ({
  title,
  children,
  className,
  data,
}) => {
  return (
    <Collapse
      onChange={(value) => {
        if (value.length > 0) {
          console.log("call api");
        }
      }}
      items={[
        {
          key: "key",
          label: (
            <div className="flex flex-col gap-4 w-full">
              <div className="text-lg text-gray-800 mb-6">{title}</div>
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <FormattedMessage id="agency" />:{" "}
                  <span className="font-bold">
                    {
                      agencyArray?.find(
                        (val) => val.value === data?.employee?.agency_id
                      )?.label
                    }
                  </span>
                </div>
                <Badge status="default" />
                <div>
                  <FormattedMessage id="cm_in_charge" />:{" "}
                  <span className="font-bold">
                    {data?.employee?.first_name}
                  </span>
                </div>
                <Badge status="default" />
                <div>
                  <FormattedMessage id="date_of_assessment" />:{" "}
                  <span className="font-bold">
                    {dayjs(data?.date).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <Card
                  title={
                    <div className="text-sm text-[#475467]">
                      <FormattedMessage id="blood_pressure" />
                    </div>
                  }
                  extra={<DotsVertical />}
                  className="bg-[#E7EDEE] lg:w-[23%] md:w-2/5 w-full"
                >
                  <div className="text-2xl font-semibold">
                    {data?.blood_presure}
                  </div>
                </Card>
                <Card
                  title={
                    <div className="text-sm text-[#475467]">
                      <FormattedMessage id="heart_rate" />
                    </div>
                  }
                  extra={<DotsVertical />}
                  className="bg-[#E7EDEE] lg:w-[23%] md:w-2/5 w-full"
                >
                  <div className="text-2xl font-semibold">
                    {data?.heart_rate}
                  </div>
                </Card>
                <Card
                  title={
                    <div className="text-sm text-[#475467]">
                      <FormattedMessage id="rr" />
                    </div>
                  }
                  extra={<DotsVertical />}
                  className="bg-[#E7EDEE] lg:w-[23%] md:w-2/5 w-full"
                >
                  <div className="text-2xl font-semibold">
                    {data?.respiratory_rate}
                  </div>
                </Card>
                <Card
                  title={
                    <div className="text-sm text-[#475467]">
                      <FormattedMessage id="t" />
                    </div>
                  }
                  extra={<DotsVertical />}
                  className="bg-[#E7EDEE] lg:w-[23%] md:w-2/5 w-full"
                >
                  <div className="text-2xl font-semibold">
                    {data?.body_temp}
                  </div>
                </Card>
              </div>
            </div>
          ),
          children: (
            <div className="flex flex-col gap-4">
              <Divider />
              <div>{children}</div>
            </div>
          ),
        },
      ]}
      expandIconPosition="end"
      expandIcon={(panel) => (
        <Button size="large">
          {panel.isActive ? (
            <div className="flex items-center gap-2">
              <div className="font-semibold text-base">
                <FormattedMessage id="hide_details" />
              </div>
              <ChevronUp />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="font-semibold text-base">
                <FormattedMessage id="show_details" />
              </div>
              <ChevronDown />
            </div>
          )}
        </Button>
      )}
      className={`p-8 ${className}`}
      style={{ border: "1px solid #D0D5DD", display: "block" }}
    />
  );
};
