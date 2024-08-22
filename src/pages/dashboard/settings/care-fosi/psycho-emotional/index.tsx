import { PageCard } from "components/card";
import { ITable } from "components/index";
import InitTableHeader from "components/table-header";
import { FC } from "react";
import { CareFoci } from "service/settings/care-foci/type";

interface PsychoEmotionalProps {
  data: CareFoci;
}

const PsychoEmotional: FC<PsychoEmotionalProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4 mt-3">
      <PageCard xR>
        <div className="px-2 pb-0">
          <InitTableHeader
            customHeaderTitle={data?.name}
            searchPlaceHolder="Search ..."
            hideCreate
          />
        </div>

        <ITable<any>
          total={12}
          dataSource={[]}
          columns={[
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
};

export default PsychoEmotional;
