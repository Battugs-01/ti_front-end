import {
  ModalForm,
  ModalFormProps,
  ProFormInstance,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import { SectionContainer } from "components/index";
import { useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import orphanElderly from "service/social-worker/customer";
// import requested from "service/requested";
import { ElderlyInterface } from "service/social-worker/customer/type";

type PropsCancel = ModalFormProps & {
  onCancel: () => void;
  data?: ElderlyInterface;
  onFinish?: () => void;
};

export const CancelModal = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsCancel) => {
  const formRef = useRef<ProFormInstance>();

  const cancelRequest = useRequest(orphanElderly?.distribute, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай",
      }),
        onFinish && onFinish();
    },

    onError: (err) => {
      notification.error({
        message: err.message,
      }),
        onFinish && onFinish();
    },
  });
  return (
    <ModalForm
      {...rest}
      modalProps={{
        onCancel,
        className: "rounded ",
      }}
      title={<div className="p-6">Буцаах шалтгаан</div>}
      labelAlign="left"
      layout="vertical"
      width={775}
      onOpenChange={() => formRef.current?.resetFields()}
      formRef={formRef}
      open={!!data}
      submitter={{
        render: ({ submit: cancelRequest }) => {
          return (
            <div className="flex justify-end w-full rounded-xl p-6">
              <Button
                size="large"
                className="text-sm  items-center"
                onClick={() => onCancel && onCancel()}
              >
                <FaArrowLeft
                  accentHeight={11.67}
                  color="#344054"
                  size={12}
                  className="mx-2"
                />
                Буцах
              </Button>
              <Button
                size="large"
                className="bg-error-400 text-sm flex items-center justify-center"
                type="primary"
                onClick={cancelRequest}
              >
                <IoMdClose
                  accentHeight={11.67}
                  color="#fff"
                  size={13}
                  className="mx-2"
                />
                Татгалзах
              </Button>
            </div>
          );
        },
      }}
      onFinish={async (values) => {
        console.log("values", values);
        if (
          !!data &&
          (await cancelRequest.runAsync({ ...values, status: 9 }, data?.id))
        ) {
          return true;
        }
        return false;
      }}
    >
      <div className="px-5 pt-4">
        <ProFormTextArea
          name="description"
          placeholder="Шалтгаан дэлгэрэнгүй"
        />
      </div>
    </ModalForm>
  );
};
