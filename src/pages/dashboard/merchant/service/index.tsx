import { useRequest } from "ahooks";
import { Tabs } from "antd";
import { IfCondition } from "components/index";
import { useEffect, useState } from "react";
import merchantService from "service/merchantService";
import {
  ServiceStatusRequestType,
  ServiceStatusType,
} from "service/merchantService/type";
import { AllList } from "./all";
import { CancelledList } from "./cancelled";
import { ServiceForm } from "./form";
import { FullMap } from "./full_map";
import { ManualList } from "./manual";
import { RequestList } from "./request";
import { SponsoredList } from "./sponsor";
import { ServiceTabLabel } from "./tab";
import { VerifiedList } from "./verified";

const ServicePage = () => {
  const [showMap, setShowMap] = useState(false);

  const [tab, setTab] = useState("all");

  const allAPI = useRequest(merchantService.list, {
    manual: true,
  });
  const cancelledAPI = useRequest(merchantService.list, {
    manual: true,
  });
  const manualAPI = useRequest(merchantService.list, {
    manual: true,
  });
  const initialAPI = useRequest(merchantService.list, {
    manual: true,
  });
  const verifiedAPI = useRequest(merchantService.list, {
    manual: true,
  });
  const sponsoredAPI = useRequest(merchantService.list, {
    manual: true,
  });

  const getNumbers = () => {
    const filter = {
      limit: 1,
      page: 0,
    };
    allAPI.run({
      ...filter,
    });

    cancelledAPI.run({
      ...filter,
      status_request: ServiceStatusRequestType.cancelled,
      status: ServiceStatusType.initial,
    });

    manualAPI.run({
      ...filter,
      status: ServiceStatusType.manual,
    });

    initialAPI.run({
      ...filter,
      status_request: ServiceStatusRequestType.pending,
      status: ServiceStatusType.initial,
    });

    verifiedAPI.run({
      ...filter,
      status: ServiceStatusType.verified,
    });

    sponsoredAPI.run({
      ...filter,
      status: ServiceStatusType.sponsored,
    });
  };

  useEffect(() => {
    getNumbers();
  }, []);

  return (
    <div className="space-y-3">
      <Tabs
        defaultActiveKey={tab}
        onChange={(e) => setTab(e as any)}
        items={[
          {
            key: "all",
            label: <ServiceTabLabel title="All" total={allAPI.data?.total} />,
          },
          {
            key: ServiceStatusType.manual,
            label: (
              <ServiceTabLabel
                title="Manually Added"
                total={manualAPI.data?.total}
              />
            ),
          },
          {
            key: ServiceStatusRequestType.pending,
            label: (
              <ServiceTabLabel title="Request" total={initialAPI.data?.total} />
            ),
          },
          {
            key: ServiceStatusRequestType.cancelled,
            label: (
              <ServiceTabLabel
                title="Cancelled"
                total={cancelledAPI.data?.total}
              />
            ),
          },
          {
            key: ServiceStatusType.verified,
            label: (
              <ServiceTabLabel
                title="Verified"
                total={verifiedAPI.data?.total}
              />
            ),
          },
          {
            key: ServiceStatusType.sponsored,
            label: (
              <ServiceTabLabel
                title="Sponsored"
                total={sponsoredAPI.data?.total}
              />
            ),
          },
        ]}
      />

      {/* Form  */}
      <ServiceForm
        onMapClick={() => setShowMap(!showMap)}
        isMapShowing={showMap}
      />

      {/* Body */}
      <IfCondition
        condition={showMap}
        whenTrue={<FullMap type={tab} />}
        whenFalse={
          <>
            <IfCondition
              condition={tab === "all"}
              whenTrue={<AllList updateNumbers={getNumbers} />}
            />
            <IfCondition
              condition={tab === ServiceStatusType.manual}
              whenTrue={<ManualList updateNumbers={getNumbers} />}
            />
            <IfCondition
              condition={tab === ServiceStatusRequestType.pending}
              whenTrue={<RequestList updateNumbers={getNumbers} />}
            />
            <IfCondition
              condition={tab === ServiceStatusRequestType.cancelled}
              whenTrue={<CancelledList updateNumbers={getNumbers} />}
            />
            <IfCondition
              condition={tab === ServiceStatusType.verified}
              whenTrue={<VerifiedList updateNumbers={getNumbers} />}
            />
            <IfCondition
              condition={tab === ServiceStatusType.sponsored}
              whenTrue={<SponsoredList updateNumbers={getNumbers} />}
            />
          </>
        }
      />
    </div>
  );
};

export default ServicePage;
