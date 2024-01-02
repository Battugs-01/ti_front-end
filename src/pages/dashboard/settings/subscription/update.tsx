import { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Form } from "antd";
import { IModalForm } from "components/modal";
import { useAuthContext } from "context/auth";
import { FC, useEffect } from "react";
import settings, { keys } from "service/settings";
import { SubscriptionModel } from "service/settings/types";
import { ActionComponentProps } from "types";
import { SubscriptionTypes } from "utils/constants";

const Update: FC<ActionComponentProps<SubscriptionModel>> = ({
  open,
  onCancel,
  detail,
  onFinish,
  details,
}) => {
  const [form] = Form.useForm();
  const [{ user }] = useAuthContext();

  useEffect(() => {
    if (detail) {
      form.setFieldsValue(detail);
    }
  }, [detail]);

  const notSelectedNames = SubscriptionTypes.filter((e) => {
    const found = details?.find((x) => x.name === e.value);
    return !found;
  });

  const selected = SubscriptionTypes.find((e) => e.value === detail?.name);

  return (
    <>
      <IModalForm
        open={open}
        title="Update Subscription"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.updated_at = new Date().toISOString();
          values.created_user_id = user?.id;
          values.created_at = detail?.created_at || new Date().toISOString();
          const newList = details?.filter((x) => x.id !== detail?.id) || [];
          values.id = detail?.id || Date.now();

          return settings.set(keys.subscription, [...newList, values]);
        }}
        onSuccess={onFinish}
      >
        <ProFormSelect
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name",
            },
          ]}
          placeholder={"Select Name"}
          options={[...notSelectedNames, selected] as any}
        />
        <ProFormDigit
          label="Price"
          name="price"
          placeholder="Enter Price"
          rules={[
            {
              required: true,
              message: "Please enter price",
            },
          ]}
          fieldProps={{
            formatter: (value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          }}
        />
        <ProFormText
          name="description"
          label="Description"
          placeholder="Enter Description"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        />
      </IModalForm>
    </>
  );
};

export default Update;
