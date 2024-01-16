import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useState } from "react";
import { exportFromTable } from "utils/export";
import { employeeList } from "api/app";
import { moneyFormat } from "utils/index";

const DCaregiverList: React.FC = () => {
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
      title: "Нэр",
      dataIndex: "firstName",
    },
    {
      title: "Овог",
      dataIndex: "lastName",
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
      title: "Аймаг/Нийслэл",
      dataIndex: "address",
      render: (value: any) => {
        return value?.state || "-";
      },
    },
    {
      title: "Сум/Дүүрэг",
      dataIndex: "address",
      render: (value: any) => {
        return value?.city || "-";
      },
    },
    {
      title: "Баг/Хороо",
      dataIndex: "address",
      render: (value: any) => {
        return value?.address || "-";
      },
    },
    {
      title: "Гудамж/Хороолол",
      dataIndex: "address",
      render: (value: any) => {
        return value?.address || "-";
      },
    },
    {
      title: "Байшин/Байр",
      dataIndex: "address",
      render: (value: any) => {
        return value?.address || "-";
      },
    },
    {
      title: "Хашаа/Хаалга",
      dataIndex: "address",
      render: (value: any) => {
        return value?.address || "-";
      },
    },
  ];
  return (
    <div className="custom-ant-card-padding-remove">
      <Card className="pt-4">
        <InitTableHeader
          hideCreate
          refresh={() => {}}
          customHeaderTitle="Нас барсан асруулагчийн мэдээлэл"
          setCreate={setCreate}
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    ["Нас барсан асруулагчийн мэдээлэл"],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
        <ITable
          hideAction
          create={false}
          columns={columns}
          loading={loading}
          dataSource={data?.users}
        />
      </Card>
    </div>
  );
};

export default DCaregiverList;
