import Pin from "assets/img/Pin.png";
import { ICard } from "components/card";
import { FormattedMessage } from "react-intl";
import { TotalPointInterface } from "service/dashboard/type";

interface TotalCaseAgencyProps {
  data?: TotalPointInterface[];
}

export const TotalCaseAgency: React.FC<TotalCaseAgencyProps> = (data) => {
  return (
    <ICard xR yR>
      <p className="px-5 text-xl font-semibold">
        <FormattedMessage id="total_case_agency" />
      </p>

      <div
        style={{
          backgroundImage: "url('/svg/mn_map1.svg')",
          backgroundPosition: "top", // Positions the image in the center
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundSize: "contain",
        }}
        className="custom_divImage mt-4 relative w-full h-[50vh]"
      >
        <img
          src={Pin}
          alt="MNMap"
          className="h-[50px] w-[50px] absolute"
          style={{ top: "15%", right: "40%" }} // Adjust using percentages to scale correctly
        />
        <img
          src={Pin}
          alt="MNMap"
          className="h-[50px] w-[50px] absolute"
          style={{ top: "18%", right: "45%" }} // Adjust using percentages to scale correctly
        />
        <img
          src={Pin}
          alt="MNMap"
          className="h-[50px] w-[50px] absolute"
          style={{ top: "30%", right: "22%" }} // Adjust using percentages to scale correctly
        />
      </div>
    </ICard>
  );
};
