import { ICard } from "components/card";
import { FormattedMessage } from "react-intl";

export const TotalCaseAgency: React.FC = () => {
  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case_agency" />
      </p>
    </ICard>
  );
};
