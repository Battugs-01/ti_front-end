import { useRequest } from "ahooks";
import { Popconfirm, notification } from "antd";
import { ExportButton, IProgress, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import { atomServiceForm } from "../store";

import { CheckButton, InActiveButton } from "components/button/action";
import { useNavigate } from "react-router-dom";
import { exportFromTable } from "utils/export";
import { moneyFormat, tableCellFixed } from "utils/index";
import {
  ServiceBaseColumns,
  ServiceColumnClicks,
  ServiceColumnIsActive,
  ServiceColumnPrice,
  ServiceColumnReview,
  ServiceColumnSpecialty,
  ServiceColumnTimeTable,
  ServiceColumnTourisFriendly,
} from "../column";
import { DetailService } from "../modals/detail";
import { UpdateService } from "../modals/update";

export const SponsoredList = ({
  updateNumbers,
}: {
  updateNumbers: () => void;
}) => {
  const [form] = useAtom(atomServiceForm);
  const navigate = useNavigate();
  const list = useRequest(merchantService.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const update = useRequest(merchantService.update, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Successfully",
      });
      list.refresh();
    },
  });

  const run = (values?: any) => {
    list.run({
      ...form,
      status: ServiceStatusType.sponsored,
      created_at: form.full_date,
      ...values,
    });
  };

  useEffect(() => {
    run();
  }, [form]);

  return (
    <>
      <ITable<MerchantService>
        hideCreateButton
        showDetailButton
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => {
          run(values);
          updateNumbers();
        }}
        customActions={(record) => {
          return (
            <>
              {!record.is_active ? (
                <Popconfirm
                  title="Are you sure to activate this merchant?"
                  onConfirm={() => {
                    update.run(record.id, {
                      ...record,
                      is_active: true,
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <CheckButton
                    tooltipTitle="Activate"
                    loading={update.loading}
                  />
                </Popconfirm>
              ) : (
                <Popconfirm
                  title="Are you sure to deactivate this merchant?"
                  onConfirm={() => {
                    update.run(record.id, {
                      ...record,
                      is_active: false,
                    });
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <InActiveButton
                    tooltipTitle="Deactivate"
                    loading={update.loading}
                  />
                </Popconfirm>
              )}
            </>
          );
        }}
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Sponsored"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        rowClassName={" cursor-pointer"}
        onRow={(record) => {
          return {
            onClick: () => navigate(`/dashboard/company/${record.id}`),
          };
        }}
        columns={[
          ...ServiceBaseColumns,
          {
            ...tableCellFixed(200),
            title: "Remaining Days",
            dataIndex: "remainingDays",
            render: (_, record) => {
              return (
                <IProgress
                  isDayDuration
                  startDate={record.sponsored_at}
                  endDate={record.subscription_end_date}
                />
              );
            },
          },
          ServiceColumnIsActive,
          {
            title: "Total Income",
            dataIndex: "total_income",
            render: (_, record) => {
              return moneyFormat(
                record.orders?.reduce(
                  (pre, curr) => curr.purchased_price + pre,
                  0
                )
              );
            },
          },
          ServiceColumnSpecialty,
          ServiceColumnPrice,
          ServiceColumnReview,
          ServiceColumnTourisFriendly,
          ServiceColumnClicks,
          ServiceColumnTimeTable,
        ]}
        UpdateComponent={UpdateService}
        DetailComponent={DetailService}
      />
    </>
  );
};
