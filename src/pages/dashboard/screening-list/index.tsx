import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import ScreeningListCaseManager from "./case-manager";
import ScreeningListDoctor from "./doctor_roles";

const ScreeningList: React.FC = () => {
  const [user] = useContext(AuthContext);

  return (
    <div>
      {user.user?.role === UserRoleType.doctor ? (
        <ScreeningListDoctor />
      ) : (
        <ScreeningListCaseManager />
      )}
    </div>
  );
};

export default ScreeningList;
