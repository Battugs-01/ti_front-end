import { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Checkbox, Col, Row, Table } from "antd";
import { SectionField } from "components/index";
import { useState } from "react";
import { ItemInterface, UserList } from "service/gov-settings";

type UserFormType = {
  data?: UserList;
};

const source = [
  {
    key: 1,
    name: "Хүсэлтүүд",
    isCreate: false,
    isSaw: true,
    isEdit: true,
  },
  {
    key: 2,
    name: "Тайлан",
    isCreate: false,
    isSaw: true,
    isEdit: false,
  },
  {
    key: 3,
    name: "Асруулагч",
    isCreate: true,
    isSaw: true,
    isEdit: true,
  },
  {
    key: 4,
    name: "Асрамжийн газар",
    isCreate: true,
    isSaw: true,
    isEdit: true,
  },
];

export const UserForm: React.FC<UserFormType> = ({ data }) => {
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
  };

  const columns = [
    {
      title: "Нэр",
      dataIndex: "name",
      key: "name",
      render: (val: any) => <div className="font-bold p-4">{val}</div>,
    },
    {
      title: "Үүсгэх",
      dataIndex: "isCreate",
      key: "isCreate",
      render: (val: any, record: any) => (
        <SectionField
          children={
            <Checkbox
              disabled={!val}
              checked={val && selectAll}
              className="px-4 py-2"
            />
          }
        />
      ),
    },
    {
      title: "Харах",
      dataIndex: "isSaw",
      key: "isSaw",
      render: (val: any, record: any) => (
        <SectionField
          children={<Checkbox disabled={!val} checked={val && selectAll} />}
        />
      ),
    },
    {
      title: "Засах",
      dataIndex: "isEdit",
      key: "isEdit",
      render: (val: any, record: any) => (
        <Checkbox disabled={!val} checked={val && selectAll} />
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            label="Овог"
            initialValue={data?.last_name}
            placeholder="Овог"
            name="last_name"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Нэр"
            initialValue={data?.first_name}
            placeholder="Нэр"
            name="first_name"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            label="Албан тушаал"
            initialValue={data?.position}
            placeholder="Албан тушаал"
            name="position"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Утас"
            fieldProps={{
              addonBefore: "+976",
            }}
            initialValue={data?.phone}
            placeholder="Утас"
            name="phone_number"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            label="Цахим шуудан"
            initialValue={data?.email}
            placeholder="sample@example.domain"
            name="email"
          />
        </Col>
        <Col span={12}>
          <ProFormText.Password
            placeholder="*************"
            name="password"
            label="Нууц үг"
          />
        </Col>
      </Row>

      <div
        className="font-medium text-lg mb-4 pt-5"
        style={{ borderTop: "1px solid #EAECF0" }}
      >
        Хандах эрхийн зөвшөөрөл
      </div>
      <Checkbox
        className="text-gray-900 mb-4"
        checked={selectAll}
        onChange={(e) => handleSelectAllChange(e.target.checked)}
      >
        Бүгдийг идэвхжүүлэх
      </Checkbox>
      <Table columns={columns} dataSource={source} pagination={false} />
    </div>
  );
};
