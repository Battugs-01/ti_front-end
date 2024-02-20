import { Card } from "antd";
import { FilterForm } from "components/filter";
import moment from "moment";
import React, { Fragment, useState } from "react";
import List from "../../components/list";
import InitTableHeader from "components/table-header";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";
import CustomPagination from "components/pagination";
import { ListElderly } from "service/social-worker/customer/type";
type DecideType = {
  data: ListElderly[];
  run?: () => void;
};

const Decide: React.FC<DecideType> = ({ data, run }) => {
  const [create, setCreate] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="mb-4">
        <FilterForm />
      </div>
      <Card
        title={
          <div className="pt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
            <InitTableHeader
              hideCreate
              refresh={() => {
                console.log("jjjj");
                run?.();
              }}
              customHeaderTitle="Шийдвэрлэх хүсэлтүүд"
              setCreate={setCreate}
              toolbarItems={
                <div className="flex">
                  <ExportButton
                    onClick={() => {
                      exportFromTable(
                        ["Шийдвэрлэх хүсэлтүүд"],
                        window.document.getElementById(
                          "main-table"
                        ) as HTMLElement,
                        window
                      );
                    }}
                  />
                </div>
              }
            />
          </div>
        }
      >
        <div>
          {data?.map((card, key) => (
            <List
              id={card?.id}
              key={key}
              image={card?.first_name}
              name={card?.first_name}
              surname={card?.last_name}
              registrationNumber={card?.rd}
              date={moment(card?.created_at).format("l")}
              time={moment(card?.created_at).format("HH:mm")}
            />
          ))}
          <div
            className="flex justify-end mb-4 px-6"
            style={{ borderTop: "1px solid #EAECF0" }}
          >
            <CustomPagination total={data?.length} />
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default Decide;
