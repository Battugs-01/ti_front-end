import { useDebounceFn, useRequest } from "ahooks";
import { DatePicker } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import { Label } from "components/label";
import PublicDetail from "components/public-view";
import InitTableHeader from "components/table-header";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { CargoApproachList } from "service/feild_registration/type";
import { cargoApproachPaginate, moneyFormat } from "utils/index";
import { DirectionOptions, PaymentMethod } from "utils/options";
import { AssignationCargoApproach } from "./assignation";

export const RemainderCargo: React.FC = () => {
  const [user] = useContext(AuthContext);
  const [filter, setFilter] = useState(cargoApproachPaginate);
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
                  between: [
                    dayjs(values?.[0]?.toDate()).format("YYYY-MM-DD"),
                    dayjs(values?.[1]?.toDate()).format("YYYY-MM-DD"),
                  ],
                });
              }}
              defaultValue={[
                filter.between[0]
                  ? dayjs(filter.between[0])
                  : dayjs().subtract(3, "month"),
                filter.between[1] ? dayjs(filter.between[1]) : dayjs(),
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
        refresh={refreshList}
        hideCreate
        searchPlaceHolder="Чингэлэг дугаар, чиглэл"
        fileName="Үлдэгдэл чингэлэг"
      />
      <ITable<CargoApproachList>
        dataSource={fieldRegister.data?.items}
        loading={fieldRegister.loading}
        refresh={refreshList}
        bordered
        DetailComponent={PublicDetail}
        UpdateComponent={
          user.user?.role_name === UserRoleType.cashier
            ? AssignationCargoApproach
            : undefined
        }
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
                      {dayjs(value).format("YYYY-MM-DD")}
                    </div>
                  );
                },
              },
              {
                title: "Үүсгэсэн ажилтан",
                dataIndex: "created_by",
                render: (_, record) => {
                  return record?.created_by?.email;
                },
              },
              {
                title: "Орох хил",
                dataIndex: "direction",
                render: (_, record) => {
                  return DirectionOptions.find(
                    (item) => item.value === record?.direction
                  )?.label;
                },
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
                dataIndex: "broker_name",
                render: (_, record) => {
                  return record?.broker?.name;
                },
              },
              {
                title: "Ачааны нэр төрөл",
                dataIndex: "cargo_name",
                render: (_, record) => {
                  return record?.container_cargo?.cargo_name;
                },
              },
              {
                title: "Тээврийн хөлс",
                dataIndex: "transport_fee",
                render: (_, record) => {
                  return moneyFormat(record?.transport_recieve?.transport_fee);
                },
              },
              {
                title: "Вальют",
                dataIndex: "currency",
                render: (_, record) => {
                  return record?.transport_recieve?.currency;
                },
              },
              {
                title: "Харилцагчын нэр",
                dataIndex: "customer_company_id",
                render: (_, record) => {
                  return record?.transport_recieve?.customer_company?.name;
                },
              },
              {
                title: "Төлөх арга",
                dataIndex: "payment_method",
                render: (_, record) => {
                  return PaymentMethod.find(
                    (item) =>
                      item.value === record?.transport_recieve?.payment_method
                  )?.label;
                },
              },
              {
                title: "Э/Хураамж санамж",
                dataIndex: "additional_fee_note",
                render: (_, record) => {
                  return record?.transport_recieve?.additional_fee_note;
                },
              },
              {
                title: "Шилжүүлэх тээврийн хөлс",
                dataIndex: "transfer_fee",
                render: (_, record) => {
                  return moneyFormat(record?.transport_give?.transfer_fee);
                },
              },
              {
                title: "Гадаад тээвэр зууч",
                dataIndex: "transport_broker",
                render: (_, record) => {
                  return record?.transport_give?.transport_broker;
                },
              },
              {
                title: "Төлбөр хариуцагчийн нэр",
                dataIndex: "transfer_broker_name",
                render: (_, record) => {
                  return record?.transport_give?.transfer_broker_name;
                },
              },
            ],
          },
          {
            title: "Талбайн бүртгэл",
            dataIndex: "id",
            children: [
              {
                title: "Зууч код",
                dataIndex: "transport_give",
                render: (_, record) => {
                  return record?.transport_give?.transport_broker;
                },
              },
              {
                title: "Талбайд ирсэн",
                dataIndex: "arrived_at_site",
                render: (value: any) => {
                  if (value.includes("0001-01-01")) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайд задарсан",
                dataIndex: "opened_at",
                render: (value: any) => {
                  if (value.includes("0001-01-01")) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Суларсан",
                dataIndex: "freed_at",
                render: (value: any) => {
                  if (value.includes("0001-01-01")) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Талбайгаас явсан",
                dataIndex: "left_site_at",
                render: (value: any) => {
                  if (value.includes("0001-01-01")) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Буцаж ирсэн",
                dataIndex: "returned_at",
                render: (value: any) => {
                  if (value.includes("0001-01-01")) {
                    return "-";
                  }
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
            ],
          },
          {
            title: "Хоног",
            dataIndex: "id",
            children: [
              {
                title: "Талбайд ирсэнээс хойш",
                dataIndex: "arrival_field",
                render: (_, record) => {
                  if (
                    record?.arrived_at_site.includes("0001-01-01") ||
                    record?.opened_at.includes("0001-01-01")
                  ) {
                    return "-";
                  }
                  return dayjs(record?.opened_at).diff(
                    dayjs(record?.arrived_at_site),
                    "days"
                  );
                },
              },
              {
                title: "Задарснаас хойш суларсан",
                dataIndex: "cleaned_watered",
                render: (_, record) => {
                  if (
                    record?.freed_at.includes("0001-01-01") ||
                    record?.opened_at.includes("0001-01-01")
                  ) {
                    return "-";
                  }
                  return dayjs(record?.opened_at).diff(
                    dayjs(record?.freed_at),
                    "days"
                  );
                },
              },
              {
                title: "Задарснаас хойш талбайгаас явсан",
                dataIndex: "cleaned_field",
                render: (_, record) => {
                  if (
                    record?.left_site_at.includes("0001-01-01") ||
                    record?.opened_at.includes("0001-01-01")
                  ) {
                    return "-";
                  }
                  return dayjs(record?.opened_at).diff(
                    dayjs(record?.left_site_at),
                    "days"
                  );
                },
              },
              {
                title: "Суларсанаас хойш ачилт хийсэн",
                dataIndex: "watered_worked",
                render: (_, record) => {
                  if (
                    record?.returned_at.includes("0001-01-01") ||
                    record?.freed_at.includes("0001-01-01")
                  ) {
                    return "-";
                  }
                  return dayjs(record?.freed_at).diff(
                    dayjs(record?.returned_at),
                    "days"
                  );
                },
              },
              {
                title: "Буцаж ирсэнээс хойш ачилт хийсэн",
                dataIndex: "returned_worked",
                render: (_, record) => {
                  if (
                    record?.returned_at.includes("0001-01-01") ||
                    record?.left_site_at.includes("0001-01-01")
                  ) {
                    return "-";
                  }
                  return dayjs(record?.left_site_at).diff(
                    dayjs(record?.returned_at),
                    "days"
                  );
                },
              },
            ],
          },
        ]}
      />
    </PageCard>
  );
};
