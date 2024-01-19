import { ItemInterface } from "service/gov-settings";
import MailchimpIcon from "assets/government/icons/mail-chimp.svg";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import { Badge } from "antd";
import { Bank } from "components/bank";
import EditIcon from "assets/government/icons/editButton.svg";
import { useState } from "react";
import { CustomButton } from "../components/button";
import { useRequest } from "ahooks";
import orphanUser from "service/gov-orphan/requests";
import { UpdateOrphan } from "./action/update/updateOrphan";
import { CardInterface } from "service/gov-orphan";
import { Link } from "react-router-dom";
// import { CreateOrphan } from "./actions/createOrphan";

type ItemType = {
  data?: CardInterface;
};

export const Item: React.FC<ItemType> = ({ data }) => {
  const [openModal, setModalOpen] = useState<boolean>(false);
  const orphanInfo = useRequest(() => orphanUser.getOrphan(data?.id), {
    manual: true,
    onSuccess: () => {
      setModalOpen(true);
    },
  });
  const openEdit = () => {
    orphanInfo.run();
  };
  const cancelModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-3/4">
          <div>
            <img src={MailchimpIcon} />
          </div>
          <div className="flex flex-col items-start gap-2">
            <Link to={`${data?.id}`}>
              <div className="font-bold text-base text-gray-700">
                {data?.organization_name}
              </div>
            </Link>
            <div className="flex gap-2 items-center">
              <div className="font-bold">{data?.contact?.first_name}</div>
              <div>{data?.contact?.last_name}</div>
              <Badge status="default" text={data?.contact?.position} />
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={PhoneIcon} />
                <div>{data?.contact?.phone}</div>
              </div>
              <Badge status="default" />
              <div className="flex items-center gap-1">
                <img src={MailIcon} />
                <div>{data?.email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-1/4 justify-end">
          <div className="flex flex-col items-end gap-1">
            <div>{data?.payment?.reciever_name}</div>
            <div className="flex items-center gap-1">
              <Bank bankName={data?.payment?.bank_name} />
              <div className="font-bold">{data?.payment?.account_number}</div>
            </div>
          </div>
          <div className="flex items-center">
            <CustomButton
              title="Засах"
              icon={<img src={EditIcon} />}
              onClick={openEdit}
            />
          </div>
        </div>
      </div>
      <UpdateOrphan
        openModal={openModal}
        cancelModal={cancelModal}
        data={orphanInfo?.data}
      />
    </div>
  );
};
