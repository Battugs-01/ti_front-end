import { ItemInterface, UserApi, UserList } from "service/gov-settings";
import PhoneIcon from "assets/government/icons/phone.svg";
import MailIcon from "assets/government/icons/mail.svg";
import { Avatar, Badge } from "antd";
import EditIcon from "assets/government/icons/editButton.svg";
import TrashIcon from "assets/government/icons/trashButton.svg";
import { useState } from "react";
import IBadge from "components/badge";
import { EditUser } from "./actions/edit/editUser";
import { CustomButton } from "pages/government/components/button";
import { useRequest } from "ahooks";
import governmentUser from "service/gov-settings/request";
// import { CreateOrphan } from "./actions/createOrphan";

type ItemType = {
  data?: UserList;
};

export const Item: React.FC<ItemType> = ({ data }) => {
  const [editModal, setEditModal] = useState<boolean>(false);

  const userDelete = useRequest(() => governmentUser.deleteUser(data?.id), {
    manual: true,
    onSuccess: () => {
      console.log("Amjilttai ustlaa");
    },
  });
  const cancelModal = () => {
    setEditModal(false);
  };
  const deleteUser = () => {
    userDelete.run();
  };
  return (
    <div
      className="w-full text-base"
      style={{ borderBottom: "1px solid #EAECF0" }}
    >
      <div className="w-full flex items-center p-4 justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            size={36}
            style={{ background: "#144E5A" }}
            shape="circle"
            className="uppercase"
          >
            {data?.email?.substring(0, 2)}
          </Avatar>
          <div className="font-bold">{data?.first_name}</div>
          <div>{data?.last_name}</div>
          <IBadge color="gray" title={data?.position} />
          <Badge status="default" />
          <div className="flex items-center gap-1 text-sm">
            <img src={PhoneIcon} />
            <div>{data?.phone}</div>
          </div>
          <Badge status="default" />
          <div className="flex items-center gap-1 text-sm">
            <img src={MailIcon} />
            <div>{data?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <CustomButton
            title="Засах"
            icon={<img src={EditIcon} />}
            onClick={() => setEditModal(true)}
          />
          <CustomButton
            title="Устгах"
            icon={<img src={TrashIcon} />}
            isDelete
            onClick={deleteUser}
          />
        </div>
      </div>
      <EditUser
        isOpenModal={editModal}
        cancelModal={cancelModal}
        id={data?.id}
      />
      {/* <CreateOrphan
        data={data}
        id={id}
        openModal={openModal}
        cancelModal={cancelModal}
      /> */}
    </div>
  );
};
