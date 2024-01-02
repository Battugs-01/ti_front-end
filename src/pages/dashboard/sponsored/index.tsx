import { useDebounceFn, useRequest } from "ahooks";
import { Tabs, Tooltip, notification } from "antd";
import { FilterForm } from "components/filter";
import { ITable } from "components/index";
import { useEffect, useState } from "react";
import offer from "service/sponsored";
import {
  Offer,
  OfferCategory,
  OfferCategoryArray,
  OfferType,
  OfferTypeArray,
} from "service/sponsored/types";
import { calculateDeadlineDate } from "utils/index";
import Create from "./create";
import Update from "./update";
import CreateForYou from "./create_for_you";
const NotificationPage = () => {
  const [filter, setFilter] = useState<any>({
    page: 0,
    pageSize: 20,
  });

  const list = useRequest(offer.list, {
    manual: true,
    onError: (err) => notification.error({ message: err.message }),
  });
  const [tab, setTab] = useState<OfferType>(OfferType.FOR_YOU);

  const run = (values?: any) => {
    list.run({
      ...filter,
      ...values,
      limit: values?.pageSize,
      created_at: filter.full_date,
      type: tab,
    });
  };

  const debounceSet = useDebounceFn((values) => setFilter(values), {
    wait: 500,
  });

  useEffect(() => {
    run();
  }, [filter, tab]);

  return (
    <div className="space-y-3">
      <FilterForm
        initialValues={{
          ...filter,
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

          if (curr.search || !curr.search)
            debounceSet.run({ ...filter, ...curr });
          else setFilter({ ...filter, ...curr });
        }}
        filters={<></>}
      />
      <Tabs
        onChange={(key) => {
          setTab(key as any);
        }}
        defaultActiveKey={tab}
        items={OfferTypeArray.map((e) => ({ label: <Tooltip title={e.label + " Sponsored"}>{e.label}</Tooltip>, key: e.value }))}
      />

      <ITable<Offer>
        dataSource={list.data?.items}
        loading={list.loading}
        total={list.data?.total}
        refresh={(values) => run(values)}
        columns={[
          {
            dataIndex: "category",
            title: "Category",
            render: (_, record) =>
              OfferCategoryArray.find((e) => e.value === record.category)
                ?.label,
          },
          {
            dataIndex: "name",
            title: "Name",
            render: (_, record) => (
              <div className="font-semibold">
                {record.category === OfferCategory.PRODUCT
                  ? record.product?.name
                  : record.service?.name}
              </div>
            ),
          },
          {
            dataIndex: "list_order",
            title: "List order",
          },
        ]}
        CreateComponent={tab === OfferType.TOP_TEN ? Create : CreateForYou}
        UpdateComponent={Update}
        RemoveModelConfig={{
          action: offer.deleteOffer,
          config: (record) => ({
            title: "Delete",
            uniqueKey: record?.id,
            display:
              record?.category === OfferCategory.PRODUCT
                ? record?.product?.name
                : record?.service?.name,
            body: { ...(record || []) },
          }),
        }}
      />
    </div>
  );
};

export default NotificationPage;
