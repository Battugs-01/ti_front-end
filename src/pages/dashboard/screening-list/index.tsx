import { AuthContext } from "context/auth";
import { useContext } from "react";
import ScreeningListCaseManager from "./case-manager";
import ScreeningListOtherRoles from "./other_roles";

const ScreeningList: React.FC = () => {
  const [user] = useContext(AuthContext);

  return (
    <div>
      {user.user?.role === "case_manager" ? (
        <ScreeningListCaseManager />
      ) : (
        <ScreeningListOtherRoles />
      )}
    </div>
  );
};

export default ScreeningList;
