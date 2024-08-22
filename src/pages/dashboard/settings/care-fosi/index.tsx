import { useRequest } from "ahooks";
import { Flex, Table } from "antd";
import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { useEffect } from "react";
import carefoci from "service/settings/care-foci";

const CareFosi: React.FC = () => {
  const carefocilist = useRequest(carefoci.get, {
    manual: true,
  });
  useEffect(() => {
    carefocilist.run();
  }, []);
  return (
    <Flex vertical gap="large">
      {carefocilist.data?.map((data, index) => {
        return (
          <div className="flex flex-col gap-4 mt-3" key={index}>
            <PageCard xR loading={carefocilist?.loading}>
              <div className="px-2 pb-0 mb-6 mt-1 mx-4">
                <div className="text-gray-900 md:text-lg text-base font-medium">
                  {data?.name}
                </div>
              </div>

              <Table
                pagination={false}
                dataSource={data?.items}
                columns={[
                  {
                    title: "№",
                    align: "center",
                    width: 60,
                    render: (_, __, index) => <div>{index + 1}</div>,
                  },
                  {
                    dataIndex: "name",
                    title: "Name",
                    render: (value) => (
                      <span className="text-sm text-[#475467] font-normal flex text-center">
                        {value || "-"}
                      </span>
                    ),
                  },
                  {
                    dataIndex: "min",
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
                    dataIndex: "max",
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
              />
            </PageCard>
          </div>
        );
      })}
    </Flex>
  );
};

export default CareFosi;
