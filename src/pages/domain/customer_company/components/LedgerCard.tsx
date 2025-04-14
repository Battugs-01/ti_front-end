import { Button, Card } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Edit01 } from "untitledui-js-base";
import { IfCondition } from "components/condition";
import CreateLedger from "../../ledger.tsx/create";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";

interface LedgerCardProps {
  data: CustomerCompanyType;
  onEdit: () => void;
  onCancel: () => void;
  onFinish: () => void;
}

/**
 * Displays ledger information for a customer company
 */
const LedgerCard = ({ data, onEdit, onCancel, onFinish }: LedgerCardProps) => {
  const hasLedger = !!data?.ledger;

  return (
    <Card
      type="inner"
      title={
        <div className="flex justify-between">
          {hasLedger
            ? "Харилцагч компанийн данс"
            : "Харилцагч компанийн данс байхгүй байна"}
          <Button
            type="link"
            size="small"
            className="text-gray-500"
            onClick={onEdit}
          >
            <Edit01 />
          </Button>
        </div>
      }
      className="mb-4"
    >
      <IfCondition
        condition={hasLedger}
        whenTrue={
          <ProDescriptions dataSource={data} column={2}>
            <ProDescriptions.Item
              valueType="money"
              label="Одоогийн үлдэгдэл"
              dataIndex={["ledger", "balance"]}
            />
            <ProDescriptions.Item
              label="Дансны код"
              dataIndex={["ledger", "name"]}
            />
          </ProDescriptions>
        }
        whenFalse={
          <CreateLedger
            customerCompanyId={data.id ?? 0}
            onCancel={onCancel}
            onFinish={onFinish}
          />
        }
      />
    </Card>
  );
};

export default LedgerCard;
