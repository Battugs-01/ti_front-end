import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { UploadFile, notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { useRef } from "react";
import file from "service/file";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./parts/fields";

export const CreateBanner = ({
  open,
  onCancel,
  onFinish,
}: ActionComponentProps<Product>) => {
  const formRef = useRef<ProFormInstance>();
  const uploads = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <IModalForm
      open={open}
      title="Add"
      modalProps={{ onCancel }}
      formRef={formRef}
      initialValues={{
        currency: "mnt",
      }}
      onOpenChange={() => formRef.current?.resetFields()}
      onSuccess={onFinish}
      onRequest={async (values) => {
        if (values.bannerImages) {
          values.photos = await uploads
            .runAsync({
              names: values.bannerImages?.map(
                (el: UploadFile) => el.originFileObj?.name
              ),
              bucket_name: BUCKET_NAMES.productPhotos,
              files: values.bannerImages,
            })
            .then((el) => el.map((el) => el.path));
        }
        values.start_date = dayjs(values.start_date);
        values.end_date = dayjs(values.end_date);
        values.type = ProductType.banner;
        return product.create(values);
      }}
    >
      <FormFields />
    </IModalForm>
  );
};
