import { Card } from "antd";
import { FilterForm } from "components/filter";
import moment from "moment";
import React, { Fragment, useState } from "react";
import { CardData } from "service/gov-requests";
import List from "../../components/list";
import InitTableHeader from "components/table-header";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";
type DecideType = {
  data: CardData[];
};

const Decide: React.FC<DecideType> = ({ data }) => {
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
              refresh={() => {}}
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
              key={key}
              image={card?.image}
              name={card?.name}
              surname={card?.surname}
              registrationNumber={card?.registrationNumber}
              state={card?.state}
              date={moment(card?.date).format("l")}
            />
          ))}
        </div>
      </Card>
    </Fragment>
  );
};

export default Decide;
