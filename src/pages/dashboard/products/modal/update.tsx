import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import file from "service/file";
import product from "service/product";
import { Product, ProductType } from "service/product/type";
import { ActionComponentProps } from "types";
import { convertFileToUploadFile, getImageSeperate } from "utils/index";
import { BannerImages } from "./parts/banner";
import { Details } from "./parts/details";
import { Images } from "./parts/images";
import { Location } from "./parts/location";
import { Price } from "./parts/price";

type Props = ActionComponentProps<Product> & {
  type: ProductType;
};
export const Update = ({ onCancel, onFinish, open, detail, type }: Props) => {
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

  useEffect(() => {
    if (open) {
      formRef.current?.setFieldsValue({
        ...detail,
        has_discount: !!detail?.discount_percentage,
        eventImages: detail?.photos
          ?.map((el) => convertFileToUploadFile(el))
          .flat(),
        bannerImage: convertFileToUploadFile(detail?.banner),
      });
    }
  }, [open]);
  return (
    <IModalForm
      title="Update"
      open={open}
      onSuccess={onFinish}
      formRef={formRef}
      modalProps={{
        onCancel,
      }}
      onRequest={async (values) => {
        let sendJSON = { ...detail, ...values };

        if (values.bannerImage && !values.bannerImage[0].isBefore) {
          sendJSON.banner = await upload
            .runAsync({
              name: values.bannerImage[0]?.originFileObj?.name,
              file: values.bannerImage[0]?.originFileObj,
              bucket_name: BUCKET_NAMES.productBanner,
            })
            .then((el) => el.path);
        }
        if (values.eventImages) {
          let images = getImageSeperate(values.eventImages);
          sendJSON.photos = images.unChangedImages;
          if (images.changedImages && (images.changedImages?.length || 0) > 0) {
            let newImages = await uploads
              .runAsync({
                files: images.changedImages,
                names: images.changedImages.map((el) => el.name),
                bucket_name: BUCKET_NAMES.productBanner,
              })
              .then((el) => el.map((el) => el.path));
            sendJSON.photos = [...newImages, ...sendJSON.photos];
          }
        }
        sendJSON.start_date = dayjs(values.start_date).toDate();
        sendJSON.end_date = dayjs(values.end_date).toDate();
        sendJSON.discount_end_date = dayjs(values.discount_end_date).toDate();
        sendJSON.limit = parseInt(values.limit);
        sendJSON.discount_percentage = parseInt(values.discount_percentage);
        sendJSON.discount_start_date = dayjs(values.discount_start_date);

        return product.update(detail?.id as any, { ...sendJSON });
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormText name={"banner"} hidden />
      <ProFormText name={"photos"} hidden />
      <ProFormText name={"status"} hidden />
      <ProFormText name={"location"} hidden />

      <BannerImages />
      <Details type={type} />
      <Images />
      <Location formRef={formRef} />
      <Price />
    </IModalForm>
  );
};
