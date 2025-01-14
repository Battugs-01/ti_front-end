import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { initPagination } from "utils/index";
import { UpdateCargoApproach } from "./update";
import { CreateCargoApproach } from "./create";
import dayjs from "dayjs";

export const CargoApproach: React.FC = () => {
  const [filter, setFilter] = useState(initPagination);
  const [search, setSearch] = useState<string>("");
  const [create, setCreate] = useState(false);

  const fieldRegister = useRequest(fieldRegistration.list, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
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

  return (
    <PageCard xR>
      <InitTableHeader
        leftContent={
          <div className="flex items-center gap-3">
            <div className="text-lg font-semibold text-gray-700">
              Нийт ({fieldRegister?.data?.total})
            </div>
          </div>
        }
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, search: e });
        }}
        setCreate={setCreate}
        refresh={refreshList}
        addButtonName="Шинэ"
        fileName="CargoApproach"
        hideDownload
      />
      <ITable<any>
        dataSource={fieldRegister?.data?.items}
        loading={fieldRegister.loading}
        CreateComponent={CreateCargoApproach}
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
        create={create}
        setCreate={setCreate}
        className="p-0 remove-padding-table"
        columns={[
          {
            title: "Чингэлэг",
            dataIndex: "id",
            children: [
              {
                title: "Дөхөлт огноо",
                dataIndex: "approach_report_date",
                render: (value) => {
                  if (!value) return <div>-</div>;
                  return (
                    <div>{dayjs(value as string).format("YYYY-MM-DD")}</div>
                  );
                },
              },
              {
                title: "Орох хил",
                dataIndex: "arrived_at_site",
              },
              {
                title: "Ирэх/Явах",
                dataIndex: "arrive_depart",
              },
              {
                title: "Чингэлэг дугаар",
                dataIndex: "container_code",
              },
              {
                title: "Даац",
                dataIndex: "capacity",
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
                dataIndex: "for_sale",
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
