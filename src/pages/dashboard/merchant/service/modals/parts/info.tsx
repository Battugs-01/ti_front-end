import {
  SectionContainer,
  UploadButton,
  UploadDraggerButton,
} from "components/index";

export const Info = () => {
  return (
    <>
      <SectionContainer
        label="Logo"
        children={<UploadButton name={"logoImage"} required={false} />}
      />
      <SectionContainer
        label="Banner images"
        children={
          <UploadDraggerButton name={"bannerImages"} required={false} />
        }
      />
      <SectionContainer
        label="Menu images"
        children={<UploadDraggerButton name={"menuImages"} required={false} />}
      />
    </>
  );
};
