import ProForm, {
  DrawerForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { agencyArray, FORM_ITEM_RULE, workersGenderArray } from "config";
import dayjs from "dayjs";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import file from "service/file";
import permission from "service/settings/permission";
import { CreatePermissionType } from "service/type";
import { ActionComponentProps } from "types";
import { Save02 } from "untitledui-js-base";

export const UpdatePermission: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const update = useRequest(permission.edit, {
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
  const uploadProfile = useRequest(file.upload, {
    manual: true,
  });

  useEffect(() => {
    if (detail) {
      district.run(detail?.address?.city_id);
      khoroo.run(detail?.address?.district_id);
    }
  }, [detail]);
  const intl = useIntl();
  return (
    <DrawerForm<CreatePermissionType>
      className="custom-ant-drawer-body"
      onFinish={async (values) => {
        const file = await uploadProfile.runAsync({
          file: values?.profile[0]?.originFileObj,
        });
        await update.runAsync(detail.id, {
          ...values,
          address: {
            ...values.address,
          },

          profile_id: file[0]?.id,
          birth_date: dayjs(values?.birth_date).toDate(),
        });

        onFinish?.();
      }}
      initialValues={{
        first_name: detail?.first_name,
        last_name: detail?.last_name,
        agency_id: detail?.agency_id,
        birth_date: detail?.birth_date
          ? dayjs(detail?.birth_date).format("YYYY-MM-DD")
          : undefined,
        address: {
          city_id: detail?.address?.city_id,
          district_id: detail?.address?.district_id,
          khoroo_id: detail?.address?.khoroo_id,
          desc: detail?.address?.desc,
        },
        gender: detail?.gender,
        phone: detail?.phone,
        email: detail?.email,
        permission: detail?.permission,
        profile: [
          {
            uid: detail?.profile?.id,
            name: detail?.profile?.file_name,
            status: "done",
            url: file.fileToUrl(detail?.profile?.physical_path || ""),
          },
        ],
      }}
      title={intl.formatMessage({ id: "member_drawer_title_update" })}
      open={open}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
              <Button onClick={onCancel} size="large" type="default">
                <FormattedMessage id="cancel" />
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                icon={<Save02 />}
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      drawerProps={{
        onClose: onCancel,
        width: 500,
        styles: { body: { background: "#F5F8F8" } },
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <div className="text-base font-semibold">
                <FormattedMessage id="create_member_title" />
              </div>
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <ProFormText
                        name="first_name"
                        label={intl.formatMessage({ id: "first_name" })}
                      />
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <ProFormText
                        name="last_name"
                        label={intl.formatMessage({ id: "last_name" })}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <ProFormUploadButton
                    title={
                      <div className="flex items-center flex-col justify-center gap-2 text-[#00000073]">
                        <div className="text-xs ">Click to upload</div>
                      </div>
                    }
                    label={intl.formatMessage({ id: "upload_picture" })}
                    max={1}
                    rules={[
                      {
                        validator: (_, file) => {
                          if (file && file.length > 0) {
                            if (
                              file[0].type === "image/jpeg" ||
                              file[0].type === "image/png"
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "Зөвхөн JPG, PNG файлыг оруулах боломжтой"
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                      ...FORM_ITEM_RULE(),
                    ]}
                    name="profile"
                    fieldProps={{
                      name: "file",
                      listType: "picture-card",
                      beforeUpload: () => {
                        return false;
                      },
                    }}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    extra={intl.formatMessage({ id: "agency_extra" })}
                    name="agency_id"
                    options={agencyArray.map((el) => ({ ...el }))}
                    label={intl.formatMessage({ id: "agency" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    name="birth_date"
                    label={intl.formatMessage({ id: "date_of_birth" })}
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="gender"
                    options={workersGenderArray.map((el) => ({ ...el }))}
                    label={intl.formatMessage({ id: "gender" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    name="phone"
                    label={intl.formatMessage({ id: "phone" })}
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="email"
                    label={intl.formatMessage({ id: "email" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={8} xs={21}>
                  <ProFormSelect
                    name={["address", "city_id"]}
                    placeholder="Сонгох"
                    label={"Аймаг/Нийслэл"}
                    onChange={(val) => {
                      form?.setFieldValue(
                        ["address", "district_id"],
                        undefined
                      );
                      form?.setFieldValue(["address", "khoroo_id"], undefined);
                      district.run(val);
                    }}
                    fieldProps={{
                      showSearch: true,
                      loading: city?.loading,
                    }}
                    options={city.data?.map((el) => ({
                      value: el.id,
                      label: el.name,
                    }))}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col sm={8} xs={21}>
                  <ProFormSelect
                    name={["address", "district_id"]}
                    placeholder="Сонгох"
                    label={"Сум/Дүүрэг"}
                    onChange={(value) => {
                      form?.setFieldValue(["address", "khoroo_id"], undefined);
                      khoroo.run(value);
                    }}
                    fieldProps={{
                      showSearch: true,
                      loading: district?.loading,
                    }}
                    options={district.data?.map((item: any) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col sm={8} xs={21}>
                  <ProFormSelect
                    name={["address", "khoroo_id"]}
                    placeholder="Сонгох"
                    label={"Баг/Хороо"}
                    fieldProps={{
                      showSearch: true,
                      loading: khoroo?.loading,
                    }}
                    options={khoroo?.data?.map((item: any) => {
                      return {
                        label: item?.name,
                        value: item?.id,
                      };
                    })}
                    // rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    name={["address", "desc"]}
                    label={intl.formatMessage({ id: "address" })}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name="permission"
                    label={intl.formatMessage({ id: "permission" })}
                  />
                </Col>
              </Row>
            </>
          );
        }}
      </ProForm.Item>
    </DrawerForm>
  );
};
