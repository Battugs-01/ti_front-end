import { Tabs, Tooltip } from "antd";
import { useState } from "react";
import { ProductForm } from "./form";
import { IfCondition } from "components/index";
import { ProductType } from "service/product/type";
import BannerTab from "./banner";
import CouponTab from "./coupon";
import EventTaxTab from "./event_tax";
import NewsTab from "./news";
import ProductTab from "./product";
import CareInformation from "../care-information";

const ServicePage = () => {
  const [tab, setTab] = useState(ProductType.event);

  return (
    <div className="space-y-3">
      {/* <CareInformation /> */}
      <Tabs
        defaultActiveKey={tab}
        onChange={(e) => setTab(e as any)}
        items={[
          {
            key: ProductType.event,
            label: <Tooltip title="Event & Tax Products"> Event & Tax</Tooltip>,
          },
          {
            key: ProductType.coupon,
            label: <Tooltip title="Coupon Products"> Coupon</Tooltip>,
          },
          {
            key: ProductType.product,
            label: <Tooltip title="Product Products"> Product</Tooltip>,
          },
          {
            key: ProductType.banner,
            label: <Tooltip title="Banner Products"> Banner</Tooltip>,
          },
          {
            key: ProductType.news,
            label: <Tooltip title="News Products"> News</Tooltip>,
          },
        ]}
      />

      <ProductForm />
      {/* <EventTaxTab /> */}
      {/* <EventTaxTab /> */}
      <IfCondition
        condition={tab === ProductType.event}
        whenTrue={<EventTaxTab />}
      />
      <IfCondition
        condition={tab === ProductType.coupon}
        whenTrue={<EventTaxTab />}
      />
      <IfCondition
        condition={tab === ProductType.product}
        whenTrue={<ProductTab />}
      />
      <IfCondition
        condition={tab === ProductType.banner}
        whenTrue={<BannerTab />}
      />
      <IfCondition
        condition={tab === ProductType.news}
        whenTrue={<NewsTab />}
      />
    </div>
  );
};

export default ServicePage;
