import { Avatar, Card, notification } from "antd";
import { ExportButton, ITable } from "components/index";
import { useRequest } from "ahooks";
import InitTableHeader from "components/table-header";
import { useEffect } from "react";
import { exportFromTable } from "utils/export";
import orphanUser from "service/gov-orphan/requests";
import { CardInterface } from "service/gov-orphan";
import { useAtom } from "jotai";
import { atomForm } from "utils/store";
import moment from "moment";

type EmployeeType = {
  data: CardInterface;
};

export const Employees: React.FC<EmployeeType> = ({ data }) => {
  const [form, setForm] = useAtom(atomForm);

  const employeeList = useRequest(orphanUser.getEmployeeList, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    run();
  }, [form]);

  const run = (values?: any) => {
    employeeList.run(
      {
        ...form,
        ...values,
      },
      data?.id || 0
    );
  };
  const columns = [
    {
      title: "Овог",
      dataIndex: "last_name",
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
      dataIndex: "first_name",
    },
    {
      title: "Ургийн овог",
      dataIndex: "family_name",
    },
    {
      title: "Төрсөн огноо",
      dataIndex: "birth_date",
      render: (val: any) => moment(val).format("l"),
    },
    {
      title: "Регистрийн дугаар",
      dataIndex: "rd",
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
      dataIndex: "position",
    },
    {
      title: "Үндсэн ажилтан эсэх",
      dataIndex: "",
    },
    {
      title: "Үндсэн цалин",
      dataIndex: "salary",
    },
    {
      title: "Ажилласан жил",
      dataIndex: "",
    },
  ];
  return (
    <Card className="pt-4">
      <InitTableHeader
        loading={employeeList?.loading}
        hideCreate
        refresh={() => employeeList.run({ ...form }, data?.id)}
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
        dataSource={employeeList?.data?.items}
      />
    </Card>
  );
};
