import { UserRoleType } from "config";
import { AuthContext } from "context/auth";
import { useContext } from "react";
import { Admin } from "./admin";
import { SuperAdmin } from "./super_admin";
import { Button, Result } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  const intl = useIntl();
  const [user] = useContext(AuthContext);
  if (user?.user?.role === UserRoleType.super_admin) {
    return <SuperAdmin />;
  } else if (user?.user?.role === UserRoleType.admin) {
    return <Admin />;
  }
  return (
    <>
      <Result
        status="500"
        title={intl.formatMessage({ id: "permission_denied" })}
        subTitle={intl.formatMessage({ id: "permission_denied_description" })}
        extra={
          <Link to="/dashboard/dashboard" className="no-underline">
            <Button type="primary" key="console">
              <FormattedMessage id="back_dashboard" />
            </Button>
          </Link>
        }
      ></Result>
    </>
  );
};

export default Settings;
