import { Button, Card, Tooltip } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Edit01, Key01 } from "untitledui-js-base";
import { IfCondition } from "components/condition";
import CreateUser from "../../user/create";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { UserRoleType } from "config";
import { useAuthContext } from "context/auth";

// Constants for text strings
const CARD_TITLE_WITH_USER = "Систем-д нэвтрэх бүртгэл";
const CARD_TITLE_WITHOUT_USER = "Систем-д нэвтрэх бүртгэл байхгүй байна";
const TOOLTIP_ADMIN_ONLY = "Зөвхөн админ хэрэглэгч нууц үг солих боломжтой";
const TOOLTIP_CHANGE_PASSWORD = "Нууц үг солих";
const EMAIL_LABEL = "Нэвтрэх нэр";
const PHONE_LABEL = "Утас";

interface UserAccountCardProps {
  data: CustomerCompanyType;
  onEdit: () => void;
  onChangePassword: (user: any) => void;
  onCancel: () => void;
  onFinish: () => void;
}

/**
 * Displays user account information for a customer company
 */
const UserAccountCard = ({
  data,
  onEdit,
  onChangePassword,
  onCancel,
  onFinish,
}: UserAccountCardProps) => {
  const hasUser = !!data?.user;
  const [{ user: authUser }] = useAuthContext();
  const isAdmin = authUser?.role_name === UserRoleType.admin;

  return (
    <Card
      type="inner"
      title={
        <div className="flex justify-between">
          {hasUser ? CARD_TITLE_WITH_USER : CARD_TITLE_WITHOUT_USER}
          {hasUser && (
            <div className="flex gap-2 items-center">
              <Button
                type="link"
                size="small"
                className="text-gray-500"
                onClick={onEdit}
              >
                <Edit01 />
              </Button>
              <Tooltip
                title={isAdmin ? TOOLTIP_CHANGE_PASSWORD : TOOLTIP_ADMIN_ONLY}
              >
                <Button
                  type="link"
                  size="small"
                  disabled={!isAdmin}
                  className="text-gray-500"
                  onClick={() => onChangePassword(data?.user)}
                >
                  <Key01 className="text-red-700" />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      }
      className="mb-4"
    >
      <IfCondition
        condition={hasUser}
        whenTrue={
          <ProDescriptions dataSource={data} column={2}>
            <ProDescriptions.Item
              label={EMAIL_LABEL}
              dataIndex={["user", "email"]}
            />
            <ProDescriptions.Item 
              label={PHONE_LABEL} 
              dataIndex={["user", "phone"]} 
            />
          </ProDescriptions>
        }
        whenFalse={
          <CreateUser
            customerCompanyId={data?.id ?? 0}
            onCancel={onCancel}
            onFinish={onFinish}
          />
        }
      />
    </Card>
  );
};

export default UserAccountCard;
