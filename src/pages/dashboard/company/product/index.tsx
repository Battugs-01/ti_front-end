import { Radio } from "antd";
import { IfCondition } from "components/index";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { ProductType } from "service/product/type";
import { BannerList } from "./banner";
import { CouponList } from "./coupon";
import { EventList } from "./event";
import { NewsList } from "./news";
import { ProductList } from "./product";
import { atomProductForm } from "./store";
type Props = {
  serviceId: number;
};
const categories = [
  { label: "Event & Tax", value: ProductType.event },
  { label: "Coupon", value: ProductType.coupon },
  { label: "Product", value: ProductType.product },
  { label: "Banner", value: ProductType.banner },
  { label: "News", value: ProductType.news },
];
export const ProductTab = ({ serviceId }: Props) => {
  const [form, setForm] = useAtom(atomProductForm);
  useEffect(() => {
    if (serviceId) {
      setForm({ ...form, tab: ProductType.event, serviceId });
    }
  }, [serviceId]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mt-4">
        <Radio.Group
          onChange={(e) => setForm({ ...form, tab: e.target.value })}
          size="large"
          defaultValue={form.tab}
          className="flex items-center"
        >
          {categories.map((el, index) => (
            <Radio.Button
              key={"group-" + index}
              value={el.value}
              className=" font-medium text-gray-700 text-sm flex items-center "
            >
              {el.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <IfCondition
        condition={form.tab === ProductType.event}
        whenTrue={<EventList />}
      />
      <IfCondition
        condition={form.tab === ProductType.coupon}
        whenTrue={<CouponList />}
      />
      <IfCondition
        condition={form.tab === ProductType.product}
        whenTrue={<ProductList />}
      />
      <IfCondition
        condition={form.tab === ProductType.banner}
        whenTrue={<BannerList />}
      />
      <IfCondition
        condition={form.tab === ProductType.news}
        whenTrue={<NewsList />}
      />
    </div>
  );
};
