import { AuthContext } from "context/auth";
import { useContext } from "react";
import ScreeningListCaseManager from "./case-manager";
import ScreeningListOtherRoles from "./other_roles";
import { UserRoleType } from "config";

const ScreeningList: React.FC = () => {
  const [user] = useContext(AuthContext);
  console.log(user.user?.role, "role");
  return (
    <div>
      {user.user?.role === UserRoleType.case_manager ? (
        <ScreeningListCaseManager />
      ) : (
        <ScreeningListOtherRoles />
      )}
    </div>
  );
};

export default ScreeningList;
