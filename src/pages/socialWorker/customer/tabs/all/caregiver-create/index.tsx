import { ProFormText } from "@ant-design/pro-form";
import { Popover, Steps, StepsProps } from "antd";
import checkSvg from "assets/government/icons/check.svg";
import finishCircle from "assets/government/icons/finish-circle.svg";
import waitCircle from "assets/government/icons/wait-circle.svg";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { CaregiverInfoForm } from "./caregiver-info-form.tsx";
import { RegistrationForm } from "./registration-document/index.js";
import { HealthForm } from "./health-condition/index.js";
import { SendForm } from "./request-send/index.js";

export const CareGiverForm: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };
  return (
    <div className="m-auto">
      <Steps
        current={current}
        onChange={onChange}
        progressDot={(icon, { index, status }) => {
          switch (status) {
            case "finish":
              return (
                <div className="bg-[#F5F8F8] rounded-full w-6 h-6 p-1">
                  <img src={checkSvg} alt="check" />
                </div>
              );
            case "wait":
              return (
                <div className="bg-[#F9FAFB] rounded-full p-1 w-6 h-6">
                  <div className="bg-[#F9FAFB] rounded-full w-full h-full">
                    <img src={waitCircle} alt="finishCircle" />
                  </div>
                </div>
              );
            case "process":
              return (
                <div className="bg-[#F5F8F8] rounded-full p-1 w-6 h-6">
                  <div className="bg-[#F5F8F8] rounded-full w-full h-full">
                    <img src={finishCircle} alt="finishCircle" />
                  </div>
                </div>
              );
          }
        }}
        items={[
          {
            title: (
              <div className="text-[#344054] font-semibold mt-1">
                Асруулагчийн хувийн мэдээлэл
              </div>
            ),
          },
          {
            title: (
              <div className="text-[#344054] font-semibold mt-1">
                Бүрдүүлэх бичиг баримт
              </div>
            ),
          },
          {
            title: (
              <div className="text-[#344054] font-semibold mt-1">
                Эрүүл мэндийн байдал
              </div>
            ),
          },
          {
            title: (
              <div className="text-[#344054] font-semibold mt-1">
                Хүсэлт илгээх
              </div>
            ),
          },
        ]}
      />
      <IfCondition condition={current === 0} whenTrue={<CaregiverInfoForm />} />
      <IfCondition condition={current === 1} whenTrue={<RegistrationForm />} />
      <IfCondition condition={current === 2} whenTrue={<HealthForm />} />
      <IfCondition condition={current === 3} whenTrue={<SendForm />} />
    </div>
  );
};
