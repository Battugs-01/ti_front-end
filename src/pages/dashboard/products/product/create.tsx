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
import { BannerImages } from "./part/banner";
import { Details } from "./part/details";
import { Images } from "./part/images";
import { Price } from "./part/price";

type Props = ActionComponentProps<Product>;
export const CreateProduct = ({ onCancel, onFinish, open }: Props) => {
  const formRef = useRef<ProFormInstance>();

  const uploads = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });
  const upload = useRequest(file.upload, {
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
      onSuccess={onFinish}
      formRef={formRef}
      onOpenChange={() => formRef.current?.resetFields()}
      modalProps={{
        onCancel,
      }}
      initialValues={{
        has_limit: true,
        has_discount: true,
        currency: "mnt",
      }}
      onRequest={async (values) => {
        let sendJSON = { ...values };

        if (values.bannerImage) {
          sendJSON.banner = await upload
            .runAsync({
              name: values.bannerImage[0]?.originFileObj?.name,
              file: values.bannerImage[0]?.originFileObj,
              bucket_name: BUCKET_NAMES.productBanner,
            })
            .then((el) => el.path);
        }
        if (values.eventImages) {
          sendJSON.photos = await uploads
            .runAsync({
              names: values.eventImages?.map((el: UploadFile) => el?.name),
              files: values.eventImages,
              bucket_name: BUCKET_NAMES.productBanner,
            })
            .then((el) => el.map((el) => el.path));
        }
        sendJSON.type = ProductType.product;
        sendJSON.start_date = dayjs(values.start_date);
        sendJSON.end_date = dayjs(values.end_date);
        sendJSON.discount_end_date = dayjs(values.discount_end_date);
        sendJSON.discount_start_date = dayjs(values.discount_start_date);
        sendJSON.limit = parseInt(values.limit);
        sendJSON.discount_percentage = parseInt(values.discount_percentage);
        sendJSON.location = values.location;
        return product.create({ ...sendJSON });
      }}
    >
      <BannerImages />
      <Details />
      <Images />
      <Price />
    </IModalForm>
  );
};
