import { Avatar, Card } from "antd";
import { FilterForm } from "components/filter";
import React, { Fragment, useMemo, useState } from "react";
import List from "../../components/list";
import moment from "moment";
import { CardData } from "service/gov-requests";
import InitTableHeader from "components/table-header";
import { ExportButton } from "components/index";
import { exportFromTable } from "utils/export";

type PutOnHoldType = {
  data: CardData[];
};

const PutOnHold: React.FC<PutOnHoldType> = ({ data }) => {
  const [create, setCreate] = useState<boolean>(false);

  const putOnData = useMemo(
    () => data?.filter((value) => value?.state === 1),
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
              customHeaderTitle="Хүлээлэгт оруулсан хүсэлтүүд"
              setCreate={setCreate}
              toolbarItems={
                <div className="flex">
                  <ExportButton
                    onClick={() => {
                      exportFromTable(
                        ["Хүлээлэгт оруулсан хүсэлтүүд"],
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
          {putOnData?.map((card, key) => (
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

export default PutOnHold;
