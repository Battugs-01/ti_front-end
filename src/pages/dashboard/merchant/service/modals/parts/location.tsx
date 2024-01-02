import { ProFormText } from "@ant-design/pro-form";
import { SectionContainer } from "components/index";
import LeafletMap from "components/map";
import { FORM_ITEM_RULE } from "config";
import { useEffect, useState } from "react";

export const Location = ({
  formRef,
  detail,
}: {
  formRef: any;
  detail: any;
}) => {
  const [location, setLocation] = useState<[number, number]>(
    formRef.current?.getFieldValue("location") || [0, 0]
  );

  useEffect(() => {
    if (detail?.location) {
      setLocation([detail?.location[0], detail?.location[1]]);
    }
  }, [detail]);

  return (
    <SectionContainer label="Location*">
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
            formRef.current?.setFieldValue("location", [lat, long]);
          }}
        />
      </div>
      <ProFormText hidden name="location" />
      <ProFormText name={"address"} rules={FORM_ITEM_RULE()} />
    </SectionContainer>
  );
};
