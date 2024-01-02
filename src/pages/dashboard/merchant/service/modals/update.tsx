import { ProFormInstance, ProFormText } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import fileService from "service/file";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusType,
} from "service/merchantService/type";
import { ActionComponentProps } from "types";
import {
  convertFileToUploadFile,
  formatTimeToDate,
  getImageSeperate,
} from "utils/index";
import { Contact } from "./parts/contact";
import { Details } from "./parts/details";
import { Images } from "./parts/images";
import { Info } from "./parts/info";
import { Location } from "./parts/location";
import { Settings } from "./parts/settings";
import { ServiceTab } from "./parts/tab";
import { TimeTable } from "./parts/timeTable";

export const UpdateService = ({
  onCancel,
  onFinish,
  open,
  detail,
}: ActionComponentProps<MerchantService>) => {
  const formRef = useRef<ProFormInstance>();
  const upload = useRequest(fileService.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const uploadMulti = useRequest(fileService.uploads, {
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
        tags: detail?.tags ?? undefined,
        price_range: detail?.price_range ?? undefined,
        categories: detail?.categories ?? [],
        photoImages: detail?.photos
          ?.map((el) => convertFileToUploadFile(el))
          .flat(),
        bannerImages: detail?.banners
          ?.map((el) => convertFileToUploadFile(el))
          .flat(),
        menuImages: detail?.menus
          ?.map((el) => convertFileToUploadFile(el))
          .flat(),
        logoImage: convertFileToUploadFile(detail?.logo),
        timeTable: detail?.hours?.map((el) => {
          let closing = dayjs(el.closing);
          let opening = dayjs(el.opening);
          return {
            ...el,
            closing: `${closing.hour()}:${closing.minute()}:${closing.second()}`,
            opening: `${opening.hour()}:${opening.minute()}:${opening.second()}`,
          };
        }) ?? [{}],
        merchant_full_name: detail?.merchant?.full_name,
        merchant_email: detail?.merchant?.email,
        merchant_phone: detail?.merchant?.phone,
      });
    }
  }, [open]);

  return (
    <IModalForm
      open={open}
      title="Update"
      formRef={formRef}
      modalProps={{
        onCancel,
      }}
      onRequest={async (values) => {
        values.location = formRef.current?.getFieldValue("location");
        if (values.menuImages) {
          let menus = getImageSeperate(values.menuImages);
          values.menus = menus.unChangedImages;
          if (menus.changedImages && (menus.changedImages?.length || 0) > 0) {
            let newImages = await uploadMulti
              .runAsync({
                files: menus.changedImages,
                names: menus.changedImages.map((el) => el.name),
                bucket_name: BUCKET_NAMES.menus,
              })
              .then((el) => el.map((el) => el.path));
            values.menus = [...values.menus, ...newImages];
          }
        }
        if (values.logoImage && !values.logoImage[0]?.isBefore) {
          values.logo = await upload
            .runAsync({
              file: values.logoImage[0].originFileObj,
              name: values.logoImage[0].name,
              bucket_name: BUCKET_NAMES.logo,
            })
            .then((el) => el.path);
        }
        if (values.bannerImages && values.bannerImages.length > 0) {
          let banners = getImageSeperate(values.bannerImages);
          values.banners = banners.unChangedImages;
          if (
            banners.changedImages &&
            (banners.changedImages?.length || 0) > 0
          ) {
            let newImages = await uploadMulti
              .runAsync({
                files: banners.changedImages,
                names: banners.changedImages.map((el) => el.name),
                bucket_name: BUCKET_NAMES.banners,
              })
              .then((el) => el.map((el) => el.path));
            values.banners = [...newImages, ...values.banners];
          }
        }
        if (values.photoImages && values.photoImages.length > 0) {
          let photos = getImageSeperate(values.photoImages);
          values.photos = photos.unChangedImages;
          if (photos.changedImages && (photos.changedImages.length || 0) > 0) {
            let newImages = await uploadMulti
              .runAsync({
                names: photos.changedImages.map((el) => el.name),
                files: photos.changedImages,
                bucket_name: BUCKET_NAMES.photos,
              })
              .then((el) => el.map((el) => el.path));
            values.photos = [...newImages, ...values.photos];
          }
        }
        if (values.timeTable) {
          values.hours = values.timeTable.map((el: any) => ({
            ...el,
            opening: formatTimeToDate(el.opening),
            closing: formatTimeToDate(el.closing),
            service_id: detail?.id,
          }));
        }
        if (!values.status) {
          values.status = ServiceStatusType.manual;
        }
        if (values.commission_start_date) {
          values.commission_start_date = dayjs(values.commission_start_date);
        }
        if (values.commission_end_date) {
          values.commission_end_date = dayjs(values.commission_end_date);
        }

        return merchantService.update(detail?.id || 0, values);
      }}
      onSuccess={onFinish}
    >
      <ProFormText name={"id"} hidden />
      <ProFormText name={"logo"} hidden />
      <ProFormText name={"photos"} hidden />
      <ProFormText name={"banners"} hidden />
      <ProFormText name={"status"} hidden />

      <ServiceTab
        companyItems={
          <>
            <Info />
            <Details />
            <Contact />
            <Location formRef={formRef} detail={detail} />
            <TimeTable />
            <Images />
          </>
        }
        settingsItems={<Settings detail={detail} />}
      />
    </IModalForm>
  );
};
