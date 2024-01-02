import { Divider, Empty, Tabs } from "antd";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CompanyDashboard } from "./dashboard";
import { CompanyInfo } from "./info";
import { PaymentTab } from "./payment";
import { ProductTab } from "./product";
import { ReviewTab } from "./review";
import { TeamTab } from "./team";

const CompanyPage = () => {
  const [tab, setTab] = useState("payment");
  const params = useParams();

  const parsedId = parseInt(params.id || "0");

  return (
    <div className="space-y-4">
      <div className="bg-white w-full space-y-8 px-5 pt-5">
        <IfCondition
          condition={!params.id}
          whenTrue={<Empty />}
          whenFalse={
            <>
              <CompanyInfo id={parsedId} />
              <Divider className=" my-8" />
              <CompanyDashboard id={parsedId} />

              <Tabs
                defaultValue={tab}
                onChange={(e) => setTab(e)}
                items={[
                  {
                    label: "Payment",
                    key: "payment",
                  },
                  {
                    label: "Products",
                    key: "product",
                  },
                  {
                    label: "Reviews",
                    key: "review",
                  },
                  {
                    label: "Team",
                    key: "team",
                  },
                ]}
              />
            </>
          }
        />
      </div>
      <IfCondition
        condition={tab === "payment"}
        whenTrue={<PaymentTab serviceId={parsedId} />}
      />
      <IfCondition
        condition={tab === "product"}
        whenTrue={<ProductTab serviceId={parsedId} />}
      />
      <IfCondition
        condition={tab === "review"}
        whenTrue={<ReviewTab serviceId={parsedId} />}
      />
      <IfCondition
        condition={tab === "team"}
        whenTrue={<TeamTab serviceId={parsedId} />}
      />
    </div>
  );
};

export default CompanyPage;
