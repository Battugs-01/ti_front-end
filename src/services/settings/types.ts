import { Merchant } from "service/merchant/type";
import { Base } from "service/type";

export interface PlatformSettingsModel {
  faq: FaqModel[];
  commission: CommissionModel;
  subscription: SubscriptionModel[];
  languages: LanguageModel[];
  terms: TermsModel;
}

export interface TermsModel {
  userAppTerms?: string;
  merchantAppTerms: string;
  userAppTermsEn?: string,
  userAppTermsKr?: string,
  userAppTermsCn?: string,
  userAppTermsRu?: string,
}

export interface FaqModel extends Base {
  title: string;
  content: string;
  language?: string;
}

export interface CommissionModel {
  coverImage: string;
  commissionItems: CommissionItemModel[];
}

export interface CommissionItemModel extends Base {
  productType: string;
  merchantsIds: string[];
  merchants: Merchant[];
  name: string;
  commissionPercentage: number;
  startDate: string;
}

export interface SubscriptionModel extends Base {
  name: string;
  price: number;
  description: string;
}

export interface LanguageModel {
  id: string;
  name: string;
  code: string;
}

export interface SettingComponentProps {
  data?: PlatformSettingsModel;
  refetch: () => void;
  fetching: boolean;
  saving: boolean;
  update: (data: any) => void;
}

export interface Config extends Base {
  key: string;
  value: string;
  type: string;
}

export interface ConfigInput {
  value: string;
  type: string;
}

export interface AvatarModel {
  id: string;
  path: string;
}
