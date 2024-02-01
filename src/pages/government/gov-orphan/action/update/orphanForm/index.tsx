import {
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { UploadDraggerButton } from "components/index";
import { CardInterface } from "service/gov-orphan";

type FormType = {
  data?: CardInterface;
};

export const OrphanForm: React.FC<FormType> = ({ data }) => {
  return (
    <div>
      <ProFormText
        initialValue={data?.organization_name}
        label="Байгууллагын нэр"
        placeholder="Байгууллагын нэр оруулна уу"
        name="organization_name"
      />
      <UploadDraggerButton
        name={"files"}
        required={false}
        label="Байгууллагын лого"
      />
      <div className="mb-5">
        <ProFormSwitch
          initialValue={data?.is_active}
          className="m-0 p-0"
          name="is_active"
          label="Идэвхтэй эсэх"
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
          <ProFormText
            initialValue={data?.contact?.last_name}
            placeholder="Овог"
            name="last_name"
            label="Овог"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            initialValue={data?.contact?.first_name}
            placeholder="Нэр"
            name="first_name"
            label="Нэр"
          />
        </Col>
      </Row>
      <ProFormSelect
        initialValue={data?.contact?.position}
        placeholder="Албан тушаал"
        name="position"
        label="Албан тушаал"
      />
      <ProFormText
        initialValue={data?.contact?.phone}
        fieldProps={{
          addonBefore: "+976",
        }}
        placeholder="Утас"
        name="phone"
        label="Утас"
      />
      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Нэвтрэх
      </div>
      <ProFormText placeholder="Имэйл" name="email" label="Цахим шуудан" />
      <ProFormText.Password
        placeholder={"*********"}
        name="password"
        label="Нууц үг оруулна уу"
      />
      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Хандив, төлбөр хүлээн авах мэдээлэл
      </div>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <ProFormSelect
            initialValue={data?.payment?.bank_name}
            placeholder="Банкны нэр"
            name="bank_name"
            label="Банкны нэр"
          />
        </Col>
        <Col span={14}>
          <ProFormText
            initialValue={data?.payment?.account_number}
            placeholder="Компанийн дансны дугаар"
            name="account_number"
            label="Компанийн дансны дугаар"
          />
        </Col>
      </Row>
      <ProFormText
        placeholder={"Утасны дугаар"}
        name="Socialpay"
        label="Утасны дугаар"
      />
      <ProFormText
        initialValue={data?.payment?.reciever_name}
        placeholder="Хүлээн авагчийн нэр"
        name="reciever_name"
        label="Хүлээн авагчийн нэр"
      />
      <ProFormText
        label="Хэвтэн эмчлүүлэх төлбөр"
        fieldProps={{
          addonBefore: "Ор хоног",
        }}
        placeholder="50’000₮"
        name="amount"
      />

      {/* <SectionField
          label="Нууц үг давтан оруулна уу"
          children={
            <ProFormText.Password placeholder={"*********"} name="repassword" />
          }
        /> */}
    </div>
  );
};