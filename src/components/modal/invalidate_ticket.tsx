import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { useEffect, useRef } from "react";
import fieldRegistration from "service/feild_registration";
import invalidatingAdditionalFee from "service/fininaciar/cancellingText";
import { Trash01 } from "untitledui-js-base";

interface InvalidateModalProps {
  title: string;
  remove: boolean;
  onCancel: () => void;
  onDone: () => void;
  open: boolean;
  id: number;
}

export const InvalidateModal = ({
  onCancel,
  open,
  onDone,
  title,
  remove,
  id,
  ...rest
}: InvalidateModalProps) => {
  const formRef = useRef<ProFormInstance>();
  // create eldev huraamjiin huselt tsutslah deer nam=
  const submit = useRequest(invalidatingAdditionalFee.create, {
    manual: true,
    onSuccess: () => {
      onDone && onDone();
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const getTempAdditionalFee = useRequest(
    fieldRegistration.getTempAdditionalFee,
    {
      manual: true,
    }
  );

  useEffect(() => {
    if (id) {
      getTempAdditionalFee.run(id);
    }
  }, [id]);
  return (
    <ModalForm
      {...rest}
      modalProps={{
        destroyOnClose: true,
        onCancel,
        styles: {
          header: {
            padding: "1.2rem",
            borderBottom: "1px solid #EAECF0",
          },
          content: {
            padding: "0",
          },
          body: {
            padding: "1.2rem 1.2rem 0 1.2rem",
          },
          footer: {
            padding: "0 1.2rem 1.2rem 1.2rem",
          },
        },
      }}
      className="p-5"
      width={400}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={open}
      submitter={{
        render: ({ submit }) => {
          return (
            <div className="flex  justify-between  w-full px-6  pb-6">
              <Button
                size="large"
                className="w-1/2 text-sm"
                onClick={() => onCancel && onCancel()}
              >
                Болих
              </Button>
              <Button
                size="large"
                className="w-1/2  bg-error-600 text-sm"
                type="primary"
                onClick={submit}
              >
                Илгээх
              </Button>
            </div>
          );
        },
      }}
      onFinish={async () => {
        if (
          await submit.runAsync({
            ticket_id: getTempAdditionalFee.data?.id,
          })
        ) {
          return true;
        }
        return false;
      }}
    >
      <div className="space-y-2 text-lg font-semibold text-gray-900  mb-2">
        <Trash01 className="text-error-600 w-5" />
        <div className="text-xl font-medium text-gray-900">{title}</div>
        <div className="text-gray-600 text-sm">
          Та уг хүсэлтүүдийг зөвшөөрч устгахдаа итгэлтэй байна уу?
        </div>
      </div>
    </ModalForm>
  );
};
