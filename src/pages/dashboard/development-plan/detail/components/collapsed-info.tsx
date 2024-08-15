import { Badge, Button, Card, Collapse, Divider } from "antd";
import { CustomCard } from "components/card";
import dayjs from "dayjs";
import { ChevronDown, ChevronUp, DotsVertical } from "untitledui-js-base";

interface InfoProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export const Info: React.FC<InfoProps> = ({ title, children, className }) => {
  return (
    <Collapse
      items={[
        {
          key: title,
          label: <div className="text-lg text-gray-800">{title}</div>,
          children: (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  Agency: <span className="font-bold">Ner</span>
                </div>
                <Badge status="default" />
                <div>
                  CM in charge: <span className="font-bold">Ner</span>
                </div>
                <Badge status="default" />
                <div>
                  Assessment Date:{" "}
                  <span className="font-bold">
                    {dayjs(new Date()).format("DD/MM/YYYY")}
                  </span>
                </div>
                <Badge status="default" />

                <div>
                  Date of Next Review:{" "}
                  <span className="font-bold">
                    {dayjs(new Date()).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card
                    key={index}
                    title={
                      <div className="text-sm text-[#475467]">
                        Blood Preasure
                      </div>
                    }
                    extra={<DotsVertical />}
                    className="bg-[#E7EDEE] lg:w-[23%] md:w-2/5 w-full"
                  >
                    <div className="text-2xl font-semibold">123</div>
                  </Card>
                ))}
              </div>
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
              <div className="font-semibold text-base">Hide Details</div>
              <ChevronUp />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="font-semibold text-base">Show details</div>
              <ChevronDown />
            </div>
          )}
        </Button>
      )}
      className={`p-8 ${className}`}
      style={{ border: "1px solid #D0D5DD" }}
    />
  );
};
