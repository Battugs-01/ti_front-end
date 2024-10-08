import Vector from "assets/img/Vector.svg";
import { GenderBadge } from "components/badge/gender";
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
      <div className="flex justify-center items-start">
        <div
          style={{
            backgroundImage: "url('/svg/mn_map1.svg')",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            width: "676px",
            height: "325px",
          }}
          className="custom_divImage mt-4 relative flex justify-between"
        >
          <div
            style={{
              backgroundImage: "url('/svg/pin.png')",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              top: "50px",
              right: "269px",
            }}
            className="h-[50px] w-[50px] absolute"
          >
            <div
              className="flex justify-center items-center rounded-full bg-green-700 text-white text-[11px] p-1 m-2"
              style={{
                borderRadius: "50%",
              }}
            >
              60%
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/svg/pin.png')",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              top: "54px",
              right: "233px",
            }}
            className="h-[50px] w-[50px] absolute"
          >
            <div
              className="flex justify-center items-center rounded-full bg-blue-700 text-white text-[11px] p-1 m-2"
              style={{
                borderRadius: "50%",
              }}
            >
              60%
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('/svg/pin.png')",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              top: "94px",
              right: "253px",
            }}
            className="h-[50px] w-[50px] absolute"
          >
            <div
              className="flex justify-center items-center rounded-full bg-[#f2ae00] text-white text-[11px] p-1 m-2"
              style={{
                borderRadius: "50%",
              }}
            >
              60%
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center mt-10">
        <div className="flex gap-2">
          <img src={Vector} alt="Vector" />
          <div className="flex flex-col">
            <div className="text-gray-700 font-medium text-base">Дархан</div>
            <div className="flex gap-2">
              <span className="text-[#7b878c] text-sm font-normal">60%</span>
              <GenderBadge status="female" percent={45} />
              <GenderBadge status="male" percent={55} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <img src={Vector} alt="Vector" />
          <div className="flex flex-col">
            <div className="text-gray-700 font-medium text-base">Дархан</div>
            <div className="flex gap-2">
              <span className="text-[#7b878c] text-sm font-normal">60%</span>
              <GenderBadge status="female" percent={45} />
              <GenderBadge status="male" percent={55} />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <img src={Vector} alt="Vector" />
          <div className="flex flex-col">
            <div className="text-gray-700 font-medium text-base">Дархан</div>
            <div className="flex gap-2">
              <span className="text-[#7b878c] text-sm font-normal">60%</span>
              <GenderBadge status="female" percent={45} />
              <GenderBadge status="male" percent={55} />
            </div>
          </div>
        </div>
      </div>
    </ICard>
  );
};
