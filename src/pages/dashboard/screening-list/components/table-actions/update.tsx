import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormDatePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";

type PropsUpdate = ModalFormProps & {
  onCancel: () => void;
  data: ScreeningListType;
  onFinish?: () => void;
};
export const EditScreenList = ({
  onCancel,
  data,
  onFinish,
  ...rest
}: PropsUpdate) => {
  const formRef = useRef<ProFormInstance>();
  const editScreen = useRequest(screenList.edit, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Success",
      });
      onFinish?.();
    },
    onError: (e) => {
      notification.error({
        message: e.message,
      });
      onCancel();
    },
  });
  const intl = useIntl();
  const city = useRequest(address.city, {});

  const district = useRequest(address.district, {
    manual: true,
  });

  const khoroo = useRequest(address.khoroo, {
    manual: true,
  });
  useEffect(() => {
    if (data) {
      district.run(data?.address?.city_id);
      khoroo.run(data?.address?.district_id);
    }
  }, [data]);

  console.log(data, "data");
  return (
    <ModalForm
      {...rest}
      formRef={formRef}
      initialValues={{
        ...data,
        address: {
          city_id: data?.address?.city_id,
          district_id: data?.address?.district_id,
          khoroo_id: data?.address?.khoroo_id,
          desc: data?.address?.desc,
        },
        assessment_date: dayjs(data?.assessment?.date).toDate(),
      }}
      onFinish={async (values) => {
        await editScreen.runAsync(data?.id || 0, values);
      }}
      title={intl.formatMessage({ id: "update" })}
      open={!!data}
      onOpenChange={() => {
        formRef?.current?.resetFields();
      }}
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-4">
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
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                className="flex items-center"
              >
                <FormattedMessage id="save" />
              </Button>
            </div>
          );
        },
      }}
      modalProps={{
        destroyOnClose: true,
        width: "650px",
        onCancel: () => {
          onCancel?.();
          formRef?.current?.resetFields();
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
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "name" })}
                    name="first_name"
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "name" })}
                      </div>
                    }
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name="birth_date"
                    initialValue={dayjs().endOf("day")}
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "date_of_birth" })}
                      </div>
                    }
                  />
                </Col>
                {/* <Col span={12}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "gender" })}
                    name="gender"
                    initialValue={workersGenderArray[0]}
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "gender" })}
                      </div>
                    }
                    options={workersGenderArray.map((el) => ({ ...el }))}
                  />
                </Col> */}
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "register_no" })}
                    name="rd"
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "register_no" })}
                      </div>
                    }
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "phone" })}
                    name="phone"
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "phone" })}
                      </div>
                    }
                  />
                </Col>
              </Row>

              {/* <ProFormTextArea
                name="address"
                placeholder="Оршин суугаа хаяг"
                label={
                  <div className="text-gray-700 font-medium">
                    <FormattedMessage id="address" />
                  </div>
                }
              /> */}

              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "city_id"]}
                    placeholder={"Аймаг/Нийслэл"}
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
                      size: "large",
                    }}
                    options={city.data?.map((el) => ({
                      value: el.id,
                      label: el.name,
                    }))}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "district_id"]}
                    placeholder={"Сум/Дүүрэг"}
                    label={"Сум/Дүүрэг"}
                    onChange={(value) => {
                      form?.setFieldValue(["address", "khoroo_id"], undefined);
                      khoroo.run(value);
                    }}
                    fieldProps={{
                      showSearch: true,
                      loading: district?.loading,
                      size: "large",
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
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "khoroo_id"]}
                    placeholder={"Баг/Хороо"}
                    label={"Баг/Хороо"}
                    fieldProps={{
                      showSearch: true,
                      loading: khoroo?.loading,
                      size: "large",
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
                <Col sm={12} xs={21}>
                  <ProFormText
                    name={["address", "desc"]}
                    label={intl.formatMessage({ id: "address" })}
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "address" })}
                  />
                </Col>
              </Row>
              <div className="text-[#000000] text-base font-medium mb-5">
                <FormattedMessage id="caregiver_info_title" />
              </div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    name={["caregiver", "is_cohabitant"]}
                    layout="vertical"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "senior_living_question" })}
                      </div>
                    }
                    placeholder={intl.formatMessage({
                      id: "senior_living_question",
                    })}
                    fieldProps={{
                      size: "large",
                    }}
                    options={[
                      {
                        label: intl.formatMessage({ id: "yes" }),
                        value: true,
                      },
                      {
                        label: intl.formatMessage({ id: "no" }),
                        value: false,
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    name={["caregiver", "is_with_someone"]}
                    layout="vertical"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({
                          id: "caregiver_living_question",
                        })}
                      </div>
                    }
                    placeholder={intl.formatMessage({ id: "select" })}
                    fieldProps={{
                      size: "large",
                    }}
                    options={[
                      {
                        label: intl.formatMessage({ id: "yes" }),
                        value: true,
                      },
                      {
                        label: intl.formatMessage({ id: "no" }),
                        value: false,
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    name={["caregiver", "who_is"]}
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "placeholder_text" })}
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "relationship" })}
                      </div>
                    }
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name={["caregiver", "phone"]}
                    fieldProps={{
                      size: "large",
                    }}
                    placeholder={intl.formatMessage({ id: "placeholder_text" })}
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "phone" })}
                      </div>
                    }
                  />
                </Col>
              </Row>
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
