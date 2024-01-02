import { useRequest } from "ahooks";
import { Button, Popconfirm, Tooltip, notification } from "antd";
import Badge from "components/badge";
import { ExportButton, ITable } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { RxPaperPlane } from "react-icons/rx";
import notifications from "service/notifications";
import {
  NotificationType,
  NotificationsModel,
} from "service/notifications/types";
import { exportFromTable } from "utils/export";
import { renderEnDate, tableCellFixed } from "utils/index";
import { CreateMerchant } from "../modal/merchant/create";
import { DetailMerchant } from "../modal/merchant/detail";
import { UpdateMerchant } from "../modal/merchant/update";
import { atomNotificationForm } from "../store";

export const NotificationMerchantList = () => {
  const [form] = useAtom(atomNotificationForm);
  const list = useRequest(notifications.list, {
    manual: true,
    onError: (err) => notification.error({ message: err.message }),
  });
  const send = useRequest(notifications.send, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Sent notification successfully",
      });
      list.refresh();
    },
    onError: (err) => notification.error({ message: err.message }),
  });
  const run = (values?: any) => {
    list.run({
      ...form,
      ...values,
      type: NotificationType.merchant,
      created_at: form.full_date,
    });
  };
  useEffect(() => {
    run();
  }, [form]);

  return (
    <ITable<NotificationsModel>
      loading={list.loading}
      total={list.data?.total}
      dataSource={list.data?.items}
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Merchants Notifications"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
      hideEditButton={(record) => {
        return record.is_published;
      }}
      customActions={(record) => (
        <>
          <Popconfirm
            placement="bottom"
            title={"Do you want to send this notification?"}
            onConfirm={async () => {
              send.run(record?.id);
            }}
            trigger={
              (record.is_published || record.is_planned ? "" : "click") as any
            }
            okText="Send"
            cancelText="Close"
          >
            <Tooltip title="Send">
              <Button
                loading={send.loading}
                style={{
                  color: "#039855",
                  cursor:
                    record.is_published || record.is_planned
                      ? "not-allowed"
                      : "pointer",
                }}
                type="text"
                className={
                  record.is_published || record.is_planned
                    ? "opacity-50 flex gap-1 items-center font-medium px-1"
                    : "opacity-100 flex gap-1 items-center font-medium px-1"
                }
              >
                <RxPaperPlane size={18} />
              </Button>
            </Tooltip>
          </Popconfirm>
        </>
      )}
      columns={[
        {
          title: "Title",
          dataIndex: "title",
        },
        {
          title: "Description",
          dataIndex: "description",
          ...tableCellFixed(200),
        },
        {
          ...tableCellFixed(150),

          dataIndex: "created_at",
          valueType: "date",
          title: "Created Date",
        },
        {
          ...tableCellFixed(150),
          dataIndex: "planned_date",
          valueType: "dateTime",
          title: "Publish Date",
          render: (_, record) => `${renderEnDate(record.planned_date, true)}`,
        },
        {
          dataIndex: "status",
          valueType: "string",
          title: "Status",
          render: (_, record) => (
            <Badge
              title={
                record.is_published
                  ? "Sent"
                  : record.is_planned
                    ? "Planned"
                    : "Not sent"
              }
              color={
                record.is_published
                  ? "green"
                  : record.is_planned
                    ? "blue"
                    : "yellow"
              }
            />
          ),
        },
        {
          dataIndex: "reached_count",
          valueType: "number",
          title: "Reach",
          render: (_, record) =>
            `${record?.customer_notifications?.reduce(
              (pre, curr) => (curr.is_seen ? pre + 1 : pre),
              0
            ) ?? 0
            }/${record.reach_count || 0}`,
        },
      ]}
      refresh={(values) => run(values)}
      CreateComponent={CreateMerchant}
      UpdateComponent={UpdateMerchant}
      DetailComponent={DetailMerchant}
      RemoveModelConfig={{
        action: notifications.remove,
        config: (record) => {
          return {
            uniqueKey: record?.id,
            display: record?.title,
          };
        },
      }}
    />
  );
};
