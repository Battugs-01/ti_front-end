import {
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { UploadDraggerButton } from "components/index";
import { BankList, FORM_ITEM_RULE } from "config";

export const OrphanForm: React.FC = () => {
  return (
    <div>
      <ProFormText
        label="Байгууллагын нэр"
        placeholder="Байгууллагын нэр оруулна уу"
        name="organization_name"
        rules={FORM_ITEM_RULE()}
      />
      <UploadDraggerButton
        name={"files"}
        required={false}
        label="Байгууллагын лого"
        rules={FORM_ITEM_RULE()}
      />
      <div className="mb-5">
        <ProFormSwitch
          className="m-0 p-0"
          name="is_active"
          label="Идэвхтэй эсэх"
          rules={FORM_ITEM_RULE()}
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
            placeholder="Овог"
            name="last_name"
            label="Овог"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            placeholder="Нэр"
            name="first_name"
            label="Нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <ProFormSelect
        placeholder="Албан тушаал"
        name="position"
        label="Албан тушаал"
        rules={FORM_ITEM_RULE()}
      />
      <ProFormText
        fieldProps={{
          addonBefore: "+976",
        }}
        placeholder="Утас"
        name="phone"
        label="Утас"
        rules={FORM_ITEM_RULE()}
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
            options={BankList.map(({ label, value, image }) => ({
              label: (
                <div className="flex gap-2 items-center">
                  <img src={image} /> <div>{label}</div>
                </div>
              ),
              value,
            }))}
            placeholder="Банкны нэр"
            name="bank_name"
            label="Банкны нэр"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
        <Col span={14}>
          <ProFormText
            placeholder="Компанийн дансны дугаар"
            name="account_number"
            label="Компанийн дансны дугаар"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
      <ProFormText
        placeholder={"Утасны дугаар"}
        name="Socialpay"
        label="Утасны дугаар"
        rules={FORM_ITEM_RULE()}
      />
      <ProFormText
        placeholder="Хүлээн авагчийн нэр"
        name="reciever_name"
        label="Хүлээн авагчийн нэр"
        rules={FORM_ITEM_RULE()}
      />
      <ProFormText
        label="Хэвтэн эмчлүүлэх төлбөр"
        fieldProps={{
          addonBefore: "Ор хоног",
        }}
        placeholder="50’000₮"
        name="amount"
        rules={FORM_ITEM_RULE()}
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
