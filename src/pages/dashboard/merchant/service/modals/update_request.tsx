import { CloseOutlined } from "@ant-design/icons";
import { ModalForm, ModalFormProps } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { ServiceDetail } from "./detail_part";
import { Settings } from "./parts/settings";
import { ServiceTab } from "./parts/tab";

type Props = ModalFormProps & {
  onRequest?: (body?: any) => Promise<any>;
  onSuccess?: () => void;
  children?: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  tab?: string;
  setTab?: (value: string) => void;
};

export const UpdateServiceRequest = ({
  onCancel,
  detail,
  open,
  onFinish,
}: ActionComponentProps<MerchantService>) => {
  const [tab, setTab] = useState("company" as any);
  return (
    <CustomModalForm
      title="Details"
      open={open}

      initialValues={{
        ...detail,
      }}
      modalProps={{
        onCancel,
      }}
      onSuccess={onFinish}
      onRequest={async (values) => {
        values.commission_start_date = dayjs(values.commission_start_date);
        if (values.commission_start_date) {
          values.commission_start_date = dayjs(values.commission_start_date);
        }
        if (values.commission_end_date) {
          values.commission_end_date = dayjs(values.commission_end_date);
        }
        return merchantService.update(detail?.id as any, {
          ...detail,
          ...values,
        });
      }}
      tab={tab}
      setTab={setTab}
    >
      <ServiceTab
        companyItems={<ServiceDetail detail={detail} />}
        settingsItems={<Settings detail={detail} />}
        tab={tab}
        setTab={setTab}
      />
    </CustomModalForm>
  );
};

const CustomModalForm = ({
  onRequest,
  onSuccess: onDone,
  title,
  footer,
  tab,
  setTab,
  ...rest
}: Props) => {
  const submit = useRequest(async (values) => onRequest && onRequest(values), {
    manual: true,
    onSuccess: () => {
      onDone && onDone();
      notification.success({
        message: "Successfully",
      });
    },
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <ModalForm
      {...rest}
      style={{
        borderRadius: '45px',
      }}
      onFinishFailed={(err) => {
        const errorField = Object.keys(err.errorFields[0])[0];
        rest.formRef?.current?.scrollToField(errorField, {
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        notification.info({ message: "Please, fill the require fields." });
      }}
      children={<div className="px-7">{rest.children}</div>}
      title={
        <div className="flex items-center justify-between px-6 py-4">
          <div className="text-base text-gray-800 font-semibold">{title}</div>
          <Button
            type="ghost"
            onClick={() =>
              rest.modalProps?.onCancel && rest.modalProps.onCancel(null as any)
            }
            icon={<CloseOutlined className="text-gray-500" size={12} />}
          />
        </div>
      }
      layout="horizontal"
      className="p-7 pt-4"
      labelCol={{
        span: 12,
      }}
      labelAlign="left"
      colProps={{
        span: 12,
      }}
      modalProps={{
        ...rest.modalProps,
        closable: false,
      }}
      submitter={{
        render: ({ submit }) => {
          return (
            (rest.submitter || rest.submitter === undefined) && (
              <div className="flex items-center justify-between w-full px-5 border-t border-solid border-b-0 border-l-0 border-r-0 border-gray-300 pt-5">
                <div className="w-full flex">{footer}</div>
                <div className="flex items-center gap-1">
                  <Button
                    onClick={() =>
                      rest.modalProps?.onCancel &&
                      rest.modalProps?.onCancel(null as any)
                    }
                  >
                    Cancel
                  </Button>
                  <Button type="primary" onClick={submit}>
                    {
                      tab === "company" ? 'Continue' : 'Save'
                    }

                  </Button>
                </div>
              </div>
            )
          );
        },
      }}
      onFinish={async (values) => {
        if (tab === "settings") {
          if (await submit.runAsync(values)) {
            return true;
          }
        }
        setTab?.("settings");

        return false;
      }}
    />
  );
};
