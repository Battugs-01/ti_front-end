import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useState } from "react";
import { exportFromTable } from "utils/export";
import { employeeList } from "api/app";

export const Migration: React.FC = () => {
  const [create, setCreate] = useState<boolean>(false);
  const { data, loading, run } = useRequest(employeeList);
  const columns = [
    {
      title: "Ургийн овог",
      dataIndex: "maidenName",
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
      title: "Овог",
      dataIndex: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
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
      title: "Шилжсэн огноо",
      dataIndex: "birthDate",
    },
    {
      title: "Шилжсэн төрөл",
      dataIndex: "phone",
    },
    {
      title: "Шилжсэн газар",
      dataIndex: "birthDate",
      render: (value: any) => {
        return value || "-";
      },
    },
    {
      title: "Шилжсэн шалтгаан",
      dataIndex: "birthDate",
    },
    {
      title: "Тайлбар",
      dataIndex: "birthDate",
    },
  ];
  return (
    <Card className="pt-4">
      <InitTableHeader
        hideCreate
        refresh={() => {}}
        customHeaderTitle="Шилжилт хөдөлгөөний мэдээлэл"
        setCreate={setCreate}
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Шилжилт хөдөлгөөний мэдээлэл"],
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
        // CreateComponent={}
      />
    </Card>
  );
};
