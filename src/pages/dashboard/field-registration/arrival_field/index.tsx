import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { CreateButton, ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext, useEffect, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { CargoApproachList } from "service/feild_registration/type";
import { fieldRegistrationPaginate } from "utils/index";
import { AssignationCreate } from "./assignation_create";
import { CreateArrivalField } from "./create";
import { ShippmentCreate } from "./shippment_create";
import dayjs from "dayjs";
import { Label } from "components/label";

export const ArrivalField: React.FC = () => {
  const [user] = useContext(AuthContext);
  const [filter, setFilter] = useState(fieldRegistrationPaginate);
  const [search, setSearch] = useState<string>("");
  const [record, setRecord] = useState<CargoApproachList>();
  const [assignationCreate, setAssignationCreate] = useState(false);
  const [shippmentCreate, setShippmentCreate] = useState(false);

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
        fileName="ArrivalField"
        hideDownload
        customAction={
          user?.user?.role_name === UserRoleType.cashier && (
            <div className="flex items-center gap-3">
              <CreateButton
                disabled={
                  !record ||
                  record?.assignation_status?.is_assignation_additional_fee_paid
                }
                size="large"
                type="default"
                className="text-[#007AFF]"
                onClick={() => {
                  setAssignationCreate(true);
                }}
                addButtonName="Олголт"
              />
              <CreateButton
                disabled={
                  !record ||
                  !record?.assignation_status
                    ?.is_assignation_additional_fee_paid ||
                  record?.shipping_status?.is_shipping_additional_fee_paid
                }
                size="large"
                type="default"
                className="text-[#34C759]"
                onClick={() => {
                  setShippmentCreate(true);
                }}
                addButtonName="Ачилт"
              />
            </div>
          )
        }
      />
      <ITable<CargoApproachList>
        dataSource={fieldRegister.data?.items}
        loading={fieldRegister.loading}
        rowSelection={{
          type: "radio",
          onChange: (_, selectedRows) => {
            setRecord(selectedRows[0]);
          },
        }}
        CreateComponent={CreateArrivalField}
        refresh={refreshList}
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
                dataIndex: "opened_at",
                render: (value: any) => {
                  return dayjs(value).format("YYYY-MM-DD");
                },
              },
              {
                title: "Задарсан",
                dataIndex: "",
              },
              {
                title: "Суларсан",
                dataIndex: "freed_at",
                render: (value: any) => {
                  return dayjs(value).format("YYYY-MM-DD");
                },
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
      {assignationCreate && (
        <AssignationCreate
          open={assignationCreate}
          onCancel={() => {
            setAssignationCreate(false);
          }}
          onFinish={() => {
            setAssignationCreate(false);
            refreshList();
          }}
          detail={record}
        />
      )}

      {shippmentCreate && (
        <ShippmentCreate
          open={shippmentCreate}
          onCancel={() => {
            setShippmentCreate(false);
          }}
          onFinish={() => {
            setShippmentCreate(false);
            refreshList();
          }}
          detail={record}
        />
      )}
    </PageCard>
  );
};
