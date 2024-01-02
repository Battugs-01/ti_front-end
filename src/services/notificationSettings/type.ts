import { ServiceCategory } from "service/merchantService/type";
import { ProductCategoryType } from "service/product/type";
import { Base } from "types";

export enum NotificationSettingsType {
  order = "order",
  interval = "interval",
}
export interface NotificationSettings extends Base {
  title: string;
  description: string;
  interval_max: number;
  interval_min: number;
  interval_minute: number;
  type: NotificationSettingsType;
  service_categories: ServiceCategory[];
  product_categories: ProductCategoryType[];
  is_active: boolean;
  week_day: string;
}
