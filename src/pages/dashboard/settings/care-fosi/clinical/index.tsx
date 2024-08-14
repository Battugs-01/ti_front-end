import { useDebounceFn, useRequest } from "ahooks";
import { notification } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { FC, useEffect, useState } from "react";
import clinical from "service/settings/care-foci/clinical";

const Clinical: FC = () => {
  const [search, setSearch] = useState<string>("");

  const list = useRequest(clinical.get, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const run = () => {
    list.run({
      query: search,
    });
  };

  useEffect(() => {
    run();
  }, []);

  const searchRun = useDebounceFn(list.run, { wait: 1000 });

  return (
    <div className="flex flex-col gap-4 mt-3">
      <PageCard xR>
        <div className="px-2 pb-0">
          <InitTableHeader
            customHeaderTitle="Clinical"
            searchPlaceHolder="Search ..."
            search={search}
            setSearch={(e) => {
              setSearch(e);
              searchRun.run({ query: e });
            }}
            hideCreate
            refresh={() => list.run({ query: search })}
          />
        </div>

        <ITable<any>
          total={12}
          loading={list.loading}
          dataSource={[]}
          refresh={(values) => list.run({ ...values })}
          columns={[
            {
              dataIndex: "rd",
              title: "Name",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "email",
              title: "Min. value",
              align: "left",
              width: "10%",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center ">
                  {value || "-"}
                </span>
              ),
            },
            {
              dataIndex: "email",
              title: "Max. value",
              align: "left",
              width: "10%",
              render: (value) => (
                <span className="text-sm text-[#475467] font-normal flex text-center ">
                  {value || "-"}
                </span>
              ),
            },
          ]}
          RemoveModelConfig={{
            action: clinical.deletecare,
            config: (record) => ({
              uniqueKey: record?.id,
              display: record?.first_name,
              title: "Remove",
            }),
          }}
        />
      </PageCard>
    </div>
  );
};

export default Clinical;
