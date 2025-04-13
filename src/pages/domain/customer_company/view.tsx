import ProForm, { ModalForm, ProFormText } from "@ant-design/pro-form";
import { ProDescriptions } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Card, Col, Modal, notification, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import customerCompany from "service/fininaciar/customerCompany";
import { CustomerCompanyType } from "service/fininaciar/customerCompany/type";
import dayjs from "dayjs";
import { IfCondition } from "components/condition";
import CreateLedger from "../ledger.tsx/create";
import { Edit01 } from "untitledui-js-base";
import { UpdateUser } from "../user/update";
import CreateUser from "../user/create";
import { UpdateCustomerCompany } from "pages/dashboard/financiar/pages/CustomerCompany/actions/update";
import UpdateLedger from "../ledger.tsx/update";
interface Props {
  open?: boolean;
  detail?: CustomerCompanyType;
  onCancel: () => void;
  onFinish?: () => void;
}

const CustomerCompanyView = ({
  open,
  detail,
  onCancel,
  onFinish = () => {},
}: Props) => {
  console.log(open);
  const getDetail = useRequest(customerCompany.getDetail, {
    manual: true,
    onError: (err) => {
      notification.error({
        message: err.message,
      });
    },
  });

  const [isEditUser, setIsEditUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditLedger, setIsEditLedger] = useState(false);

  useEffect(() => {
    if (open && detail?.id) {
      getDetail.run(detail.id);
    }
  }, [open]);

  const reload = () => {
    if (detail?.id) {
      getDetail.run(detail?.id);
    }
  };

  if (getDetail.loading) {
    return <Spin />;
  }

  if (!getDetail.data) {
    return <div>Мэдээлэл олдсонгүй</div>;
  }


  return (
    <>
      <Modal
        title="Харилцагч компанийн мэдээлэл"
        width={1000}
        open={!!open}
        onCancel={onCancel}
        footer={null}
      >
        <div className="my-6">
          <Card type="inner" title={
            <div className="flex justify-between">
              <div>Дэлгэрэнгүй</div>
              <Button type="link" size="small" className="text-gray-500" onClick={() => setIsEdit(true)}>
                <Edit01 />
              </Button>
            </div>
          } className="mb-4">
            <ProDescriptions dataSource={getDetail.data} column={2}>
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
          <Card
            type="inner"
            title={
              <div className="flex justify-between">
                {getDetail.data?.user
                  ? "Систем-д нэвтрэх бүртгэл"
                  : "Систем-д нэвтрэх бүртгэл байхгүй байна"}
                <Button
                  type="link"
                  size="small"
                  className="text-gray-500"
                  onClick={() => setIsEditUser(true)}
                >
                  <Edit01 />
                </Button>
              </div>
            }
            className="mb-4"
          >
            <IfCondition
              condition={!!getDetail.data?.user}
              whenTrue={
                <ProDescriptions dataSource={getDetail.data} column={2}>
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
                  customerCompanyId={getDetail.data?.id ?? 0}
                  onCancel={() => {}}
                  onFinish={reload}
                />
              }
            />
          </Card>
          <Card
            type="inner"
            title={
              <div className="flex justify-between">
                {getDetail.data?.ledger
                  ? "Харилцагч компанийн данс"
                  : "Харилцагч компанийн данс байхгүй байна"}
                <Button type="link" size="small" className="text-gray-500" onClick={() => setIsEditLedger(true)}>
                  <Edit01 />
                </Button>
              </div>
            }
            className="mb-4"
          >
            <IfCondition
              condition={!!getDetail.data?.ledger}
              whenTrue={
                <ProDescriptions dataSource={getDetail.data} column={2}>
                  <ProDescriptions.Item
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
                  customerCompanyId={getDetail.data.id ?? 0}
                  onCancel={onCancel}
                  onFinish={reload}
                />
              }
            />
          </Card>
        </div>
      </Modal>

      <UpdateUser
        open={isEditUser}
        detail={getDetail.data?.user}
        onCancel={() => setIsEditUser(false)}
        onFinish={() => {
          setIsEditUser(false);
          reload();
        }}
      />
      <UpdateCustomerCompany
        open={isEdit}
        detail={getDetail.data}
        onCancel={() => setIsEdit(false)}
        onFinish={() => {
          setIsEdit(false);
          reload();
        }}
      />
      <UpdateLedger
        open={isEditLedger}
        detail={getDetail.data?.ledger}
        onCancel={() => setIsEditLedger(false)}
        onFinish={() => {
          setIsEditLedger(false);
          reload();
        }}
      />
    </>
  );
};

export default CustomerCompanyView;
