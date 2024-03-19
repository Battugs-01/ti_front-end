import { ProFormRadio } from "@ant-design/pro-form";
import { IfCondition } from "components/condition";
import { useState } from "react";

import { ElderlyInterface } from "service/social-worker/customer/type";

import { ClientDoc } from "./client_doc";
import { HealthDoc } from "./health_doc";
import { FilterDocumentButton, FilterDocumentline } from "service/gov-requests";

type DocumentsType = {
  data?: ElderlyInterface;
};

export const Documents: React.FC<DocumentsType> = ({ data }) => {
  const [tab, setTab] = useState<any>(FilterDocumentline.contract);

  const DocumentButtons: FilterDocumentButton[] = [
    {
      value: FilterDocumentline.contract,
      label: "Тушаал, шийдвэр, гэрээ",
    },
    {
      value: FilterDocumentline.client_doc,
      label: "Үйлчлүүлэгчийн бичиг баримт",
    },
    {
      value: FilterDocumentline.health_doc,
      label: "Эрүүл мэндтэй холбоотой бичиг баримт",
    },
  ];

  return (
    <>
      <div className="mt-5">
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
          options={DocumentButtons?.map((el) => ({
            ...el,
            onChange: (e) => {
              setTab(e);
            },
          }))}
          initialValue={FilterDocumentline.contract}
        />
      </div>
      <IfCondition
        condition={tab === 1}
        whenTrue={<ClientDoc data={data?.documents} />}
      />
      <IfCondition
        condition={tab === 2}
        whenTrue={<HealthDoc data={data?.laboratory_tests} />}
      />
    </>
  );
};
