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
              Нийт ({fieldRegister?.data?.total})
            </div>
          </div>
        }
        hideTitle
        search={search}
        setSearch={(e) => {
          setSearch(e);
          searchRun.run({ ...filter, query: e });
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
                  record?.recieve_status?.is_recieve_additional_fee_paid
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
                  return dayjs(value).format("YYYY-MM-DD");
                },
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
                dataIndex: "opened_at",
                render: (value: any) => {
                  return dayjs(value).format("YYYY-MM-DD");
                },
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
