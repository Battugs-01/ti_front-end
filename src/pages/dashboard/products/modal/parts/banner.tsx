import { SectionContainer, UploadDraggerButton } from "components/index";
import React from "react";

export const BannerImages = () => {
  return (
    <SectionContainer label="Banner Images*">
      <UploadDraggerButton name={"bannerImage"} />
    </SectionContainer>
  );
};
