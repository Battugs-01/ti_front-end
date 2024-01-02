import React, { useEffect, useState } from "react";
import { ITable } from "components/table";
import { firstLastNames, tableCellFixed } from "utils/index";
import { useRequest } from "ahooks";
import { notification } from "antd";
import merchantService from "service/merchantService";
import { Merchant, MerchantRole } from "service/merchant/type";
import Badge from "components/badge";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";

type Props = {
  serviceId: number;
};
export const TeamTab = ({ serviceId }: Props) => {
  const list = useRequest(merchantService.teamMembers, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  useEffect(() => {
    if (serviceId) list.run(serviceId, {});
  }, [serviceId]);

  return (
    <div className="mt-6">
      <ITable<Merchant>
        hideCreateButton
        total={list.data?.total}
        dataSource={list.data?.items}
        refresh={(values) => list.run(serviceId, { ...values })}
        // ???????????
        toolbarItems={
          <ExportButton
            onClick={() => {
              exportFromTable(
                ["Reviews"],
                window.document.getElementById("main-table") as HTMLElement,
                window
              );
            }}
          />
        }
        columns={[
          {
            ...tableCellFixed(200),
            dataIndex: "name",
            title: "Name",
            render: (_, record) => record.full_name,
          },
          {
            ...tableCellFixed(200),
            dataIndex: "email",
            title: "Email",
          },
          {
            ...tableCellFixed(200),
            dataIndex: "phone",
            title: "Phone",
          },
          {
            ...tableCellFixed(200),
            dataIndex: "role",
            title: "Role",
            render: (_, record) => (
              <Badge
                title={
                  record.role === MerchantRole.manager ? "Manager" : "Owner"
                }
              />
            ),
          },
        ]}
      />
    </div>
  );
};
