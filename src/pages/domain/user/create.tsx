import { ModalForm, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, Row } from "antd";
import { UserRoleType } from "config";
import user from "service/user/user";

interface Props {
  customerCompanyId?: number;
  onCancel: () => void;
  onFinish: () => void;
}

const CreateUser = ({ customerCompanyId, onCancel, onFinish }: Props) => {
  const createUser = useRequest(user.create, {
    manual: true,
    onSuccess: () => {
      onFinish();
    },
  });

  return (
    <ModalForm
      trigger={<Button type="primary" >Нэвтрэх бүртгэл үүсгэх</Button>}
      onFinish={async (values) => {
        if (customerCompanyId) {
          values.role_name = UserRoleType.customer;
          values.customer_company_id = customerCompanyId;
        }
        await createUser.runAsync(values);
        onFinish();
      }}
      title="Нэвтрэх бүртгэл үүсгэх"
    >
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormText
            name={"email"}
            placeholder={"sample@example.cг"}
            label="Цахим шуудан"
            rules={[
              {
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Энэ талбар и-мэйл хаяг байх ёстой",
              },
            ]}
          />
        </Col>

        <Col span={12}>
          <ProFormText
            name={"phone"}
            placeholder={"099999999"}
            rules={[
              {
                pattern: /^[0-9]+$/,
                message: "Утасны дугаараа оруулна уу",
              },
            ]}
            label="Утас"
          />
        </Col>
        <Col span={24}>
          <ProFormText.Password
            // rules={FORM_ITEM_RULE()}
            name={"password"}
            placeholder={"Нууц үг"}
            label="Нууц үг"
            fieldProps={{
              type: "password",
            }}
          />
        </Col>
        {/* )} */}
      </Row>
    </ModalForm>
  );
};

export default CreateUser;
