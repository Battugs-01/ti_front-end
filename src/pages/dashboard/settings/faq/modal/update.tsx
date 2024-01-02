import { ProForm, ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { Form } from "antd";
import BraftEditor from "braft-editor";
import TextEditorForm from "components/form_braft";
import { IModalForm } from "components/modal";
import { LANGUAGES } from "config";
import { useAuthContext } from "context/auth";
import { FC, useEffect, useState } from "react";
import settings, { keys } from "service/settings";
import { FaqModel } from "service/settings/types";
import { ActionComponentProps } from "types";

export const UpdateFAQModal: FC<{ type: string } & ActionComponentProps<FaqModel>> = ({
  open,
  onCancel,
  detail,
  onFinish,
  details,
  type
}) => {
  const [form] = Form.useForm();
  const [body, setBody] = useState<any>();
  const [{ user }] = useAuthContext();

  useEffect(() => {
    if (detail) {
      form.resetFields();
      form.setFieldsValue(detail);
      setBody(BraftEditor.createEditorState(detail.content));
    }
  }, [detail]);


  return (
    <>
      <IModalForm
        onSuccess={onFinish}
        onRequest={async (values) => {
          const newDetails = details?.filter((x) => x.id !== detail?.id);
          values.id = detail?.id;
          values.updated_user_id = user?.id || "";
          values.updated_at = new Date().toISOString();
          return settings.set<FaqModel[]>(type, [
            ...(newDetails || []),
            values,
          ]);
        }}
        open={open}
        title="Update FAQ"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
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
                value={body}
                setValue={(e) => {
                  form.setFieldValue("content", e.toHTML());
                  setBody(e);
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

