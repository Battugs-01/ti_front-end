import { ProFormDigit, ProFormRadio } from "@ant-design/pro-form";
import { Form } from "antd";
import { SectionContainer, SectionField } from "components/index";
import { IModalForm } from "components/modal";
import { IProFormSelect } from "components/select";
import { FORM_ITEM_RULE, SERVICE_STATUS_ARRAY } from "config";
import { FC, useEffect, useState } from "react";
import merchantService from "service/merchantService";
import { ServiceStatusType } from "service/merchantService/type";
import product from "service/product";
import offer from "service/sponsored";
import {
  Offer,
  OfferCategory,
  OfferCategoryArray,
  OfferType,
  OfferTypeArray,
} from "service/sponsored/types";
import { ActionComponentProps } from "types";

const Update: FC<ActionComponentProps<Offer>> = ({
  open,
  onCancel,
  detail,
  onFinish,
}) => {
  const [form] = Form.useForm();
  const [category, setCategory] = useState<OfferCategory>(
    detail?.category || OfferCategory.PRODUCT
  );

  useEffect(() => {
    if (open) {
      form?.setFieldsValue({
        ...detail,
      });
      setCategory(detail?.category || OfferCategory.PRODUCT);
    }
  }, [open]);

  return (
    <>
      <IModalForm
        open={open}
        title="Update"
        form={form}
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: onCancel,
        }}
        submitTimeout={2000}
        onRequest={async (values) => {
          values.id =
            category === OfferCategory.PRODUCT
              ? values?.product_id
              : values?.service_id;
          if (!detail?.id) {
            return;
          }
          return offer.update(detail?.id, values);
        }}
        onSuccess={onFinish}
      >
        <SectionContainer label="Choose*">
          <SectionField
            label="Type*"
            children={
              <ProFormRadio.Group
                shouldUpdate
                name={"type"}
                radioType="button"
                options={OfferTypeArray.map((e) => ({ ...e }))}
                initialValue={OfferType.FOR_YOU}
                fieldProps={{
                  className: "text-md font-semibold",
                }}
                rules={FORM_ITEM_RULE()}
              />
            }
          />
          <SectionField
            label="Category*"
            children={
              <ProFormRadio.Group
                shouldUpdate
                name={"category"}
                radioType="button"
                options={OfferCategoryArray.map((e) => ({ ...e }))}
                initialValue={OfferCategory.PRODUCT}
                rules={FORM_ITEM_RULE()}
                fieldProps={{
                  className: "text-md font-semibold",
                  onChange: (e) => {
                    form.setFieldsValue({
                      id: undefined,
                      category: e.target.value,
                    });
                    setCategory(e.target.value);
                  },
                }}
              />
            }
          />
          <SectionField
            label={
              category === OfferCategory.PRODUCT ? "Product*" : "Merchant*"
            }
            children={
              category === OfferCategory.PRODUCT ? (
                <IProFormSelect
                  shouldUpdate
                  fieldNameForLabel="name"
                  name="product_id"
                  request={product.list}
                  placeholder={"Select"}
                  rules={FORM_ITEM_RULE()}
                  onChange={(value) => {
                    form.setFieldValue("product_id", value);
                  }}
                />
              ) : (
                <IProFormSelect
                  shouldUpdate
                  fieldNameForLabel="name"
                  name="service_id"
                  request={merchantService.list}
                  placeholder={"Select"}
                  rules={FORM_ITEM_RULE()}
                  filter={{
                    statuses: SERVICE_STATUS_ARRAY.filter(
                      (e) => e.value !== ServiceStatusType.initial
                    ).map((e) => e.value),
                  }}
                  onChange={(value) => {
                    form.setFieldValue("service_id", value);
                  }}
                />
              )
            }
          />
          <SectionField
            label="List order*"
            children={
              <ProFormDigit
                name={"list_order"}
                placeholder={"1"}
                rules={FORM_ITEM_RULE()}
              />
            }
          />
        </SectionContainer>
      </IModalForm>
    </>
  );
};

export default Update;
