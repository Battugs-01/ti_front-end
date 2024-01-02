import { useRequest } from "ahooks";
import { ITable } from "components/index";
import { FC } from "react";
import settings, { keys } from "service/settings";
import { Config, SubscriptionModel } from "service/settings/types";
import { SubscriptionTypes } from "utils/constants";
import { moneyFormat } from "utils/index";
import Create from "./create";
import Update from "./update";

const SubscriptionTab: FC = () => {
  const { data, refresh, loading } = useRequest(async () =>
    settings.get<Config>(keys.subscription)
  );
  const subs = JSON.parse(data?.value || "[]") as SubscriptionModel[];
  const notSelectedNames = SubscriptionTypes.filter((e) => {
    const found = subs.find((x) => x.name === e.value);
    return !found;
  });
  return (
    <>
      <ITable<SubscriptionModel>
        hideCreateButton={notSelectedNames.length === 0}
        loading={loading}
        total={subs?.length || 0}
        dataSource={subs}
        refresh={refresh}
        columns={[
          {
            dataIndex: "name",
            title: "Name",
            render: (_, record) => (
              <span className="text-md text-gray-600 font-medium">
                {SubscriptionTypes.find((e) => e.value === record.name)?.label}
              </span>
            ),
          },
          {
            dataIndex: "price",
            valueType: "string",
            title: "Price",
            render: (_, record) => `${moneyFormat(record.price)}`,
          },
          {
            dataIndex: "description",
            valueType: "string",
            title: "Description",
          },
        ]}
        CreateComponent={Create}
        UpdateComponent={Update}
        RemoveModelConfig={{
          action: (id) => {
            return settings.set(
              keys.subscription,
              subs?.filter((item) => item.id !== id)
            );
          },
          config: (record) => {
            return {
              uniqueKey: record?.id,
              display: record?.name,
            };
          },
        }}
        details={subs || []}
      />
    </>
  );
};

export default SubscriptionTab;
