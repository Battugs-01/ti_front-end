import { Button, Card, Tooltip } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Edit01, Key01 } from "untitledui-js-base";
import { IfCondition } from "components/condition";
import CreateUser from "../../user/create";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import { UserRoleType } from "config";

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
  onFinish 
}: UserAccountCardProps) => {
  const hasUser = !!data?.user;
  
  return (
    <Card
      type="inner"
      title={
        <div className="flex justify-between">
          {hasUser
            ? "Систем-д нэвтрэх бүртгэл"
            : "Систем-д нэвтрэх бүртгэл байхгүй байна"}
          <div className="flex gap-2 items-center">
            <Button
              type="link"
              size="small"
              className="text-gray-500"
              onClick={onEdit}
            >
              <Edit01 />
            </Button>
            {hasUser && (
              <Tooltip
                title={
                  data?.user?.role_name !== UserRoleType.admin
                    ? "Зөвхөн админ хэрэглэгч нууц үг солих боломжтой"
                    : "Нууц үг солих"
                }
              >
                <Button
                  type="link"
                  size="small"
                  disabled={
                    data?.user?.role_name !== UserRoleType.admin
                  }
                  className="text-gray-500"
                  onClick={() => onChangePassword(data?.user)}
                >
                  <Key01 className="text-red-700" />
                </Button>
              </Tooltip>
            )}
          </div>
        </div>
      }
      className="mb-4"
    >
      <IfCondition
        condition={hasUser}
        whenTrue={
          <ProDescriptions dataSource={data} column={2}>
            <ProDescriptions.Item
              label="Нэвтрэх нэр"
              dataIndex={["user", "email"]}
            />
            <ProDescriptions.Item
              label="Утас"
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