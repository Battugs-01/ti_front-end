import { IfCondition } from "components/index";
import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { ByAgency } from "./by_agency";
import { ByCaseManager } from "./by_casemanager";
import { ManagementReport } from "./management_report";

export const DevelopmentPlanReport: React.FC = () => {
  const [user] = useContext(AuthContext);
  return (
    <>
      <IfCondition
        condition={user?.user?.role === UserRoleType.super_admin || user?.user?.role === UserRoleType.stack_holder}
        whenTrue={<ManagementReport />}
      />
      <IfCondition
        condition={
          user?.user?.role === UserRoleType.operation_manager ||
          user?.user?.role === UserRoleType.doctor ||
          user?.user?.role === UserRoleType.admin
        }
        whenTrue={<ByAgency />}
      />
      <IfCondition
        condition={user?.user?.role === UserRoleType.case_manager || user?.user?.role === UserRoleType.senior_case_manager}
        whenTrue={<ByCaseManager />}
      />
    </>
  );
};
