import { Col, Row } from "antd";
import { UploadButton } from "components/index";
import { ElderlyInterface } from "service/social-worker/customer/type";

type SendFormType = {
  data?: ElderlyInterface;
};

export const SendForm: React.FC<SendFormType> = ({ data }) => {
  return (
    <div className="px-8">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <UploadButton
            name={["request", "situational_file_ids"]}
            required={false}
            label="Нийгмийн ажилтны нөхцөл байдлын үнэлгээний хуудас"
            initialValue={data?.situational?.map((val, index) => ({
              uid: `${val?.id}`,
              id: `${val?.id}`,
              name: val?.original_name,
              status: "done",
              url: `https://adb-view.qpartners.tech/${val?.physical_path}`,
              size: val?.file_size,
            }))}
          />
        </Col>
        <Col span={12}>
          <UploadButton
            name={["request", "definition_governor_file_ids"]}
            required={false}
            label="Сум, хорооны Засаг даргын тодорхойлолт"
            initialValue={data?.definition_governor?.map((val, index) => ({
              uid: `${val?.id}`,
              id: `${val?.id}`,
              name: val?.original_name,
              status: "done",
              url: `https://adb-view.qpartners.tech/${val?.physical_path}`,
              size: val?.file_size,
            }))}
          />
        </Col>
      </Row>
    </div>
  );
};
