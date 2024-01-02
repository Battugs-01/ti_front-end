import { useRequest } from "ahooks";
import { Badge, message } from "antd";
import { ExportButton } from "components/index";
import { ITable } from "components/table";
import { useEffect } from "react";
import notificationSettings from "service/notificationSettings";
import { NotificationSettings } from "service/notificationSettings/type";
import { exportFromTable } from "utils/export";
import { tableCellFixed } from "utils/index";
import { CreateSettings } from "../modal/settings/create";
import { UpdateSettings } from "../modal/settings/update";
import { DetailSettings } from "../modal/settings/detail";

export const SettingsList = () => {
  const fetch = useRequest(notificationSettings.list, {
    manual: true,
    onError: (err) => message.error(err.message),
  });

  useEffect(() => {
    fetch.run({});
  }, []);

  return (
    <ITable<NotificationSettings>
      loading={fetch.loading}
      total={fetch.data?.total}
      dataSource={fetch.data?.items}
      refresh={(values) => fetch.run({ ...values })}
      toolbarItems={
        <ExportButton
          onClick={() => {
            exportFromTable(
              ["Settings Notifications"],
              window.document.getElementById("main-table") as HTMLElement,
              window
            );
          }}
        />
      }
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
          dataIndex: "status",
          valueType: "string",
          title: "Status",
          render: (_, record) => (
            <Badge
              title={record.is_active ? "Active" : "No Active"}
              color={record.is_active ? "green" : "yellow"}
            />
          ),
        },
      ]}
      CreateComponent={CreateSettings}
      UpdateComponent={UpdateSettings}
      DetailComponent={DetailSettings}
      RemoveModelConfig={{
        action: notificationSettings.remove,
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
