import {
  ProFormCaptcha,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { Col, Row, Switch } from "antd";
import {
  SectionContainer,
  SectionField,
  UploadDraggerButton,
} from "components/index";
import { SectionFieldReverse } from "components/modal/section";
import { ItemInterface } from "service/gov-settings";

export const OrphanForm: React.FC = () => {
  return (
    <div>
      <SectionField
        label="Байгууллагын нэр"
        children={
          <ProFormText
            placeholder="Байгууллагын нэр оруулна уу"
            name="companyName"
          />
        }
      />
      <SectionContainer
        children={
          <UploadDraggerButton name={"bannerImages"} required={false} />
        }
        label="Байгууллагын лого"
      />
      <div className="mb-5">
        <SectionFieldReverse
          label={"Идэвхтэй эсэх"}
          children={<Switch className="m-0 p-0" />}
        />
      </div>
      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Холбоо барих хүний мэдээлэл
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <SectionField
            label="Овог"
            children={<ProFormText placeholder="Овог" name="surname" />}
          />
        </Col>
        <Col span={12}>
          <SectionField
            label="Нэр"
            children={<ProFormText placeholder="Нэр" name="name" />}
          />
        </Col>
      </Row>
      <SectionField
        label="Албан тушаал"
        children={<ProFormSelect placeholder="Албан тушаал" name="position" />}
      />
      <SectionField
        label="Утас"
        children={
          <ProFormText
            fieldProps={{
              addonBefore: "+976",
            }}
            placeholder="Утас"
            name="phone"
          />
        }
      />
      <SectionField
        label="Цахим шуудан"
        children={<ProFormText placeholder="Имэйл" name="mail" />}
      />
      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Хандив, төлбөр хүлээн авах мэдээлэл
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <SectionField
            label="Банкны нэр"
            children={
              <ProFormSelect placeholder="Банкны нэр" name="bankName" />
            }
          />
        </Col>
        <Col span={12}>
          <SectionField
            label="Компанийн дансны дугаар"
            children={
              <ProFormText
                placeholder="Компанийн дансны дугаар"
                name="bankNumber"
              />
            }
          />
        </Col>
      </Row>
      <SectionField
        label={"Social Pay"}
        children={
          <ProFormText placeholder={"Утасны дугаар"} name="Socialpay" />
        }
      />
      <SectionField
        label="Хүлээн авагчийн нэр"
        children={
          <ProFormText placeholder="Хүлээн авагчийн нэр" name="company" />
        }
      />
      <SectionField
        label="Хэвтэн эмчлүүлэх төлбөр"
        children={
          <ProFormText
            fieldProps={{
              addonBefore: "Ор хоног",
            }}
            placeholder="50’000₮"
            name="amount"
          />
        }
      />
      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Нууц үг
      </div>
      <SectionField
        label="Нууц үг оруулна уу"
        children={
          <ProFormText.Password placeholder={"*********"} name="password" />
        }
      />
      <SectionField
        label="Нууц үг давтан оруулна уу"
        children={
          <ProFormText.Password placeholder={"*********"} name="repassword" />
        }
      />
    </div>
  );
};
