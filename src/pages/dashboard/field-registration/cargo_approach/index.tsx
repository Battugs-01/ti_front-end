import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker, notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { UserRoleType } from "config";
import { useAuthContext } from "context/auth";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { CargoApproachList } from "service/feild_registration/type";
import { cargoApproachPaginate, formatNumber } from "utils/index";
import { AssignationCargoApproach } from "./assignation";
import { CreateCargoApproach } from "./create";
import { UpdateCargoApproach } from "./update";
import { Label } from "components/label";

export const CargoApproach: React.FC = () => {
  const [user, _] = useAuthContext();
  const [filter, setFilter] = useState(cargoApproachPaginate);
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
              <Label title={`Нийт (${fieldRegister?.data?.total || 0})`} />
            </div>
            <DatePicker.RangePicker
              className="w-max"
              placeholder={["Эхлэх огноо", "Дуусах огноо"]}
              onChange={(values) => {
                setFilter({
                  ...filter,
                  start_date: dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                  end_date: dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                });
              }}
              defaultValue={[
                filter.start_date
                  ? dayjs(filter.start_date)
                  : dayjs().subtract(3, "month"),
                filter.end_date ? dayjs(filter.end_date) : dayjs(),
              ]}
            />
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
        hideCreate={user?.user?.role_name !== UserRoleType.transport_manager}
      />
      <ITable<CargoApproachList>
        dataSource={fieldRegister?.data?.items}
        loading={fieldRegister.loading}
        CreateComponent={CreateCargoApproach}
        UpdateComponent={
          user.user?.role_name === UserRoleType.transport_manager
            ? UpdateCargoApproach
            : user.user?.role_name === UserRoleType.cashier
            ? AssignationCargoApproach
            : undefined
        }
        refresh={refreshList}
        RemoveModelConfig={{
          action: fieldRegistration.deleteRegistration,
          config: (record) => ({
            uniqueKey: record?.id,
            display: record?.broker_name,
            title: "Устгах",
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
                render: (value: any) => {
                  if (
                    !value ||
                    dayjs(value).format("YYYY-MM-DD") === "0001-01-01"
                  ) {
                    return <div className="flex items-center">-</div>;
                  }
                  return (
                    <div className="flex items-center">
                      {dayjs(value).format("YYYY/MM/DD")}
                    </div>
                  );
                },
              },
              {
                title: "Орох хил",
                dataIndex: "direction",
              },
              {
                title: "Ирэх/Явах",
                dataIndex: "transport_direction",
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
                dataIndex: "carrier_code",
              },
              {
                title: "Ачааны нэр төрөл",
                dataIndex: "cargo_name",
              },
              {
                title: "Хүлээн авагч",
                dataIndex: "reciever_email",
              },
              {
                title: "Утас",
                dataIndex: "reciever_phone",
              },
              {
                title: "Тээврийн хөлс",
                dataIndex: "transport_fee",
                render: (_, record) => {
                  return record?.transport_recieve?.transport_fee;
                },
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
