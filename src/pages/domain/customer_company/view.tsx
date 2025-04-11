import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { ProDescriptions } from '@ant-design/pro-components';
import { useRequest } from "ahooks";
import { Card, Col, Modal, notification, Row } from "antd";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import dayjs from "dayjs";
interface Props {
  open?: boolean;
  detail?: CustomerCompanyType;
  onCancel: () => void;
  onFinish?: () => void;
}

const CustomerCompanyView = ({ open, detail, onCancel, onFinish = () => {} }: Props) => {

    console.log(open)
  const getDetail = useRequest(customerCompany.getDetail, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });
  useEffect(() => {
    if (open && detail?.id) {
      getDetail.run(detail.id);
    }
  }, [open]);

  return (<Modal
    title="Харилцагч компанийн мэдээлэл"
    width={1000}
    open={!!open}
    onCancel={onCancel}
    footer={null}
  >
    <div className="my-6">
        <Card type="inner" title="Дэлгэрэнгүй" className="mb-4">
            <ProDescriptions  dataSource={getDetail.data} column={2}>
                <ProDescriptions.Item label="Нэр" dataIndex="name" />
                <ProDescriptions.Item label="Товчлол" dataIndex="shortcut_name" />
                <ProDescriptions.Item label="Зууч эсэх" dataIndex="is_broker" render={(value) => value ? "Зууч" : "Зууч биш"} />
                <ProDescriptions.Item label="Цахим шуудан" dataIndex="contact_number" />
                <ProDescriptions.Item label="Үүссэн огноо" dataIndex="created_at" render={(value: any) => dayjs(value).format("YYYY-MM-DD HH:mm:ss")} />
                <ProDescriptions.Item label="Үүсгэсэн ажилтан" dataIndex="created_by" render={(value: any) => value?.last_name + " " + value?.first_name} />
            </ProDescriptions>
        </Card>
        <Card type="inner" title={getDetail.data?.user ? "Систем-д нэвтрэх бүртгэл" : "Систем-д нэвтрэх бүртгэл байхгүй байна"} className="mb-4">
            <ProDescriptions  dataSource={getDetail.data} column={2}>
                <ProDescriptions.Item label="Нэвтрэх нэр" dataIndex={["user", "email"]} />
                <ProDescriptions.Item label="Утас" dataIndex={["user", "phone"]} />
            </ProDescriptions>
        </Card>
        <Card type="inner" title={getDetail.data?.ledger ? "Харилцагч компанийн данс" : "Харилцагч компанийн данс байхгүй байна"} className="mb-4">
            <ProDescriptions  dataSource={getDetail.data} column={2}>
                <ProDescriptions.Item label="Одоогийн үлдэгдэл" dataIndex={["ledger", "balance"]} />
                <ProDescriptions.Item label="Дансны код" dataIndex={["ledger", "name"]} />
            </ProDescriptions>
        </Card>
      </div>
    </Modal>
  );
};

export default CustomerCompanyView;

