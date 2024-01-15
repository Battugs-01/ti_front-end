import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React, { Fragment, useMemo, useState } from "react";
import List from "../../components/list";
import moment from "moment";
import { CardData } from "service/gov-requests";
import InitTableHeader from "components/table-header";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";

type DecidedType = {
  data: CardData[];
};

const Decided: React.FC<DecidedType> = ({ data }) => {
  const [create, setCreate] = useState<boolean>(false);

  const decidedData = useMemo(
    () => data?.filter((value) => value?.state === 4 || value?.state === 3),
    []
  );
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
              customHeaderTitle="Шийдвэрлэсэн хүсэлтүүд"
              setCreate={setCreate}
              toolbarItems={
                <div className="flex">
                  <ExportButton
                    onClick={() => {
                      exportFromTable(
                        ["Шийдвэрлэсэн хүсэлтүүд"],
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
          {decidedData?.map((card, key) => (
            <List
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

export default Decided;
