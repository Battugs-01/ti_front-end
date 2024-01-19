import { Avatar, Card } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import orphanUser from "service/gov-orphan/requests";
import { CardInterface } from "service/gov-orphan";
import { calculateDeadlineDate } from "utils/index";
import { FilterDeadline } from "types";

type EmployeeType = {
  data: CardInterface;
};

export const Employees: React.FC<EmployeeType> = ({ data }) => {
  console.log(data, "kkk");
  // const [create, setCreate] = useState<boolean>(false);
  const employeeList = useRequest(() =>
    orphanUser.getEmployeeList(
      {
        pageSize: 20,
        current: 1,
        query: "",
        sortDate: {
          start_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
            el.format("YYYY-MM-DD")
          )[0],
          end_day: calculateDeadlineDate(FilterDeadline.Month)?.map((el) =>
            el.format("YYYY-MM-DD")
          )[1],
        },
      },
      data?.id
    )
  );
  useEffect(() => {
    employeeList?.run();
  }, [data]);
  console.log(employeeList.data, "jjjj");
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
    },
    {
      title: "Үндсэн цалин",
      dataIndex: "birthDate",
    },
    {
      title: "Нийт ажилласан жил",
      dataIndex: "birthDate",
    },
    {
      title: "Ажилласан жил",
      dataIndex: "birthDate",
    },
  ];
  return (
    <Card className="pt-4">
      <InitTableHeader
        hideCreate
        refresh={() => {}}
        customHeaderTitle="Ажилчдын жагсаалт"
        // setCreate={setCreate}
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
        loading={employeeList?.loading}
        dataSource={employeeList?.data}
        // CreateComponent={}
      />
    </Card>
  );
};
