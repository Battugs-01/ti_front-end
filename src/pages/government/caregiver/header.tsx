import { Card } from "antd";
import { FilterForm } from "components/filter";
import InitTableHeader from "components/table-header";
import moment from "moment";
import React, { ReactNode } from "react";
import { CardData } from "service/gov-requests";

type HeaderType = {
  children: ReactNode;
};

const Header: React.FC<HeaderType> = (props) => {
  return (
    <Card
      title={
        <div style={{ borderBottom: "1px solid #EAECF0" }}>
          <InitTableHeader
            customHeaderTitle="Асруулагчдын дэлгэрэнгүй мэдээлэл"
            selectedToggle={""}
            hideToggle={undefined}
            toolbarItems={undefined}
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
