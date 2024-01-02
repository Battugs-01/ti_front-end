import { SectionContainer, UploadDraggerButton } from "components/index";
import { FieldRequireMessage } from "config";

export const Images = () => {
  return (
    <SectionContainer label="Photo gallery">
      <UploadDraggerButton
        name={"photoImages"}
        validator={async (value) => {
          if (!value) return Promise.reject(FieldRequireMessage);
          // if ((value?.length || 0) < 3)
          //   return Promise.reject("At least 3 images");
          return Promise.resolve(value);
        }}
        required={false}
      />
    </SectionContainer>
  );
};
