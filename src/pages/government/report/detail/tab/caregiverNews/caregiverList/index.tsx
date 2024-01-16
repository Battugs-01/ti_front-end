import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { Children, useState } from "react";
import { exportFromTable } from "utils/export";
import { employeeList } from "api/app";
import { moneyFormat } from "utils/index";

const CaregiverList: React.FC = () => {
  const [create, setCreate] = useState<boolean>(false);
  const { data, loading, run } = useRequest(employeeList);
  const columns = [
    {
      title: "Ерөнхий мэдээлэл",
      children: [
        {
          title: "Ургийн овог",
          dataIndex: "maidenName",
          width: 150,
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
          width: 100,
        },
        {
          title: "Овог",
          dataIndex: "lastName",
          width: 100,
        },
        {
          title: "Регистрийн дугаар",
          dataIndex: "birthDate",
          width: 200,
        },
        {
          title: "Хүйс",
          dataIndex: "gender",
          width: 100,
        },
      ],
    },
    {
      title: "Үндсэн харьяалал",
      children: [
        {
          title: "Аймаг/Нийслэл",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.state || "-";
          },
        },
        {
          title: "Сум/Дүүрэг",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.city || "-";
          },
        },
        {
          title: "Баг/Хороо",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.address || "-";
          },
        },
      ],
    },
    {
      title: "Өмнө амьдарч байсан хаяг",
      children: [
        {
          title: "Аймаг/Нийслэл",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.state || "-";
          },
        },
        {
          title: "Сум/Дүүрэг",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.city || "-";
          },
        },
        {
          title: "Баг/Хороо",
          dataIndex: "address",
          width: 120,
          render: (value: any) => {
            return value?.address || "-";
          },
        },
      ],
    },
    {
      title: "Бусад мэдээлэл",
      children: [
        {
          title: "Гэрлэлтийн байдал",
          dataIndex: "pension",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Хүүхдийн тоо",
          width: 120,
          dataIndex: "care",
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Боловсрол",
          dataIndex: "other_service",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Архаг хууч өвчтэй эсэх",
          dataIndex: "insurance_discounts",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Байнгийн асаргаа",
          dataIndex: "welfare_discount",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
      ],
    },
    {
      title: "Нийгмийн хамгаалал",
      children: [
        {
          title: "Тэтгэвэр",
          dataIndex: "pension",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Халамж",
          width: 120,
          dataIndex: "care",
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Халамжийн бусад үйлчилгээ",
          dataIndex: "other_service",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Даатгалын хөнгөлөлт",
          dataIndex: "insurance_discounts",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Халамжийн хөнгөлөлт",
          dataIndex: "welfare_discount",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
        {
          title: "Амралт сувилал",
          dataIndex: "resort",
          width: 120,
          render: (value: any) => {
            return value || "-";
          },
        },
      ],
    },
  ];
  return (
    <div className="custom-ant-card-padding-remove">
      <Card className="pt-4">
        <InitTableHeader
          hideCreate
          refresh={() => {}}
          customHeaderTitle="Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ"
          setCreate={setCreate}
          toolbarItems={
            <div className="flex">
              <ExportButton
                onClick={() => {
                  exportFromTable(
                    [
                      "Төрөлжсөн асрамжийн үйл ажиллагаа эрхэлдэг аж ахуйн нэгж, байгууллагаар асруулагчийн жилийн мэдээ",
                    ],
                    window.document.getElementById("main-table") as HTMLElement,
                    window
                  );
                }}
              />
            </div>
          }
        />
        <div className="mt-5">
          <ITable
            hideAction
            scroll={{ x: 2000 }}
            create={false}
            columns={columns}
            loading={loading}
            dataSource={data?.users}
          />
        </div>
      </Card>
    </div>
  );
};

export default CaregiverList;
