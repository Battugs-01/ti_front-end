import { ItemInterface } from "service/gov-settings";
import MailchimpIcon from "assets/government/icons/mail-chimp.svg";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import { Badge } from "antd";
import { Bank } from "components/bank";
import EditIcon from "assets/government/icons/edit.svg";
import EyeIcon from "assets/government/icons/eye.svg";
import { useState } from "react";
// import { CreateOrphan } from "./actions/createOrphan";

type ItemType = {
  data?: ItemInterface;
  id?: number;
};

export const Item: React.FC<ItemType> = ({ data, id }) => {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const cancelModal = () => {
    setModalOpen(false);
  };
  console.log("hhh");
  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-3/4">
          <div>
            <img src={MailchimpIcon} />
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="font-bold ">{data?.orphanName}</div>
            <div className="flex gap-2 items-center">
              <div className="font-bold">{data?.firstName}</div>
              <div>{data?.lastName}</div>
              <Badge status="default" text={data?.position} />
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={PhoneIcon} />
                <div>{data?.phone}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={MailIcon} />
                <div>{data?.mail}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <div className="flex flex-col items-end gap-1">
            <div>{data?.company}</div>
            <div className="flex items-center gap-1">
              <Bank bankName={data?.bankName} />
              <div className="font-bold">{data?.bankNumber}</div>
            </div>
          </div>
          <div className="flex items-center">
            <div
              className="p-[10px]"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <img src={EditIcon} />
            </div>
            <div className="p-[10px]">
              <img src={EyeIcon} />
            </div>
          </div>
        </div>
      </div>
      {/* <CreateOrphan
        data={data}
        id={id}
        openModal={openModal}
        cancelModal={cancelModal}
      /> */}
    </div>
  );
};
