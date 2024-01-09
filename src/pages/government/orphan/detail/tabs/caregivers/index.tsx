import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useState } from "react";
import { exportFromTable } from "utils/export";
import { employeeList } from "api/app";

export const Caregivers: React.FC = () => {
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
      title: "Регистрийн дугаар",
      dataIndex: "birthDate",
    },
    {
      title: "Нас",
      dataIndex: "age",
    },
    {
      title: "Асруулсан тоо",
      dataIndex: "birthDate",
    },
    {
      title: "Хүйс",
      dataIndex: "gender",
    },
    {
      title: "Бүртгүүлсэн огноо",
      dataIndex: "phone",
    },
    {
      title: "Ирсэн огноо",
      dataIndex: "birthDate",
    },
    {
      title: "Асруулах шалтгаан",
      dataIndex: "birthDate",
    },
    {
      title: "Боловсрол",
      dataIndex: "birthDate",
    },
    {
      title: "Хөгжлийн бэрхшээлтэй эсэх",
      dataIndex: "birthDate",
    },
  ];
  return (
    <Card className="pt-4">
      <InitTableHeader
        hideCreate
        refresh={() => {}}
        customHeaderTitle="Асруулагчдын жагсаалт"
        setCreate={setCreate}
        toolbarItems={
          <div className="flex">
            <ExportButton
              onClick={() => {
                exportFromTable(
                  ["Ажилчдын жагсаалт"],
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
