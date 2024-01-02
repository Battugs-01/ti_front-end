import { useRequest } from "ahooks";
import { UploadFile, message, notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import file from "service/file";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { ActionComponentProps } from "types";
import { FormFields } from "./parts/fields";
import { ProFormInstance } from "@ant-design/pro-form";
import { useRef } from "react";

export const CreateNews = ({
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
      title="Add"
      open={open}
      modalProps={{ onCancel }}
      initialValues={{
        currency: "mnt",
      }}
      formRef={formRef}
      onOpenChange={() => formRef.current?.resetFields()}
      onSuccess={onFinish}
      onRequest={async (values) => {
        if (values.images) {
          values.photos = await uploads
            .runAsync({
              names: values.images?.map(
                (el: UploadFile) => el.originFileObj?.name
              ),
              bucket_name: BUCKET_NAMES.photos,
              files: values.images,
            })
            .then((el) => el.map((el) => el.path));
        }
        values.start_date = dayjs(values.start_date);
        values.end_date = dayjs(values.end_date);
        values.type = ProductType.news;
        return product.create(values);
      }}
    >
      <FormFields />
    </IModalForm>
  );
};
