import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { Button, Col, notification, Row } from "antd";
import IBadge from "components/badge";
import { ITable } from "components/index";
import { FORM_ITEM_RULE } from "config";
import additionalFeeCategory from "service/additional_fee_record";
import fieldRegistration from "service/feild_registration";
import { ActionComponentProps } from "types";
import { moneyFormat } from "utils/index";

export const ShippmentCreate: React.FC<ActionComponentProps<any>> = ({
  onCancel,
  onFinish,
  open,
  detail,
}) => {
  const addAcrivalField = useRequest(fieldRegistration.create, {
    manual: true,
    onSuccess: () => {
      notification.success({
        message: "Амжилттай хадгалагдлаа",
      });
      onFinish?.();
    },
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
  return (
    <ModalForm
      onFinish={async (values) => {
        await addAcrivalField.runAsync({
          ...values,
        });
      }}
      title="Олголт "
      initialValues={{
        ...detail,
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
                loading={addAcrivalField.loading}
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
              <div className="text-xl font-medium mb-3">Ачилт</div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <div className="flex items-center gap-3">
                    <ProFormDatePicker
                      disabled
                      fieldProps={{
                        size: "large",
                      }}
                      name={"shipped_at"}
                      placeholder="Ачилт хийсэн"
                      label="Ачилт хийсэн"
                      rules={FORM_ITEM_RULE()}
                    />
                    <IBadge title="2" color="blue" />
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
                    name={"ticket_no"}
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
                    }}
                    request={async () => {
                      const res = await categoryList.runAsync({ is_all: true });
                      return res?.items.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }));
                    }}
                    name="category"
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
                    options={[{ label: "40 kg", value: "100" }].map((item) => ({
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
              <ITable<any>
                tableStyle={{}}
                style={{}}
                title={() => {
                  return (
                    <div className="bg-[#f9fafb] p-3 flex justify-between items-center text-[#475467]">
                      <div>3 хураамж</div>
                      <div>Нийт өртөг: {moneyFormat(375100)}</div>
                      <div className="flex items-center gap-3">
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
                    dataIndex: "code",
                    key: "code",
                  },
                  {
                    title: "Хураамжийн нэр",
                    dataIndex: "fee_name",
                    key: "fee_name",
                  },
                  {
                    title: "Хэмжих нэгж",
                    dataIndex: "unit",
                    key: "unit",
                  },
                  {
                    title: "Өртөг",
                    dataIndex: "cost",
                    key: "cost",
                  },
                  {
                    title: "Тоо 1",
                    dataIndex: "quantity_1",
                    key: "quantity_1",
                  },
                  {
                    title: "Тоо 2",
                    dataIndex: "quantity_2",
                    key: "quantity_2",
                  },
                  {
                    title: "Дүн",
                    dataIndex: "price",
                    key: "price",
                  },
                ]}
              />

              <div className="text-xl font-medium mb-3">Төлөлтийн жагсаалт</div>
              <ITable<any>
                tableStyle={{}}
                style={{}}
                title={() => {
                  return (
                    <div className="bg-[#f9fafb] p-3 flex justify-between items-center text-[#475467]">
                      <div>3 хураамж</div>
                      <div>Нийт өртөг: {moneyFormat(375100)}</div>
                      <div className="flex items-center gap-3">
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
                    dataIndex: "code",
                    key: "code",
                  },
                  {
                    title: "Хураамжийн нэр",
                    dataIndex: "fee_name",
                    key: "fee_name",
                  },
                  {
                    title: "Хэмжих нэгж",
                    dataIndex: "unit",
                    key: "unit",
                  },
                  {
                    title: "Өртөг",
                    dataIndex: "cost",
                    key: "cost",
                  },
                  {
                    title: "Тоо 1",
                    dataIndex: "quantity_1",
                    key: "quantity_1",
                  },
                  {
                    title: "Тоо 2",
                    dataIndex: "quantity_2",
                    key: "quantity_2",
                  },
                  {
                    title: "Дүн",
                    dataIndex: "price",
                    key: "price",
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
