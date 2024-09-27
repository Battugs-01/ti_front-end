import { ModalForm, ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, notification } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import agencyList from "service/settings/agency_list";
import { AgencyListType } from "service/settings/agency_list/type";
import { ActionComponentProps } from "types";
import { Form } from "./form";
import file from "service/file";

export const UpdateAgency: React.FC<ActionComponentProps<AgencyListType>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const formRef = useRef<ProFormInstance>();
  const createPermission = useRequest(agencyList.edit, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: intl.formatMessage({ id: "success" }),
      });
      onCancel();
    },
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const city = useRequest(address.city, {});

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });

  useEffect(() => {
    if (detail) {
      district.run(detail?.address?.city_id);
      khoroo.run(detail?.address?.district_id);
    }
  }, [detail]);
  const intl = useIntl();
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });
  const newFileUpload = async (files: any[]) => {
    if (!files[0]?.uid.includes("rc-upload")) {
      return files[0]?.id;
    }
    const file = await uploadProfile.runAsync({
      file: files[0].originFileObj,
    });
    return file[0].id;
  };
  return (
    <ModalForm
      formRef={formRef}
      onFinish={async (values) => {
        const id = await newFileUpload(values?.profile);
        await createPermission.runAsync(
          {
            ...values,
            establishment_year: dayjs(values?.establishment_year).year(),
            profile_id: id,
          },
          detail?.id
        );
        onFinish?.();
      }}
      title={intl.formatMessage({ id: "update_agency" })}
      open={open}
      initialValues={{
        ...detail,
        establishment_year: dayjs(detail?.date_establishment),
        profile: [
          {
            uid: detail?.profile?.id,
            name: detail?.profile?.file_name,
            status: "done",
            url: detail?.profile?.physical_path,
          },
        ],
      }}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel: () => {
          console.log("open change", formRef);
          formRef?.current?.resetFields();
          onCancel?.();
        },
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
      onOpenChange={() => {
        formRef?.current?.resetFields();
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  onCancel?.();
                  formRef?.current?.resetFields();
                }}
                size="large"
                type="default"
              >
                <FormattedMessage id="cancel" />
              </Button>
              <Button onClick={props.submit} size="large" type="primary">
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
    >
      <Form city={city} district={district} khoroo={khoroo} />
    </ModalForm>
  );
};
