import { RadioType } from "service/gov-orphan";
import { Tabs } from "./tabs";
import { useState } from "react";
import { IfCondition } from "components/condition";
import { Caregivers } from "../caregivers";
import { Migration } from "./tabs/migration";
import { Salary } from "./tabs/salary";
import { DCarer } from "./tabs/dcarer";

export const Report: React.FC = () => {
  const [radio, setRadio] = useState<String>(RadioType.care);
  const changeRadio = (v: any) => {
    setRadio(v?.target?.value);
  };
  return (
    <div>
      <Tabs changeRadio={changeRadio} />
      <IfCondition
        condition={radio === RadioType.care}
        whenTrue={<Caregivers />}
      />
      <IfCondition
        condition={radio === RadioType.migration}
        whenTrue={<Migration />}
      />
      <IfCondition
        condition={radio === RadioType.salary}
        whenTrue={<Salary />}
      />
      <IfCondition
        condition={radio === RadioType.dcare}
        whenTrue={<DCarer />}
      />
    </div>
  );
};
