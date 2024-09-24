import { ICard } from "components/card";
import { FormattedMessage } from "react-intl";
// import Map from "components/live-map/index.jsx";

export const TotalCaseAgency: React.FC = () => {
  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case_agency" />
      </p>
      {/* <Map data={{}} /> */}
    </ICard>
  );
};
