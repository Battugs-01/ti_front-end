import { Radio } from "antd";
import IBadge from "components/badge";
import { IfCondition } from "components/condition";
import { useState } from "react";
import { EmployeeTab } from "service/gov-employees/type";
import All from "./tabs/all";
import Employee from "./tabs/employee";
import Contract from "./tabs/contract";
import Probation from "./tabs/probation";
import Attached from "./tabs/attached";

const EmployeePage: React.FC = () => {
  const [tab, setTab] = useState<String>(EmployeeTab.all);

  return (
    <div>
      <div>
        <Radio.Group
          defaultValue={EmployeeTab.all}
          onChange={(e) => setTab(e.target.value)}
        >
          <Radio.Button value={EmployeeTab.all}>
            <div className="flex items-center gap-2">
              <div>Бүгд</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={EmployeeTab.employee}>
            <div className="flex items-center gap-2">
              <div>Үндсэн ажилтан</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={EmployeeTab.contract}>
            <div className="flex items-center gap-2">
              <div>Гэрээт</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={EmployeeTab.probation}>
            <div className="flex items-center gap-2">
              <div>Туршилтын ажилтан</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
          <Radio.Button value={EmployeeTab.attached}>
            <div className="flex items-center gap-2">
              <div>Хавсран гүйцэтгэх</div> <IBadge title="10" color="gray" />
            </div>
          </Radio.Button>
        </Radio.Group>
      </div>
      <IfCondition condition={tab === EmployeeTab.all} whenTrue={<All />} />
      <IfCondition
        condition={tab === EmployeeTab.employee}
        whenTrue={<Employee />}
      />
      <IfCondition
        condition={tab === EmployeeTab.contract}
        whenTrue={<Contract />}
      />
      <IfCondition
        condition={tab === EmployeeTab.probation}
        whenTrue={<Probation />}
      />
      <IfCondition
        condition={tab === EmployeeTab.attached}
        whenTrue={<Attached />}
      />
    </div>
  );
};

export default EmployeePage;
