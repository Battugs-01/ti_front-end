import { Avatar, Card, notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import { exportFromTable } from "utils/export";
import orphanUser from "service/gov-orphan/requests";
import { CardInterface } from "service/gov-orphan";
import { calculateDeadlineDate } from "utils/index";
import { FilterDeadline } from "types";
import { useAtom } from "jotai";
import { atomWorkersForm } from "utils/store";

type EmployeeType = {
  data: CardInterface;
};

export const Employees: React.FC<EmployeeType> = ({ data }) => {
  const [form, setForm] = useAtom(atomWorkersForm);

  // const [create, setCreate] = useState<boolean>(false);
  const employeeList = useRequest(
    orphanUser.getEmployeeList,{
      manual:true,
      onSuccess: (hello) => {
        console.log(hello, "hello");
      },
      onError: (err) =>
        notification.error({
          message: err.message,
        }),
    }
  );
  useEffect(() => {
    run();
  }, [form]);

  const run = (values?: any) => {
    employeeList.run({
      ...form,
      ...values,
    },data?.id);
  };
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
        refresh={() => employeeList.run({...form},data?.id)}
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
      <ITable<any>
        create={false}
        columns={columns}
        form={form}
        setForm={setForm}
        loading={employeeList?.loading}
        dataSource={employeeList?.data}
      />
    </Card>
  );
};
