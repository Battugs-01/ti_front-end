import { ProFormInstance, ProFormRadio } from "@ant-design/pro-form";
import { useRequest } from "ahooks";
import { IfCondition } from "components/condition";
import { IModalForm } from "components/modal";
import { DetailTab, DetailTabtButton } from "config";
import { useEffect, useRef, useState } from "react";
import fieldRegistration from "service/feild_registration";
import { ActionComponentProps } from "types";
import Container from "./container";
import Grant from "./grant";
import Shiping from "./shipment";

const PublicDetail = ({ ...rest }: ActionComponentProps<any>) => {
  const formRef = useRef<ProFormInstance>();
  const [tab, setTab] = useState<any>(DetailTab.container);

  const detailChooseButtons: DetailTabtButton[] = [
    {
      value: DetailTab.container,
      label: "Чингэлгийн мэдээлэл",
    },
    {
      value: DetailTab.grant,
      label: "Олголт",
    },
    {
      value: DetailTab.shiping,
      label: "Ачилт",
    },
  ];

  const detailData = useRequest(fieldRegistration.getPublicDetailData, {
    manual: true,
    onError: (err) => {
      console.log(err, "err");
    },
  });

  useEffect(() => {
    if (rest.open) {
      detailData.run(rest?.detail?.id);
    }
  }, [rest.open]);

  console.log(detailData, "restsdaaa");
  return (
    <IModalForm
      title="Дэлгэрэнгүй мэдээлэл"
      open={rest.open}
      formRef={formRef}
      onOpenChange={() => {
        formRef.current?.resetFields();
      }}
      width={1000}
      scrollToFirstError={true}
      modalProps={{ maskClosable: false, onCancel: rest.onCancel }}
      cancelText={"Буцах"}
      className="px-3"
    >
      <ProFormRadio.Group
        name={"documentLine"}
        radioType="button"
        fieldProps={{
          size: "large",
          value: tab,
          onChange: (e) => {
            setTab(e.target.value);
          },
        }}
        options={detailChooseButtons?.map((el) => ({
          ...el,
          onChange: (e) => {
            setTab(e);
          },
        }))}
        initialValue={DetailTab.container}
      />

      <IfCondition
        condition={tab === DetailTab.container}
        whenTrue={<Container data={rest?.detail} />}
      />

      <IfCondition
        condition={tab === DetailTab.grant}
        whenTrue={<Grant data={rest?.detail} detailData={detailData} />}
      />
      <IfCondition
        condition={tab === DetailTab.shiping}
        whenTrue={<Shiping data={rest?.detail} detailData={detailData} />}
      />
    </IModalForm>
  );
};

export default PublicDetail;
