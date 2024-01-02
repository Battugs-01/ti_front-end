import { ProFormText } from "@ant-design/pro-form";
import { SectionContainer } from "components/index";
import LeafletMap from "components/map";
import { FORM_ITEM_RULE } from "config";
import { useEffect, useState } from "react";

export const Location = ({ formRef }: { formRef: any }) => {
  const [location, setLocation] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    setLocation(formRef.current?.getFieldValue("location") || [0, 0]);
  }, [formRef.current?.getFieldValue()]);

  return (
    <SectionContainer label="Event Location*">
      <div
        style={{
          height: "300px",
          width: "100%",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <LeafletMap
          position={{ val: location, set: setLocation }}
          onPositionChange={(lat: number, long: number) => {
            formRef.current?.setFieldsValue({
              location: [lat, long],
            });
          }}
        />
      </div>
      <ProFormText name={"address"} rules={FORM_ITEM_RULE()} />
    </SectionContainer>
  );
};
