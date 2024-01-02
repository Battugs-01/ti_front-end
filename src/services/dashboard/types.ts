export interface Dashboard {
  total_merchants: number;
  total_reviews: number;
  total_online_customers: number;
  online_customer_percent : number;
  total_customers: number;
  merchant_percent: number;
  review_percent: number;
  customer_percent: number;
  total_income: number;
  total_commission_amount: number;
  total_sales: number;
  income_percent: number;
  commission_percent: number;
  sales_percent: number;
}

export interface Stats {
  current: StatData[];
  previous: StatData[];
}

export interface StatData {
  xdata: string;
  ydata: number;
}

export interface StatInput {
  end_date: Date;
  pre_end_date: Date;
  pre_start_date: Date;
  start_date: Date;
  type: string;
}
