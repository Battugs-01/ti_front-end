import { FilterForm } from "components/index";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { FC } from "react";
import {
  calculateDeadlineDate,
  calculatePreviousDeadline,
  diffDates,
  getDatePeriodType,
  getDeadlineType,
} from "utils/index";
import DashboardSection from "./dashboard";
import EventSlots from "./event_slots";
import Graph from "./graph";
import LatestMerchants from "./latest_merchants";
import LatestTransactions from "./latest_transactions";
import { atomFormDashboard } from "./store";
import TopReviews from "./top_reviews";
import TopTen from "./top_ten";

const DashboardPage: FC = () => {
  const [form, setForm] = useAtom(atomFormDashboard);
  const sectionClassName =
    "col-span-10 xl:col-span-4 bg-white rounded-xl h-full w-full shadow-sm";
  return (
    <div className="flex flex-col gap-5">
      <FilterForm
        initialValues={{
          ...form,
        }}
        onValuesChange={(curr) => {
          if (curr.full_date) {
            curr.deadline = undefined;
            let first = dayjs(curr.full_date[0]);
            let second = dayjs(curr.full_date[1]);
            curr.full_date = [first, second];
            let gapDays = diffDates(second.toDate(), first.toDate(), "days");
            curr.pre_full_date = [first.add(-(gapDays + 1), "days"), first];
            curr.type = getDatePeriodType(gapDays);
          }
          if (curr.deadline >= 0) {
            let dates = calculateDeadlineDate(curr.deadline);
            curr.full_date = dates;
            curr.pre_full_date = calculatePreviousDeadline(
              curr.deadline,
              dates
            );
            curr.type = getDeadlineType(curr.deadline);
          }
          setForm({ ...form, ...curr });
        }}
        hideFilter
        hideSearch
      />
      <DashboardSection />
      <div className="grid grid-cols-10 gap-5">
        {/* <div className="col-span-10 xl:col-span-6">
          <Graph />
        </div> */}
        {/* <div className={sectionClassName}>
          <EventSlots />
        </div>
        <div className="col-span-10 xl:col-span-6 bg-white rounded-xl h-full w-full shadow-sm">
          <TopTen />
        </div>
        <div className={sectionClassName}>
          <TopReviews />
        </div> */}
        {/* <div className={sectionClassName}>
          <LatestTransactions />
        </div>
        <div className="col-span-10 xl:col-span-6 bg-white rounded-xl h-full w-full shadow-sm">
          <LatestMerchants />
        </div> */}
      </div>
    </div>
  );
};

export default DashboardPage;
