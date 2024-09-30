import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormDatePicker,
  ProFormInstance,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, Divider, notification, Row } from "antd";
import { agencyArray, FORM_ITEM_RULE, workersGenderArray } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import address from "service/address";
import screenList from "service/screening_list";
import { ScreeningListType } from "service/screening_list/type";
import { ActionComponentProps } from "types";
import { Save02 } from "untitledui-js-base";

export const EditScreenList: React.FC<
  ActionComponentProps<ScreeningListType>
> = ({ onCancel, onFinish, open, detail }) => {
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
    if (detail) {
      district.run(detail?.address?.city_id);
      khoroo.run(detail?.address?.district_id);
    }
  }, [detail]);
  return (
    <ModalForm
      formRef={formRef}
      initialValues={{
        ...detail,
        address: {
          city_id: detail?.address?.city_id,
          district_id: detail?.address?.district_id,
          khoroo_id: detail?.address?.khoroo_id,
          desc: detail?.address?.desc,
        },
        assessment_date: dayjs(detail?.assessment?.date).toDate(),
      }}
      onFinish={async (values) => {
        await editScreen.runAsync(detail?.id || 0, values);
        console.log(values, "Form Values:");
      }}
      title={intl.formatMessage({ id: "edit_entry" })}
      open={open}
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
                    name="birth_date"
                    initialValue={dayjs().endOf("day")}
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "date_of_birth" })}
                      </div>
                    }
                  />
                </Col>
                <Col span={12}>
                  <ProFormSelect
                    name="gender"
                    initialValue={workersGenderArray[0]}
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "gender" })}
                      </div>
                    }
                    options={workersGenderArray.map((el) => ({ ...el }))}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
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
                    name="phone"
                    label={
                      <div className="text-gray-700 font-medium ">
                        {intl.formatMessage({ id: "phone" })}
                      </div>
                    }
                  />
                </Col>
              </Row>

              <ProFormTextArea
                name="address"
                placeholder="Оршин суугаа хаяг"
                label={
                  <div className="text-gray-700 font-medium">
                    <FormattedMessage id="address" />
                  </div>
                }
              />

              {/* <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "city_id"]}
                    placeholder={intl.formatMessage({ id: "select" })}
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
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "district_id"]}
                    placeholder={intl.formatMessage({ id: "select" })}
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
              </Row>
              <Row gutter={[16, 16]}>
                <Col sm={12} xs={21}>
                  <ProFormSelect
                    name={["address", "khoroo_id"]}
                    placeholder={intl.formatMessage({ id: "select" })}
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
                <Col sm={12} xs={21}>
                  <ProFormText
                    name={["address", "desc"]}
                    label={intl.formatMessage({ id: "address" })}
                  />
                </Col>
              </Row> */}
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name="person_in_charge"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "person_in_charge" })}
                      </div>
                    }
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormSelect
                    name="agency_id"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "agency" })}
                      </div>
                    }
                    options={agencyArray.map((el) => ({ ...el }))}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormDatePicker
                    name="assessment_date"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "assessment_date" })}
                      </div>
                    }
                  />
                </Col>
              </Row>
              <div className="text-[#000000] text-base font-medium mb-5">
                <FormattedMessage id="caregiver_info_title" />
              </div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    name="senior_living"
                    layout="vertical"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "senior_living_question" })}
                      </div>
                    }
                    options={[
                      {
                        label: intl.formatMessage({ id: "yes" }),
                        value: "yes",
                      },
                      {
                        label: intl.formatMessage({ id: "no" }),
                        value: "no",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <ProFormRadio.Group
                    name="caregiver_living"
                    layout="vertical"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({
                          id: "caregiver_living_question",
                        })}
                      </div>
                    }
                    options={[
                      {
                        label: intl.formatMessage({ id: "yes" }),
                        value: "yes",
                      },
                      {
                        label: intl.formatMessage({ id: "no" }),
                        value: "no",
                      },
                    ]}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormText
                    name="relationship"
                    label={
                      <div className="text-gray-700 font-medium">
                        {intl.formatMessage({ id: "relationship" })}
                      </div>
                    }
                  />
                </Col>
                <Col span={12}>
                  <ProFormText
                    name="caregiver_phone"
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