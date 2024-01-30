import {
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { Checkbox, Col, Row, Table } from "antd";
import { SectionField } from "components/index";
import { useState } from "react";
import { ItemInterface } from "service/gov-settings";

type OrphanFormType = {
  //   data?: ItemInterface;
};

const data = [
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

export const UserForm: React.FC<OrphanFormType> = ({}) => {
  const [selectAll, setSelectAll] = useState(true);
  const [select, setSelect] = useState({
    recordKey: null,
    columnKey: null,
    selected: false,
  });

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
              checked={val && selectAll ? selectAll : select.selected}
              onChange={() => setSelectAll(false)}
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
          children={
            <Checkbox
              disabled={!val}
              onChange={(e) => {}}
              checked={val && (selectAll ? selectAll : undefined)}
            />
          }
        />
      ),
    },
    {
      title: "Засах",
      dataIndex: "isEdit",
      key: "isEdit",
      render: (val: any, record: any) => {
        return (
          <SectionField
            children={
              <Checkbox
                disabled={!val}
                onChange={(e) => {}}
                defaultChecked={val && selectAll}
              />
            }
          />
        );
      },
    },
  ];
  columns?.map((val) => console.log(val.key));

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText placeholder="Овог" name="last_name" label={"Овог"} />
        </Col>
        <Col span={12}>
          <ProFormText placeholder="Нэр" name="first_name" label="Нэр" />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            placeholder="Албан тушаал"
            name="position"
            label="Албан тушаал"
          />
        </Col>
        <Col span={12}>
          <ProFormText
            label="Утас"
            fieldProps={{
              addonBefore: "+976",
            }}
            placeholder="Утас"
            name="phone_number"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProFormText
            placeholder="sample@example.domain"
            name="email"
            label="Цахим шуудан"
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
        name="all"
        className="text-gray-900 mb-4"
        checked={selectAll}
        onChange={(e) => handleSelectAllChange(e.target.checked)}
      >
        Бүгдийг идэвхжүүлэх
      </Checkbox>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};
