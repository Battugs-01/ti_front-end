import { Button, Card } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { Edit01 } from "untitledui-js-base";
import dayjs from "dayjs";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";

interface CompanyDetailsCardProps {
  data: CustomerCompanyType;
  onEdit: () => void;
}

/**
 * Displays detailed information about a customer company
 */
const CompanyDetailsCard = ({ data, onEdit }: CompanyDetailsCardProps) => {
  return (
    <Card
      type="inner"
      title={
        <div className="flex justify-between">
          <div>Дэлгэрэнгүй</div>
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
      <ProDescriptions dataSource={data} column={2}>
        <ProDescriptions.Item label="Нэр" dataIndex="name" />
        <ProDescriptions.Item label="Товчлол" dataIndex="shortcut_name" />
        <ProDescriptions.Item
          label="Зууч эсэх"
          dataIndex="is_broker"
          render={(value) => (value ? "Зууч" : "Зууч биш")}
        />
        <ProDescriptions.Item
          label="Харилцах дугаар"
          dataIndex="contact_number"
        />
        <ProDescriptions.Item
          label="Үүссэн огноо"
          dataIndex="created_at"
          render={(value: any) =>
            dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          }
        />
        <ProDescriptions.Item
          label="Үүсгэсэн ажилтан"
          dataIndex="created_by"
          render={(value: any) =>
            value?.last_name + " " + value?.first_name
          }
        />
      </ProDescriptions>
    </Card>
  );
};

export default CompanyDetailsCard; 