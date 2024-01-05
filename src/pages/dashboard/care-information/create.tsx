import { ProFormInstance } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { UploadFile } from "antd/es/upload";
import { IModalForm } from "components/modal";
import { BUCKET_NAMES } from "config";
import dayjs from "dayjs";
import { Info } from "pages/dashboard/merchant/service/modals/parts/info";
import { ServiceTab } from "pages/dashboard/merchant/service/modals/parts/tab";
import { useRef } from "react";
import file from "service/file";
import merchantService from "service/merchantService";
import {
  MerchantService,
  ServiceStatusRequestType,
  ServiceStatusType,
} from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { formatTimeToDate } from "utils/index";
import { Details } from "../products/modal/parts/details";
import { Contact } from "pages/dashboard/merchant/service/modals/parts/contact";
import { Location } from "../products/modal/parts/location";
import { TimeTable } from "pages/dashboard/merchant/service/modals/parts/timeTable";
import { Images } from "../products/modal/parts/images";
import { Settings } from "pages/dashboard/merchant/service/modals/parts/settings";
// import { Contact } from "./parts/contact";
// import { Details } from "./parts/details";
// import { Images } from "./parts/images";
// import { Info } from "./parts/info";
// import { Location } from "./parts/location";
// import { Settings } from "./parts/settings";
// import { ServiceTab } from "./parts/tab";
// import { TimeTable } from "./parts/timeTable";

export const CreateService = ({
  ...rest
}: ActionComponentProps<MerchantService>) => {
  const formRef = useRef<ProFormInstance>();
  const upload = useRequest(file.upload, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  const uploadMulti = useRequest(file.uploads, {
    manual: true,
    onError: (err) =>
      notification.error({
        message: err.message,
      }),
  });

  return (
    <IModalForm
      open={rest.open}
      title="Create"
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      scrollToFirstError={true}
      modalProps={{
        onCancel: rest.onCancel,
      }}
      initialValues={{
        timeTable: [{}],
        status: ServiceStatusType.manual,
      }}
      onRequest={async (values) => {
        if (values.menuImages) {
          values.menus = await uploadMulti
            .runAsync({
              names: values.menuImages?.map((el: UploadFile) => el.name),
              files: values.menuImages,
              bucket_name: BUCKET_NAMES.menus,
            })
            .then((el) => el.map((el) => el.path));
        }
        if (values.logoImage) {
          values.logo = await upload
            .runAsync({
              name: values.logoImage[0].name,
              bucket_name: BUCKET_NAMES.logo,
              file: values.logoImage[0].originFileObj,
            })
            .then((el) => el.path);
        }
        if (values.bannerImages && values.bannerImages.length > 0) {
          values.banners = await uploadMulti
            .runAsync({
              names: values.bannerImages?.map((el: UploadFile) => el?.name),
              files: values.bannerImages,
              bucket_name: BUCKET_NAMES.banners,
            })
            .then((el) => el.map((el) => el.path));
        }
        if (values.photoImages && values.photoImages.length > 0) {
          values.photos = await uploadMulti
            .runAsync({
              names: values.photoImages?.map((el: UploadFile) => el?.name),
              files: values.photoImages,
              bucket_name: BUCKET_NAMES.photos,
            })
            .then((el) => el.map((el) => el.path));
        }
        if (values.timeTable) {
          values.hours = values.timeTable.map((el: any) => {
            return {
              ...el,
              opening: formatTimeToDate(el.opening),
              closing: formatTimeToDate(el.closing),
            };
          });
        }
        if (values.status === ServiceStatusType.initial) {
          values.service_status = ServiceStatusRequestType.pending;
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

        return merchantService.create(values);
      }}
      onSuccess={rest.onFinish}
    >
      <ServiceTab
        companyItems={
          <>
            <Info />
            <Details />
            <Contact />
            <Location detail={undefined} formRef={formRef} />
            <TimeTable />
            <Images />
          </>
        }
        settingsItems={<Settings />}
      />
    </IModalForm>
  );
};
