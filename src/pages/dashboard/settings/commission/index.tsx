import ProForm, { ProFormSelect } from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { ExportButton, FilterForm, ITable } from "components/index";
import { FC, useEffect, useState } from "react";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import Badge from "components/badge";
import { IProFormSelect } from "components/select";
import { exportFromTable } from "utils/export";
import { calculateDeadlineDate } from "utils/index";
import Update from "./update";

export const CommissionTab: FC = ({}) => {
  const [form, setForm] = useState<any>({
    page: 0,
    limit: 20,
  });
  const { data, loading, run } = useRequest(merchantService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const debounceSet = useDebounceFn((values) => setForm(values), {
    wait: 500,
  });

  useEffect(() => {
    run({
      page: 0,
      limit: 20,
      status: ServiceStatusType.sponsored,
      created_at: form.full_date,
      ...form,
    });
  }, [form]);

  const [exportLoading, setExportLoading] = useState(false);

  return (
    <>
      <FilterForm
        initialValues={{
          ...form,
        }}
        onValuesChange={(curr) => {
          if (curr.full_date) {
            curr.deadline = undefined;
          }
          if (curr.deadline >= 0) {
            curr.full_date = calculateDeadlineDate(curr.deadline)?.map((el) =>
              el.format("YYYY/MM/DD")
            );
          }
          if (!curr.full_date) curr.full_date = undefined;

          if (!curr.operation_types) curr.operation_types = undefined;
          if (curr.search || !curr.search)
            debounceSet.run({ ...form, ...curr });
          else setForm({ ...form, ...curr });
        }}
        filters={
          <>
            <ProForm.Item name="merchant_name">
              <IProFormSelect
                request={merchantService.list}
                filter={{
                  status: ServiceStatusType.sponsored,
                }}
                mode="multiple"
                placeholder={"Select Name"}
                onChange={(value) => {
                  setForm({
                    ...form,
                    ids: value.length > 0 ? value : undefined,
                  });
                }}
              />
            </ProForm.Item>
            <ProFormSelect
              name={"status"}
              placeholder={"Status"}
              fieldProps={{
                onChange: (value) => {
                  setForm({
                    ...form,
                    is_active:
                      value === "active"
                        ? true
                        : value === "inactive"
                        ? false
                        : undefined,
                  });
                },
              }}
              options={[
                {
                  label: "Active",
                  value: "active",
                },
                {
                  label: "Inactive",
                  value: "inactive",
                },
              ]}
            />
            <ProFormSelect name={"employee_name"} placeholder={"Employee"} />
          </>
        }
      />
      <ITable<MerchantService>
        hideCreateButton
        toolbarItems={
          <ExportButton
            onClick={() => {
              setExportLoading(true);
              exportFromTable(
                ["Commission"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );

              setExportLoading(false);
            }}
            loading={exportLoading}
          />
        }
        total={data?.total || 0}
        dataSource={data?.items}
        columns={[
          {
            title: "Merchant Name",
            dataIndex: "name",
            valueType: "string",
          },
          {
            title: "Status",
            dataIndex: "is_active",
            valueType: "boolean",
            render: (_, record) => {
              return (
                <Badge
                  title={record.is_active ? "Active" : "Inactive"}
                  color={record.is_active ? "green" : "gray"}
                />
              );
            },
          },
          {
            title: "Event & Ticket",
            dataIndex: "commission_event",
            valueType: "string",
          },
          {
            title: "Coupon",
            dataIndex: "commission_coupon",
            valueType: "string",
          },
          {
            title: "Product",
            dataIndex: "commission_product",
            valueType: "string",
          },
          {
            title: "Start date",
            dataIndex: "commision_start_date",
            valueType: "date",
          },
          {
            title: "Employee",
            dataIndex: "employee",
            valueType: "string",
          },
        ]}
        DeActivateModelConfig={{
          action: merchantService.update,
          config: (record) => {
            return {
              uniqueKey: record?.id,
              display: record?.name,
              title: "Deactivate",
              body: { ...record, is_active: false },
            };
          },
        }}
        hideInActiveButton={(record) => !record.is_active}
        loading={loading}
        UpdateComponent={Update}
        refresh={(values) => {
          run({
            ...form,
            ...values,
            status: ServiceStatusType.sponsored,
          });
        }}
      />
    </>
  );
};
