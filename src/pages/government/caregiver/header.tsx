import { Card } from "antd";
import { FilterForm } from "components/filter";
import { ExportButton } from "components/index";
import InitTableHeader from "components/table-header";
import moment from "moment";
import React, { ReactNode } from "react";
import { CardData } from "service/gov-requests";
import { exportFromTable } from "utils/export";

type HeaderType = {
  children: ReactNode;
};

const Header: React.FC<HeaderType> = (props) => {
  return (
    <Card
      title={
        <div className="mt-5" style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            customHeaderTitle="Шийдвэрлэсэн хүсэлтүүд"
            selectedToggle={""}
            hideToggle={undefined}
            hideCreate
            toolbarItems={
              <div className="flex">
                <ExportButton
                  onClick={() => {
                    exportFromTable(
                      ["Асрамжийн газрын жагсаалт"],
                      window.document.getElementById(
                        "main-table"
                      ) as HTMLElement,
                      window
                    );
                  }}
                />
              </div>
            }
            handleToggle={() => undefined}
          />
        </div>
      }
    >
      <div>{props.children}</div>
    </Card>
  );
};

export default Header;
