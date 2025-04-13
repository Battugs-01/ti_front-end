import {
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-form";
import { useDebounceFn, useRequest } from "ahooks";
import { Col, notification, Row } from "antd";
import { SectionContainer } from "components/index";
import { FORM_ITEM_RULE, PaymentType } from "config";
import dayjs from "dayjs";
import ledger from "service/fininaciar/accountSettlement/ledger";
import { PaymentMethod, TransactionType } from "utils/options";

export const Info = ({ isUpdate }: { isUpdate?: boolean }) => {
  const list = useRequest(ledger.list, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const debouncedSearch = useDebounceFn(
    (value) => {
      if (value) {
        list.run({
          is_all: true,
          search: value,
        });
      }
    },
    {
      wait: 5000, // 2 seconds delay
    }
  );

  return (
    <SectionContainer>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormDateTimePicker
            fieldProps={{
              size: "large",
            }}
            initialValue={dayjs()}
            name="created_at"
            label={<div className="text-gray-700 font-medium ">Огноо</div>}
          />
        </Col>
        <Col span={12}>
          <ProFormSelect
            label={<div className="font-medium text-gray-700">Данс</div>}
            name={"ledger_id"}
            shouldUpdate
            className="flex items-center justify-center "
            fieldProps={{
              showSearch: true,
              loading: list.loading,
              filterOption: false,
              size: "large",
              onSearch: (value) => {
                debouncedSearch.run(value);
              },
            }}
            placeholder={"Данс"}
            request={async (value) => {
              const res = await list.runAsync({
                is_all: true,
                search: value.keyWords,
              });
              return res?.items?.map((item: any) => ({
                label: `${item?.customer_company?.name} - ${item?.name}`,
                value: item?.id,
              }));
            }}
          />
        </Col>
      </Row>
      <Row gutter={[24, 24]}>
        <Col span={12}>
          <ProFormSelect
            name="payment_type"
            placeholder="Төлөлтийн хэлбэр"
            options={PaymentMethod.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            initialValue={PaymentType.non_cash}
            label="Төлөлтийн хэлбэр"
          />
        </Col>
        <Col span={12}>
          <ProFormDigit
            name={"amount"}
            placeholder={"Мөнгөн дүн"}
            tooltip="Мөнгөн дүн заавал 0-ээс их байна"
            fieldProps={{
              min: 0,
            }}
            label="Мөнгөн дүн"
            rules={FORM_ITEM_RULE()}
          />
        </Col>
      </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <ProFormSelect
              name={"transaction_type"}
              placeholder={"Гүйлгээний төрөл"}
              label="Гүйлгээний төрөл"
              tooltip="Гүйлгээний төрөл буюу орлого эсвэл зарлагаас хамаарч данснаас бодолт хийнэ"
              initialValue={TransactionType.find(
                (item) => item.value === "debit"
              )}
              fieldProps={{
                defaultValue: TransactionType.find(
                  (item) => item.value === "debit"
                ),
              }}
              options={TransactionType.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
            />
          </Col>
        </Row>
    </SectionContainer>
  );
};
