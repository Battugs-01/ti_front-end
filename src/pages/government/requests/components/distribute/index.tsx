import { ProFormCheckbox, ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Alert, Avatar, Card, Col, Row } from "antd";
import orphanUser from "service/gov-orphan/requests";
import BedIcon from "assets/government/icons/bed.svg";
import { UploadButton, UploadDraggerButton } from "components/index";
import { CardInterface } from "service/gov-orphan";
import ExclamaionMarkIcon from "assets/government/icons/exclamation-mark.svg";

type OrphanOptions = {
  label: JSX.Element;
  value: any;
  style: React.CSSProperties;
};

type DistributeProps = {
  data?: CardInterface[];
};

export const Distribute: React.FC<DistributeProps> = ({ data }) => {
  return (
    <div className="custom-radio-group">
      {data?.length === 0 ? (
        <Alert
          className="bg-[#E7EDEE] text-slate-700 mb-4 mx-12"
          style={{ border: "1px solid #D0D5DD" }}
          type="info"
          message={
            <div className="text-slate-700 font-semibold flex items-center gap-3">
              <img src={ExclamaionMarkIcon} alt="image" />
              <div>Батлагдсан асрамжийн газар байхгүй байна.</div>
            </div>
          }
        />
      ) : (
        <ProFormRadio.Group
          name="care_center_id"
          options={data?.map(
            (val: CardInterface, key: number): OrphanOptions => {
              return {
                label: (
                  <div className="flex items-center gap-3" key={key}>
                    <Avatar
                      src={`https://adb-view.qpartners.tech/${val?.logo?.physical_path}`}
                      shape="circle"
                      style={{ backgroundColor: "#146135" }}
                      size={40}
                    />
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
      )}
      <div className="px-12">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <UploadButton
              name={"ordinances_file_ids"}
              required
              label="Аймаг, дүүргийн засаг даргын захирамж"
            />
          </Col>
          <Col span={12}>
            <UploadButton
              name={"welfare_document_file_ids"}
              required
              label="Хөдөлмөр, халамжийн үйлчилгээний газар, хэлтсийн албан тоот"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};
