import { ProFormCheckbox, ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Avatar, Card, Col, Row } from "antd";
import orphanUser from "service/gov-orphan/requests";
import BedIcon from "assets/government/icons/bed.svg";
import { UploadDraggerButton } from "components/index";
import { CardInterface } from "service/gov-orphan";

type OrphanOptions = {
  label: JSX.Element;
  value: any;
  style: React.CSSProperties;
};

export const Distribute: React.FC = () => {
  const orphanList = useRequest(() => orphanUser?.getList({}));
  return (
    <div className="custom-radio-group">
      <ProFormRadio.Group
        name="care_center_id"
        options={orphanList?.data?.items?.map(
          (val: CardInterface, key: number): OrphanOptions => {
            return {
              label: (
                <div className="flex items-center gap-3" key={key}>
                  <Avatar
                    // src={`http://103.41.112.73:9000/`}
                    shape="circle"
                    style={{ backgroundColor: "#146135" }}
                    size={40}
                  >
                    HU
                  </Avatar>
                  <div className="flex items-start flex-col gap-1 justify-start">
                    <div className="font-bold text-base">
                      {val?.organization_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={BedIcon} />
                      <div>Орны тоо:</div>
                      <div>
                        <span className="font-bold">
                          {val?.created_user_id}
                        </span>
                        / {val?.id}
                      </div>
                    </div>
                  </div>
                </div>
              ),
              value: val?.id,
              style: {
                border: "1px solid #EAECF0",
                borderRadius: "12px",
                width: "100%",
                padding: "16px",
                boxSizing: "border-box",
              },
            };
          }
        )}
      />
      <div className="px-12">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UploadDraggerButton
              name={"Ordinances_file_ids"}
              required
              label="Аймаг, дүүргийн засаг даргын захирамж"
            />
          </Col>
          <Col span={12}>
            <UploadDraggerButton
              name={"Welfare_document_file_ids"}
              required
              label="Хөдөлмөр, халамжийн үйлчилгээний газар, хэлтсийн албан тоот"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
