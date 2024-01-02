import { InfoCircleOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { notification } from "antd";
import { ApproveButton, ITag, RenderServiceSchedule } from "components/index";
import { IModalForm } from "components/modal";
import { ITable } from "components/table";
import { SERVICE_CATEGORY_TYPES } from "config";
import { useState } from "react";
import merchantService from "service/merchantService";
import { MerchantService } from "service/merchantService/type";
import { ActionComponentProps } from "types";
import { tableCellFixed } from "utils/index";

export const ImportService = ({
  open,
  onCancel,
  onFinish,
  details,
}: ActionComponentProps<MerchantService>) => {
  const [errorDataKey, setErrorDatakey] = useState<number[]>([]);

  const approve = useRequest(merchantService.importXLSX, {
    manual: true,
    onSuccess: () => {
      onFinish && onFinish();
    },
    onError: (err) => {
      notification.error({
        message : err.message
      });
    },
  });

  return (
    <IModalForm
      open={open}
      modalProps={{
        onCancel,
      }}
      title="Import"
      submitter={{
        submitButtonProps: {
          className: "hidden",
        },
      }}
      width={"90%"}
    >
      <ITable<MerchantService>
        total={details?.length}
        toolbarItems={
          <ApproveButton
            size="large"
            disabled={errorDataKey.length > 0}
            onClick={() => approve.run({ data: details })}
          />
        }
        hideCreateButton={true}
        dataSource={details}
        rowClassName={(record, index) =>
          errorDataKey.includes(index) ? "bg-error-50" : ""
        }
        columns={[
          {
            ...tableCellFixed(120),
            dataIndex: "name",
            title: "Name",
          },
          {
            ...tableCellFixed(120),
            dataIndex: "phone",
            title: "Phone number",
          },
          {
            ...tableCellFixed(180),
            dataIndex: "email",
            title: "Email",
            render: (_, record, index) => {
              return errorDataKey.includes(index) ? (
                <div className="flex items-center gap-2">
                  <span>{record.email}</span>
                  <InfoCircleOutlined className=" text-error-600  text-xl" />
                </div>
              ) : (
                <div>{record.email}</div>
              );
            },
          },
          {
            ...tableCellFixed(100),
            dataIndex: "operation_type",
            title: "Operation Type",
            render: (_, record) => {
              return record?.operation_types?.map((el, index) => (
                <ITag value={el} key={"operation-type-" + index} />
              ));
            },
          },
          {
            ...tableCellFixed(130),
            dataIndex: "categories",
            title: "Category",
            render: (_, record) =>
              record.categories.map((item, index) => (
                <ITag
                  value={
                    SERVICE_CATEGORY_TYPES.find((el) => el.value === item)
                      ?.label
                  }
                  key={"category-" + index}
                />
              )),
          },
          {
            ...tableCellFixed(200),
            dataIndex: "description",
            title: "Description*(English)",
          },
          {
            ...tableCellFixed(200),
            dataIndex: "description_mn",
            title: "Description*(Mongolia)",
          },
          {
            ...tableCellFixed(200),
            dataIndex: "location",
            title: "Location",
            render: (_, record) => {
              return record.location?.join(", ");
            },
          },
          {
            ...tableCellFixed(200),
            dataIndex: "address",
            title: "Address",
          },
          {
            ...tableCellFixed(120),
            dataIndex: "website",
            title: "Website",
          },
          {
            ...tableCellFixed(80),
            dataIndex: "price_range",
            title: "Price",
            render: (_, record) => (
              <ITag value={new Array(record?.price_range).fill("$").join("")} />
            ),
          },
          {
            ...tableCellFixed(80),
            dataIndex: "is_tourist_friendly",
            title: "Tourist Friendly",
            render: (_, record) => (
              <ITag value={record.is_tourist_friendly ? "Yes" : "No"} />
            ),
          },
          {
            ...tableCellFixed(200),
            dataIndex: "hours",
            title: "Time table",
            render: (_, record) => (
              <RenderServiceSchedule hours={record.hours} />
            ),
          },
        ]}
      />
    </IModalForm>
  );
};
