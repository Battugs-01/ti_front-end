import { ICard } from "components/card";
import { FormattedMessage } from "react-intl";
import { TotalPointInterface } from "service/dashboard/type";
// import Map from "components/live-map/index.jsx";

interface TotalCaseAgencyProps {
  data?: TotalPointInterface[];
}
export const TotalCaseAgency: React.FC<TotalCaseAgencyProps> = (data) => {
  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case_agency" />
      </p>

      {/* <Map data={{}} /> */}
    </ICard>
  );
};
