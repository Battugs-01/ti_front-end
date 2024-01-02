import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import file from "service/file";
import product from "service/product";
import { Product } from "service/product/type";
import { ActionComponentProps } from "types";
import { convertFileToUploadFile, getImageSeperate } from "utils/index";
import { FormFields } from "./parts/fields";

export const UpdateNews = ({
  open,
  onCancel,
  onFinish,
  detail,
}: ActionComponentProps<Product>) => {
  const formRef = useRef<ProFormInstance>();
  const uploads = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  useEffect(() => {
    formRef.current?.resetFields();
    if (open && detail) {
      formRef.current?.setFieldsValue({
        ...detail,
        images: detail?.photos?.map((el) => convertFileToUploadFile(el)).flat(),
      });
    }
  }, [open, detail]);

  return (
    <IModalForm
      title="Update"
      open={open}
      formRef={formRef}
      modalProps={{ onCancel }}
      onSuccess={onFinish}
      onRequest={async (values) => {
        if (values.images) {
          let images = getImageSeperate(values.images);
          values.photos = images.unChangedImages;
          if (images.changedImages && (images.changedImages?.length || 0) > 0) {
            let newImages = await uploads
              .runAsync({
                files: images.changedImages,
                names: images.changedImages.map((el) => el.name),
                bucket_name: BUCKET_NAMES.productBanner,
              })
              .then((el) => el.map((el) => el.path));
            values.photos = [...newImages, ...values.photos];
          }
        }
        values.start_date = dayjs(values.start_date);
        values.end_date = dayjs(values.end_date);
        return product.update(detail?.id || 0, { ...detail, ...values });
      }}
    >
      <FormFields />
    </IModalForm>
  );
};
