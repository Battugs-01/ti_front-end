import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { ActionType, EditableProTable } from "@ant-design/pro-table";
import { useRequest } from "ahooks";
import { Button, Col, Form, notification, Row } from "antd";
import IBadge from "components/badge";
import { ITable } from "components/index";
import { FORM_ITEM_RULE } from "config";
import dayjs from "dayjs";
import { values } from "lodash";
import moment from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import additionalFeeCategory from "service/additional_fee_record";
import fieldRegistration from "service/feild_registration";
import additionalFeeDebit from "service/feild_registration/additionalFeeDebit";
import { TicketAdditionalFeeType } from "service/feild_registration/type";
import ledger from "service/fininaciar/accountSettlement/ledger";
import addinitionalFeeSettings from "service/fininaciar/additionalFeeSettings";
import { AdditionalFeeType } from "service/fininaciar/additionalFeeSettings/type";
import { ActionComponentProps } from "types";
import { Edit01 } from "untitledui-js-base";
import { moneyFormat } from "utils/index";
import { PaymentMethod } from "utils/options";
import { downloadPDF, generatePDF } from "utils/pdf_generate";

export const AssignationCreate: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const [additionalFee, setAdditionalFee] = useState<AdditionalFeeType[]>([]);
  const [paymentList, setPaymentList] = useState<any[]>([]);
  const actionRef = useRef<ActionType>();
  const [dates, setDates] = useState({
    opened: 0,
    freed: 0,
    left_site: 0,
    returned: 0,
    shipped: 0,
  });
  const [ticketAdditional, setTicketAdditional] =
    useState<TicketAdditionalFeeType>();
  const updateArrivalField = useRequest(fieldRegistration.updateRegistration, {
    manual: true,
    onError: (error: any) => {
      notification.error({
        message: error.message,
      });
      onCancel?.();
    },
  });

  const categoryList = useRequest(additionalFeeCategory.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const additionalFeeByCategory = useRequest(
    addinitionalFeeSettings.byCategory,
    {
      manual: true,
      onError: (error) => {
        notification.error({
          message: error.message,
        });
      },
    }
  );

  const ticketAdditionalFee = useRequest(
    fieldRegistration.ticketAdditionalFee,
    {
      manual: true,
      onError: (error) => {
        notification.error({
          message: error.message,
        });
      },
    }
  );

  const getTempAdditionalFee = useRequest(
    fieldRegistration.getTempAdditionalFee,
    {
      manual: true,
    }
  );

  const bankList = useRequest(ledger.list, {
    manual: true,
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const addAdditionalFeeDebit = useRequest(additionalFeeDebit.create, {
    manual: true,
    onSuccess: () => {
      onFinish?.();
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
    },
    onError: (error) => {
      notification.error({
        message: error.message,
      });
    },
  });

  const [form] = Form.useForm();

  useEffect(() => {
    const fetch = async () => {
      const res = await getTempAdditionalFee.runAsync(detail?.id);
      form.setFieldsValue({
        ...res,
      });
      setAdditionalFee(
        res?.additional_fee_ticket_calculated?.map((values) => {
          return {
            ...values.additional_fee,
            number_1: values.number_1,
            number_2: values.number_2,
            total_amount: values.total_amount,
          };
        }) || []
      );
    };
    fetch();
  }, [detail?.id]);

  const totalAmount = useMemo(() => {
    return additionalFee.reduce((acc, curr) => acc + curr.total_amount, 0);
  }, [additionalFee]);
  return (
    <ModalForm
      form={form}
      onFinish={async (values) => {
        await updateArrivalField.runAsync(
          {
            ...values,
            opened_at: moment(values.opened_at).toDate(),
            freed_at: moment(values.freed_at).toDate(),
            left_site_at: moment(values.left_site_at).toDate(),
            returned_at: moment(values.returned_at).toDate(),
            shipped_at: moment(values.shipped_at).toDate(),
          },
          detail?.id
        );
        await addAdditionalFeeDebit.runAsync({
          ...values,
          date: moment(values.date).toDate(),
          ticket_id: ticketAdditional?.id || getTempAdditionalFee.data?.id,
          total_amount: totalAmount,
        });
      }}
      title="Олголт "
      initialValues={{
        container_code: detail?.container_code,
        capacity: detail?.capacity,
        broker_id: detail?.broker_id,
        arrived_at_site: detail?.arrived_at_site,
      }}
      open={open}
      modalProps={{
        destroyOnClose: true,
        width: "900px",
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
      submitter={{
        render: (props) => {
          return (
            <div className="flex items-center gap-3">
              <Button onClick={onCancel} size="large" type="default">
                Болих
              </Button>
              <Button
                onClick={props.submit}
                size="large"
                type="primary"
                loading={updateArrivalField.loading}
              >
                Хадгалах
              </Button>
            </div>
          );
        },
      }}
    >
      <ProForm.Item noStyle shouldUpdate>
        {(form) => {
          return (
            <>
              <Row gutter={[16, 16]}>
                <Col span={10}>
                  <ProFormText
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"container_code"}
                    placeholder="Чингэлэг дугаар"
                    label={"Чингэлэг дугаар"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={4}>
                  <ProFormText
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"capacity"}
                    placeholder="Даац"
                    label={"Даац"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={10}>
                  <ProFormSelect
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    options={[{ label: "TI Logistic", value: 1 }].map(
                      (item) => ({
                        label: item.label,
                        value: item.value,
                      })
                    )}
                    name="broker_id"
                    placeholder="Зуучийн нэр"
                    label={"Зуучийн нэр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <ProFormDatePicker
                    disabled
                    fieldProps={{
                      size: "large",
                    }}
                    name={"arrived_at_site"}
                    placeholder="Т-д ирсэн"
                    label="Т-д ирсэн"
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">Олголт</div>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            opened: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day"
                            ),
                          });
                        },
                      }}
                      name={"opened_at"}
                      placeholder="Задарсан"
                      label="Задарсан"
                    />
                    <IBadge title={dates.opened} color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            freed: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day"
                            ),
                          });
                        },
                      }}
                      name={"freed_at"}
                      placeholder="Суларсан"
                      label="Суларсан"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title={dates.freed} color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            left_site: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day"
                            ),
                          });
                        },
                      }}
                      name={"left_site_at"}
                      placeholder="Т-c явсан"
                      label="Т-c явсан"
                      // rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title={dates?.left_site} color="blue" />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            returned: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day"
                            ),
                          });
                        },
                      }}
                      name={"returned_at"}
                      placeholder="Буцаж ирсэн"
                      label="Буцаж ирсэн"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title={dates?.returned} color="blue" />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      disabled
                      fieldProps={{
                        size: "large",
                        onChange: (e: any) => {
                          setDates({
                            ...dates,
                            shipped: dayjs(e).diff(
                              dayjs(form.getFieldValue("arrived_at_site")),
                              "day"
                            ),
                          });
                        },
                      }}
                      name={"shipped_at"}
                      placeholder="Ачилт хийсэн"
                      label="Ачилт хийсэн"
                    />
                    <IBadge title={dates?.shipped} color="blue" />
                  </div>
                </Col>
              </Row>
              <div className="text-xl font-medium mb-3">
                Элдэв хураамжийн жагсаалт
              </div>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <ProFormText
                    fieldProps={{
                      size: "large",
                    }}
                    name={"ticket_number"}
                    placeholder="ЭХ тасалбарын №"
                    label={"ЭХ тасалбарын №"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={6}>
                  <ProFormDatePicker
                    fieldProps={{
                      size: "large",
                    }}
                    name={"date"}
                    placeholder="Он сар өдөр"
                    label={"Он сар өдөр"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={6}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                      onChange: async (value) => {
                        const data = await additionalFeeByCategory.runAsync({
                          category_id: value,
                        });
                        setAdditionalFee(data?.items || []);
                      },
                    }}
                    request={async () => {
                      const res = await categoryList.runAsync({ is_all: true });
                      return res?.items.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }));
                    }}
                    name="additional_fee_category_id"
                    placeholder="Ангилал"
                    label={"Ангилал"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
                <Col span={6}>
                  <ProFormSelect
                    fieldProps={{
                      size: "large",
                    }}
                    options={[{ label: "40 kg", value: 40 }].map((item) => ({
                      label: item.label,
                      value: item.value,
                    }))}
                    name="cargo_weight"
                    placeholder="Ачааны жин"
                    label={"Ачааны жин"}
                    rules={FORM_ITEM_RULE()}
                  />
                </Col>
              </Row>
              <EditableProTable<AdditionalFeeType>
                rowSelection={{
                  type: "checkbox",
                  onChange: (_, selectedRows) => {},
                }}
                rowKey={"id"}
                recordCreatorProps={{
                  newRecordType: "dataSource",
                  record: (index): any => {
                    return {
                      id: index + 1,
                    };
                  },
                }}
                maxLength={10}
                size="large"
                bordered
                actionRef={actionRef}
                editable={{
                  type: "multiple",
                  editableKeys: additionalFee.map((values) => values.id),
                  onValuesChange: async (record) => {
                    const index = additionalFee.findIndex(
                      (values) => values.id === record.id
                    );
                    additionalFee[index].total_amount =
                      record.fee_amount * record.number_1;
                    setAdditionalFee([...additionalFee]);
                  },
                }}
                onChange={(value) =>
                  setAdditionalFee(value as AdditionalFeeType[])
                }
                value={additionalFee}
                title={() => {
                  return (
                    <div className="bg-[#f9fafb] p-3 flex justify-between items-center text-[#475467]">
                      <div>{additionalFee.length} хураамж</div>
                      <div>Нийт өртөг: {moneyFormat(totalAmount)}</div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Button
                          size="middle"
                          onClick={() => {
                            form.setFieldValue("payment_amount", totalAmount);
                          }}
                        >
                          Төлөлтийн жагсаалт нэмэх
                        </Button>
                        <Button size="middle" type="default">
                          Э/Х нэмэх
                        </Button>
                        <Button size="middle" type="default">
                          Э/Х цуцлах хүсэлт
                        </Button>
                      </div>
                    </div>
                  );
                }}
                className="p-0 remove-padding-table"
                columns={[
                  {
                    title: "Код",
                    dataIndex: "fee_code",
                    key: "fee_code",
                    className: "p-3",
                  },
                  {
                    title: "Хураамжийн нэр",
                    dataIndex: "fee_name",
                    key: "fee_name",
                  },
                  {
                    title: "Хэмжих нэгж",
                    dataIndex: "unit_measurement",
                    key: "unit_measurement",
                  },
                  {
                    title: "Өртөг",
                    dataIndex: "fee_amount",
                    key: "fee_amount",
                    valueType: "money",
                  },
                  {
                    title: "Тоо 1",
                    dataIndex: "number_1",
                    key: "number_1",
                    valueType: "digit",
                  },
                  {
                    title: "Дүн",
                    dataIndex: "total_amount",
                    key: "total_amount",
                    valueType: "money",
                    editable: false,
                  },
                  {
                    title: "Үйлдэл",
                    valueType: "option",
                    width: 200,
                    render: (_, record, __, action) => {
                      return [
                        <a
                          key="editable"
                          onClick={() => {
                            actionRef.current?.startEditable?.(record.id);
                          }}
                        >
                          Засах
                        </a>,
                      ];
                    },
                  },
                ]}
              />
              <div className="flex justify-end">
                <Button
                  size="middle"
                  type="primary"
                  disabled={additionalFee.length === 0 || !additionalFee}
                  onClick={async () => {
                    const data = await ticketAdditionalFee.runAsync({
                      additional_fees: additionalFee.map((values) => {
                        return {
                          additional_fee_id: values.id,
                          number_1: values.number_1,
                          number_2: values.number_2,
                          total_amount: values.total_amount,
                        };
                      }),
                      cargo_weight: form.getFieldValue("cargo_weight"),
                      additional_fee_category_id: form.getFieldValue(
                        "additional_fee_category_id"
                      ),
                      date: dayjs(form.getFieldValue("date")).toDate(),
                      ticket_number: form.getFieldValue("ticket_number"),
                      container_transport_record_id: detail?.id,
                    });

                    setTicketAdditional(data);
                  }}
                >
                  Түр хадгалах
                </Button>
              </div>
              <div className="text-xl font-medium mb-3">Төлөлтийн жагсаалт</div>
              <ITable<any>
                bordered
                title={() => {
                  return (
                    <div className=" bg-[#f9fafb] p-3 text-[#475467]">
                      <Row gutter={[16, 16]}>
                        <Col span={4}>
                          <ProFormDatePicker
                            name="payment_date"
                            placeholder="Огноо"
                            label="Огноо"
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormSelect
                            name="payment_type"
                            placeholder="Төлөлтийн хэлбэр"
                            options={PaymentMethod.map((item) => ({
                              label: item.label,
                              value: item.value,
                            }))}
                            label="Төлөлтийн хэлбэр"
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormText
                            name="payment_amount"
                            placeholder="Мөнгөн дүн"
                            label="Мөнгөн дүн"
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormSelect
                            name="ledger_id"
                            placeholder="Данс"
                            label="Данс"
                            request={async () => {
                              const res = await bankList.runAsync({
                                is_all: true,
                              });
                              return res?.items.map((item) => ({
                                label: `${item.customer_company?.name} - ${item.name}`,
                                value: item.id,
                              }));
                            }}
                          />
                        </Col>
                        <Col span={5}>
                          <ProFormText
                            name="payer_name"
                            placeholder="Төлөгч"
                            label="Төлөгч"
                          />
                        </Col>
                      </Row>
                      <div className="flex justify-end gap-3">
                        <Button
                          size="middle"
                          onClick={() => {
                            setPaymentList([
                              {
                                ticket_number:
                                  form.getFieldValue("ticket_number"),
                                payment_date:
                                  form.getFieldValue("payment_date"),
                                payment_type:
                                  form.getFieldValue("payment_type"),
                                payment_amount:
                                  form.getFieldValue("payment_amount"),
                                ledger_id: form.getFieldValue("ledger_id"),
                                payer_name: form.getFieldValue("payer_name"),
                              },
                            ]);
                            form.setFieldValue("payment_amount", totalAmount);
                          }}
                        >
                          Төлөлт нэмэх
                        </Button>
                        <Button size="middle">Төлөлт хасах</Button>
                        <Button
                          size="middle"
                          onClick={async () => {
                            const data = await generatePDF({
                              title: "Элдэв хураамж тасалбар талон үйлдвэр",
                              headers: ["Орлогын төрөл", "Дүн"],
                              rows: paymentList.map((value) => {
                                return [
                                  value?.payment_type,
                                  value?.payment_amount,
                                ];
                              }),
                              totalMonthly: "100000",
                              totalDaily: "100000",
                            });
                            downloadPDF(data);
                          }}
                        >
                          Хэвлэх
                        </Button>
                      </div>
                    </div>
                  );
                }}
                className="p-0 remove-padding-table"
                dataSource={paymentList}
                columns={[
                  {
                    title: "Код",
                    dataIndex: "ticket_number",
                    key: "ticket_number",
                  },
                  {
                    title: "Огноо",
                    dataIndex: "payment_date",
                    key: "payment_date",
                    render: (_, record) => {
                      return dayjs(record.payment_date).format("YYYY-MM-DD");
                    },
                  },
                  {
                    title: "Төлөлтийн хэлбэр",
                    dataIndex: "payment_type",
                    key: "payment_type",
                    render: (_, record) => {
                      return PaymentMethod.find(
                        (item) => item.value === record.payment_type
                      )?.label;
                    },
                  },
                  {
                    title: "Мөнгөн дүн",
                    dataIndex: "payment_amount",
                    key: "payment_amount",
                  },
                  {
                    title: "Данс",
                    dataIndex: "ledger_id",
                    key: "ledger_id",
                  },
                  {
                    title: "Төлөгч",
                    dataIndex: "payer_name",
                    key: "payer_name",
                  },
                ]}
              />
            </>
          );
        }}
      </ProForm.Item>
    </ModalForm>
  );
};
