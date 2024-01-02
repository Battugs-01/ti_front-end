import { ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Form } from "antd";
import TextEditorForm from "components/form_braft";
import { IModalForm } from "components/modal";
import { LANGUAGES } from "config";
import { useAuthContext } from "context/auth";
import { FC } from "react";
import settings, { keys } from "service/settings";
import { FaqModel } from "service/settings/types";
import { ActionComponentProps } from "types";

export const CreateFAQModal: FC<{ type: string } & ActionComponentProps<FaqModel>> = ({
  onFinish,
  open,
  onCancel,
  details,
  type,
}) => {
  const [form] = Form.useForm();
  const [{ user }] = useAuthContext();

  return (
    <>
      <IModalForm
        open={open}
        onSuccess={onFinish}
        title="Create FAQ"
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.updated_at = new Date().toISOString();
          values.created_at = new Date().toISOString();
          values.created_user_id = user?.id || "";
          values.updated_user_id = user?.id || "";
          values.id = Date.now();
          return settings.set<FaqModel[]>(type, [
            ...(details || []),
            values,
          ]);
        }}
      >
        <ProFormText
          name="title"
          label="Question"
          placeholder="Enter Question"
          rules={[
            {
              required: true,
              message: "Please enter question",
            },
          ]}
        />
        {
          type === keys.faqCustomer &&
          <ProFormSelect
            name="language"
            label="Language"
            rules={[
              {
                required: true,
                message: "Please enter answer",
              },
            ]}
            options={LANGUAGES.map((el) => ({ ...el }))}
          />
        }


        <ProForm.Item
          noStyle
          shouldUpdate={(a, b) => a.language !== b.language}
        >
          {(form) => {
            return <ProForm.Item name="content"
              label="Answer"
              rules={[
                {
                  required: true,
                  message: "Please enter answer",
                },
              ]}> <TextEditorForm
                value={form.getFieldValue("content")}
                setValue={(e) => {
                  form.setFieldValue("content", e.toHTML());
                }}
                language={type === keys.faqCustomer ? form.getFieldValue("language") : "en"}
              />
            </ProForm.Item>
          }}


        </ProForm.Item>
      </IModalForm>
    </>
  );
};


