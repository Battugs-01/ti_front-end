import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { initPagination } from "utils/index";
import { UpdateCargoApproach } from "./update";

export const RemainderCargo: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");

  const fieldRegister = useRequest(fieldRegistration.list, {
    manual: true,
    onError: (err) => {
      // notification.error({
      //   message: err.message,
      // });
    },
  });

  useEffect(() => {
    fieldRegister.run({
      ...filter,
    });
  }, [filter]);

  const refreshList = () => {
    fieldRegister?.run({
      ...filter,
    });
  };
  const searchRun = useDebounceFn(fieldRegister.run, { wait: 1000 });

  const data = [
    {
      id: 1,
      created_at: "2021-09-09 10:00",
      arrival_field: "Орох",
      arrive_depart: "Ирэх",
      cargo_number: "123456",
    },
  ];

  return (
    <PageCard xR>
      <InitTableHeader
        customHeaderTitle="Нийт"
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
        }}
        refresh={refreshList}
        hideCreate
        fileName="RemainderCargo"
        hideDownload
      />
      <ITable<any>
        dataSource={data}
        // dataSource={fieldRegister.data}
        loading={fieldRegister.loading}
        UpdateComponent={UpdateCargoApproach}
        refresh={refreshList}
        RemoveModelConfig={{
          action: fieldRegistration.deleteRegistration,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.first_name,
            title: "Remove",
          }),
        }}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Чингэлэг",
            dataIndex: "id",
            children: [
              {
                title: "Дөхөлт огноо",
                dataIndex: "created_at",
              },
              {
                title: "Орох хил",
                dataIndex: "arrival_field",
              },
              {
                title: "Ирэх/Явах",
                dataIndex: "arrive_depart",
              },
              {
                title: "Чингэлэг дугаар",
                dataIndex: "cargo_number",
              },
              {
                title: "Даац",
                dataIndex: "cargo_type",
              },
              {
                title: "Зуучийн нэр",
                dataIndex: "carrier_name",
              },
              {
                title: "Хоосон/Ачаатай",
                dataIndex: "empty_full",
              },
              {
                title: "Зарах эсэх",
                dataIndex: "is_sale",
              },
              {
                title: "Зарах үнэ",
                dataIndex: "price",
              },
            ],
          },
          {
            title: "Талбайн бүртгэл",
            dataIndex: "id",
            children: [
              {
                title: "Зууч код",
                dataIndex: "carrier_code",
              },
              {
                title: "Байр №",
                dataIndex: "place_number",
              },
              {
                title: "Талбайд задарсан",
                dataIndex: "field_cleaned",
              },
              {
                title: "Задарсан",
                dataIndex: "cleaned",
              },
              {
                title: "Суларсан",
                dataIndex: "watered",
              },
              {
                title: "Ачилт хийсэн",
                dataIndex: "worked",
              },
              {
                title: "Талбайд ирсэнээс хойш",
                dataIndex: "arrival_field",
              },
              {
                title: "Задарснаас хойш суларсан",
                dataIndex: "cleaned_watered",
              },
            ],
          },
          {
            title: "Хонох",
            dataIndex: "id",
            children: [
              {
                title: "Задарснаас хойш талбайгаас явсан",
                dataIndex: "cleaned_field",
              },
              {
                title: "Суларсанаас хойш ачилт хийсэн",
                dataIndex: "watered_worked",
              },
              {
                title: "Буцаж ирсэнээс хойш ачилт хийсэн",
                dataIndex: "returned_worked",
              },
            ],
          },
        ]}
      />
    </PageCard>
  );
};
