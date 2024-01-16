import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useState } from "react";
import { exportFromTable } from "utils/export";
import { employeeList } from "api/app";
import { moneyFormat } from "utils/index";

const SalaryList: React.FC = () => {
  const [create, setCreate] = useState<boolean>(false);
  const { data, loading, run } = useRequest(employeeList);
  const columns = [
    {
      title: "Овог",
      dataIndex: "lastName",
      render: (val: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar shape="circle" size={25} src={record?.image} />
            <div>{val}</div>
          </div>
        );
      },
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Ургийн овог",
      dataIndex: "maidenName",
    },
    {
      title: "Төрсөн огноо",
      dataIndex: "birthDate",
    },
    {
      title: "Регистрийн дугаар",
      dataIndex: "birthDate",
    },
    {
      title: "Хүйс",
      dataIndex: "gender",
    },
    {
      title: "Утасны дугаар",
      dataIndex: "phone",
    },
    {
      title: "Албан тушаал",
      dataIndex: "birthDate",
      render: (value: any) => {
        return value || "-";
      },
    },
    {
      title: "Ажилд орсон огноо",
      dataIndex: "birthDate",
    },
    {
      title: "Нийт ажиллсан жил",
      dataIndex: "birthDate",
    },
    {
      title: "Нийт ажиллсан жил",
      dataIndex: "birthDate",
    },
    {
      title: "Үндсэн цалин",
      dataIndex: "salary",
      render: (value: any) => {
        return value ? moneyFormat(value, "mnt") : "-";
      },
    },
    {
      title: "Шагналт цалин",
      dataIndex: "bonusSalary",
      render: (value: any) => {
        return value ? moneyFormat(value, "mnt") : "-";
      },
    },
  ];
  return (
    <div className="custom-ant-card-padding-remove">
      <Card className="pt-4">
        <InitTableHeader
          hideCreate
          refresh={() => {}}
          customHeaderTitle="Цалин хөлсний мэдээлэл"
          setCreate={setCreate}
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Цалин хөлсний мэдээлэл"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
        <ITable
          create={false}
          columns={columns}
          loading={loading}
          dataSource={data?.users}
          hideAction
          // CreateComponent={}
        />
      </Card>
    </div>
  );
};

export default SalaryList;
