import { ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Card, Col, Row } from "antd";
import orphanUser from "service/gov-orphan/requests";
import BedIcon from "assets/government/icons/bed.svg";
import { UploadDraggerButton } from "components/index";

export const Distribute: React.FC = () => {
  const orphanList = useRequest(() => orphanUser?.getList({}));
  return (
    <div>
      <ProFormRadio.Group name="radio">
        <div className="grid-cols-2 grid gap-5 mx-12 custom-ant-card-padding-border-remove">
          {orphanList?.data?.map((val, key) => {
            return (
              <Card className="pt-4 px-4">
                <ProFormRadio initialValue={val?.id}>
                  {" "}
                  <div className="flex items-center gap-3">
                    <Avatar
                      // src={`https://adb-view.qpartners.tech/`}
                      shape="circle"
                      style={{ backgroundColor: "#146135" }}
                      size={40}
                    >
                      HU
                    </Avatar>
                    <div className="flex items-start flex-col gap-1 justify-start">
                      <div className="font-bold text-base">{val?.name}</div>
                      <div className="flex items-center gap-1">
                        <img src={BedIcon} />
                        <div>Орны тоо:</div>
                        <div>
                          <span className="font-bold">{val?.reserved}</span>/{" "}
                          {val?.capacity}
                        </div>
                      </div>
                    </div>
                  </div>
                </ProFormRadio>
              </Card>
            );
          })}
        </div>
      </ProFormRadio.Group>
      <div className="px-12">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UploadDraggerButton
              name={["request", "situational_file_ids"]}
              required
              label="Аймаг, дүүргийн засаг даргын захирамж"
            />
          </Col>
          <Col span={12}>
            <UploadDraggerButton
              name={["request", "definition_governor_file_ids"]}
              required
              label="Хөдөлмөр, халамжийн үйлчилгээний газар, хэлтсийн албан тоот"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
