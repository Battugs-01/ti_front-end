import { useRequest } from "ahooks";
import { Form, UploadFile, notification } from "antd";
import { SectionContainer, UploadDraggerButton } from "components/index";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES, FieldRequireMessage } from "config";
import { FC } from "react";
import file from "service/file";
import settings, { keys } from "service/settings";
import { ActionComponentProps } from "types";

const Create: FC<ActionComponentProps<string>> = ({
  onFinish,
  open,
  onCancel,
  details,
}) => {
  const [form] = Form.useForm();
  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <>
      <IModalForm
        open={open}
        onSuccess={onFinish}
        title="Create Avatar"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          const avatarsBefore = details?.map((item) => item) || [];
          if (!values.avatars?.length)
            return settings.set(keys.avatars, [...avatarsBefore]);
          const newAvatars = await await uploadMulti
            .runAsync({
              names: values.avatars?.map((el: UploadFile) => el?.name),
              files: values.avatars,
              bucket_name: BUCKET_NAMES.avatars,
            })
            .then((el) => el.map((el) => el.path));
          return settings.set(keys.avatars, [...avatarsBefore, ...newAvatars]);
        }}
      >
        <SectionContainer label="Add avatar(s)">
          <UploadDraggerButton
            name={"avatars"}
            validator={async (value) => {
              if (!value) return Promise.reject(FieldRequireMessage);
              return Promise.resolve(value);
            }}
            required={false}
          />
        </SectionContainer>
      </IModalForm>
    </>
  );
};

export default Create;
