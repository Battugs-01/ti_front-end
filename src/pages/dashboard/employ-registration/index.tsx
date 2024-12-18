import { useDebounceFn, useRequest } from "ahooks";
import { Avatar, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/table";
import InitTableHeader from "components/table-header";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Admin } from "service/auth/type";
import employRegistration from "service/employ-registration";
import file from "service/file";
import { initPagination, moneyFormat } from "utils/index";
import { CreateService } from "../actons/create";
import { UpdateService } from "../actons/update";

const EmployeRegistration = () => {
  const [filter, setFilter] = useState(initPagination);
  const [create, setCreate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const list = useRequest(employRegistration.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      ...filter,
      search: search,
    });
  };

  useEffect(() => {
    run();
  }, [filter]);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <PageCard xR>
      <div className="px-2 pb-0">
        <InitTableHeader
          addButtonName="Нэмэх"
          customHeaderTitle="Ажилчдын жагсаалт"
          searchPlaceHolder="Овог, нэр , регистрийн дугаар "
          setCreate={setCreate}
          search={search}
          setSearch={(e) => {
            setSearch(e);
            searchRun.run({ ...filter, search: e });
          }}
          refresh={() => list.run({ ...filter, search: search })}
        />
      </div>

      <ITable<Admin>
        total={list.data?.total}
        loading={list.loading}
        dataSource={list?.data?.items ?? []}
        refresh={(values) => list.run({ ...filter, ...values })}
        UpdateComponent={UpdateService}
        form={filter}
        setForm={setFilter}
        columns={[
          {
            dataIndex: ["elderly", "profile", "physical_path"],
            title: "",
            align: "center",
            width: 40,
            render: (_, record) => (
              <Avatar
                shape="circle"
                size={25}
                src={file.fileToUrl(record?.profile?.physical_path || "AS")}
              />
            ),
          },
          {
            dataIndex: "family_name",
            title: "Ургийн овог",
            align: "left",
            render: (_, record) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {record?.family_name}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "last_name",
            title: "Овог",
            align: "left",
            render: (value) => (
              <div className="flex gap-2">
                <span className="text-sm text-[#475467] font-normal">
                  {value || "-"}
                </span>
              </div>
            ),
          },
          {
            dataIndex: "first_name",
            title: "Нэр",
            align: "left",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "rd",
            title: "Регистрийн дугаар",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "birth_date",
            title: "Төрсөн огноо",
            render: (_, record) => (
              <span className="text-sm text-[#475467] font-normal">
                {dayjs(record.birth_date).format("YYYY-MM-DD")}
              </span>
            ),
          },
          {
            dataIndex: "gender",
            title: "Хүйс",
            align: "center",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal">
                {value === 0 ? "Эрэгтэй" : "Эмэгтэй"}
              </span>
            ),
          },
          {
            dataIndex: "email",
            title: "Цахим хаяг",
            align: "left",
            width: "10%",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center ">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "phone",
            title: "Утасны дугаар",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "position",
            title: "Албан тушаал",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          // {
          //   dataIndex: "email",
          //   title: "Ажилтны төрөл",
          //   render: (_, record) => (
          //     <span className="text-sm text-[#475467] font-normal">
          //       {record?.type || "-"}
          //     </span>
          //   ),
          // },
          // {
          //   dataIndex: "email",
          //   title: "Ажилд орсон огноо",
          //   render: (_, record) => (
          //     <span className="text-sm text-[#475467] font-normal">
          //       {record?.type || "-"}
          //     </span>
          //   ),
          // },
          {
            dataIndex: "worker_year",
            title: "Ажилласан жил",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "total_worked_year",
            title: "Нийт ажилласан жил",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {value || "-"}
              </span>
            ),
          },
          {
            dataIndex: "salary",
            title: "Үндсэн цалин",
            render: (value) => (
              <span className="text-sm text-[#475467] font-normal flex text-center">
                {moneyFormat(value as number) + " ₮" || "-"}
              </span>
            ),
          },
        ]}
        CreateComponent={CreateService}
        create={create as boolean}
        setCreate={setCreate}
        RemoveModelConfig={{
          action: employRegistration.deleteEmploy,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
      />
    </PageCard>
  );
};

export default EmployeRegistration;
