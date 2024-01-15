import { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Col, Row } from "antd";
import { SectionField } from "components/index";
import { ItemInterface } from "service/gov-settings";

type OrphanFormType = {
  data?: ItemInterface;
};

export const OrphanForm: React.FC<OrphanFormType> = ({ data }) => {
  return (
    <div>
      <div className="font-medium text-lg mb-4">
        Компанитай холбоо барих хүний мэдээлэл
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <SectionField
            label="Овог"
            children={
              <ProFormText
                initialValue={data?.lastName}
                placeholder="Овог"
                name="surname"
              />
            }
          />
        </Col>
        <Col span={12}>
          <SectionField
            label="Нэр"
            children={
              <ProFormText
                initialValue={data?.firstName}
                placeholder="Нэр"
                name="name"
              />
            }
          />
        </Col>
      </Row>
      <SectionField
        label="Албан тушаал"
        children={
          <ProFormText
            placeholder="Албан тушаал"
            name="position"
            initialValue={data?.position}
          />
        }
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
            initialValue={data?.phone}
          />
        }
      />
      <SectionField
        label="Цахим шуудан"
        children={
          <ProFormText
            placeholder="Имэйл"
            name="mail"
            initialValue={data?.mail}
          />
        }
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
              <ProFormSelect
                placeholder="Банкны нэр"
                name="bankName"
                initialValue={data?.bankName}
              />
            }
          />
        </Col>
        <Col span={12}>
          <SectionField
            label="Компанийн дансны дугаар"
            children={
              <ProFormText
                initialValue={data?.bankNumber}
                placeholder="Компанийн дансны дугаар"
                name="bankNumber"
              />
            }
          />
        </Col>
      </Row>
      <SectionField
        label="Хүлээн авагчийн нэр"
        children={
          <ProFormText
            initialValue={data?.company}
            placeholder="Хүлээн авагчийн нэр"
            name="company"
          />
        }
      />
      <SectionField
        label="Хэвтэн эмчлүүлэх төлбөр"
        children={
          <ProFormText
            fieldProps={{
              addonBefore: "Ор хоног",
            }}
            initialValue={data?.amount}
            placeholder="50’000₮"
            name="amount"
          />
        }
      />
    </div>
  );
};
